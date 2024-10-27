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

    const currentToken = cookieStore.get("authjs.session-token")?.value;
    const sessionsCookie = cookieStore.get("sessions");
    const sessions = sessionsCookie ? JSON.parse(sessionsCookie.value) as session_cookie[] : [];

    if (isLoggedIn) {
        if (isAuthRoute || isAdminRoute) {
            return NextResponse.redirect(new URL('/home', nextUrl));
        }

        // Filter out the current session if it exists
        if (sessions.length > 0 && currentToken) {
            const filteredSessions = sessions.filter(
                (session) => session["authjs.session-token"] !== currentToken
            );

            // Update the "sessions" cookie with the modified array
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
        if (isPrivateRoute || isAdminRoute) {
            return NextResponse.redirect(new URL('/sign-in', nextUrl));
        }
    }

    return NextResponse.next();
});
