import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { AUTH_ROUTES, PRIVATE_ROUTES } from "./routes";
import { cookies } from "next/headers";
import { session_cookie } from "./lib/types";

export default auth(async (req) => {
    const { nextUrl } = req;
    const isPrivateRoute = PRIVATE_ROUTES.includes(nextUrl.pathname);
    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
    const isLoggedIn = !!req.auth;
    const isAdminRoute = nextUrl.pathname === '/admin';
    const cookieStore = cookies();
    const currentToken = cookieStore.get(
        process.env.NODE_ENV !== 'production' ? "authjs.session-token" : "__Secure-authjs.session-token"
    )?.value;
    const sessionsCookie = cookieStore.get("sessions");
    const sessions = sessionsCookie ? JSON.parse(sessionsCookie.value) as session_cookie[] : [];

    if (isLoggedIn) {
        // Redirect logged-in users away from auth and admin routes
        if (isAuthRoute || isAdminRoute) {
            return NextResponse.redirect(new URL('/home', nextUrl));
        }
        // If there are sessions, remove the current session from the list
        if (sessions.length > 0 && currentToken) {
            const filteredSessions = sessions.filter(
                (session) => session["authjs.session-token"] !== currentToken
            );
            // Update the "sessions" cookie
            const response = NextResponse.next();
            response.cookies.set("sessions", JSON.stringify(filteredSessions), {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                path: "/",
            });
            return response;
        }
    } else {
        // If not logged in, handle private and admin routes
        if (isPrivateRoute || isAdminRoute) {
            // If there are sessions, attempt to restore the first session
            if (sessions.length > 0) {
                const firstSessionToken = sessions[0]["authjs.session-token"];
                if (firstSessionToken && !currentToken) {
                    const response = NextResponse.next();
                    response.cookies.set(
                        process.env.NODE_ENV !== 'production' ? "authjs.session-token" : "__Secure-authjs.session-token",
                        firstSessionToken,
                        {
                            httpOnly: true,
                            secure: true,
                            sameSite: "lax",
                            path: "/",
                        }
                    );
                    return response;
                }
            }
            // If no session can be restored, redirect to the sign-in page
            return NextResponse.redirect(new URL('/sign-in', nextUrl));
        }
    }

    // Default to allowing the request to proceed
    return NextResponse.next();
});
