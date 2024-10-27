/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-unused-expressions  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { session_cookie } from "@/lib/types";

export async function POST(request: Request, { params: { index } }: { params: { index: string } }) {
    const cookieStore = cookies();
    const response = NextResponse.json({ success: true });

    // Get the "sessions" cookie and parse it into an array
    const sessionsCookie = cookieStore.get("sessions");
    const sessions = sessionsCookie ? JSON.parse(sessionsCookie.value) as session_cookie[] : [];

    // Check if there are any sessions stored in the cookie
    if (sessions.length !== 0) {
        const sessionIndex = parseInt(index);
        
        // Validate if the session index is within the bounds of the sessions array
        if (sessionIndex >= 0 && sessionIndex < sessions.length) {
            // Get the current session token based on environment
            const currentTokenName = process.env.NODE_ENV !== 'production' ? "authjs.session-token" : "__Secure-authjs.session-token";
            const currentSessionToken = cookieStore.get(currentTokenName)?.value;

            // Retrieve the new session token from the specified index
            const newSessionToken = sessions[sessionIndex]["authjs.session-token"];

            // Set the "authjs.session-token" cookie with the new session token
            response.cookies.set(currentTokenName, newSessionToken, {
                httpOnly: true,  // Ensures the cookie is only accessible via HTTP(S)
                secure: true,    // Use secure cookies (HTTPS only) in production
                sameSite: "lax", // Restricts cross-site access
                path: "/",       // Makes the cookie accessible throughout the entire domain
            });

            // Create a copy of the sessions array to update
            const updatedSessions = [...sessions];

            // Add the current session back to the sessions array if it exists
            if (currentSessionToken) {
                updatedSessions.push({ "authjs.session-token": currentSessionToken });
            }

            // Update the "sessions" cookie with the modified array
            response.cookies.set("sessions", JSON.stringify(updatedSessions), {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                path: "/",
            });
        }
    }

    // Return the response indicating success
    return response;
}
