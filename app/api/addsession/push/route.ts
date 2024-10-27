/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { NextResponse } from "next/server";
import { session_cookie } from "@/lib/types";
import { auth } from "@/auth";
import { cookies } from "next/headers";

export async function POST() {
    // Authenticate the user, ensure they are logged in
    const user = await auth();
    if (!user?.user) {
        // If authentication fails, return an unauthorized response
        return Response.json({ error: 'unauthorized' });
    }

    // Create a response object for setting cookies and returning data
    const response = NextResponse.json({ message: 'Cookie set successfully' });

    // Retrieve the current "sessions" cookie, or initialize as an empty array if not found
    const cookieStore = cookies();
    const sessionsCookie = cookieStore.get("sessions");
    const sessions = sessionsCookie ? JSON.parse(sessionsCookie.value || "[]") as session_cookie[] : [];

    // Determine the appropriate cookie name based on the environment
    const cookieName = process.env.NODE_ENV !== 'production' ? "authjs.session-token" : "__Secure-authjs.session-token";

    // Retrieve the current session token
    const currentSessionToken = cookieStore.get(cookieName)?.value || '';

    // Create a new session entry using the retrieved session token
    const newSession: session_cookie = {
        "authjs.session-token": currentSessionToken,
    };

    // Add the new session to the list of existing sessions
    const updatedSessions = [...sessions, newSession];

    // Set the updated "sessions" cookie with the newly added session
    response.cookies.set("sessions", JSON.stringify(updatedSessions), {
        httpOnly: true, // Ensures the cookie is only accessible via HTTP(S), not JavaScript
        secure: true,   // Use secure cookies (HTTPS only) in production
        path: '/',      // Makes the cookie accessible throughout the entire domain
        sameSite: 'lax' // Restricts cross-site access
    });

    // Return the response indicating that the session was successfully set
    return response;
}
