import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { session_cookie } from "@/lib/types";

export async function POST() {
    const cookieStore = cookies();
    const currentToken = cookieStore.get(
        process.env.NODE_ENV !== 'production' ? "authjs.session-token" : "__Secure-authjs.session-token"
    )?.value;

    // Retrieve the current "sessions" cookie
    const sessionsCookie = cookieStore.get("sessions");
    const sessions = sessionsCookie ? JSON.parse(sessionsCookie.value) as session_cookie[] : [];

    // Filter out the current session from the array
    const updatedSessions = sessions.filter(
        (session) => session["authjs.session-token"] !== currentToken
    );

    // Create a response and update the "sessions" cookie
    const response = NextResponse.json({ message: 'Signed out successfully' });

    // Update the "sessions" cookie with the modified array
    response.cookies.set("sessions", JSON.stringify(updatedSessions), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    });
    
    return response;
}
