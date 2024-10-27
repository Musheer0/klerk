import { session_cookie } from "@/lib/types";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function GET() {
    // Retrieve the cookies utility from the headers to access session cookies
    const cookiesUtil = await cookies();

    // Attempt to get the "sessions" cookie, which contains session data
    const sessions = await cookiesUtil.get("sessions");

    // If "sessions" cookie exists, parse the session data
    if (sessions) {
        const parsedSessions = JSON.parse(sessions.value) as session_cookie[];

        // Decode each session token asynchronously and map them to user information
        const decodedSessions = await Promise.all(
            parsedSessions.map(async (session) => {
                return await decode({
                    token: session["authjs.session-token"], // JWT token for the session
                    salt: process.env.NODE_ENV !== "production" 
                        ? "authjs.session-token" 
                        : "__Secure-authjs.session-token", // Salt value depends on the environment
                    secret: "l1Igad3G6zJOnxS27uUnanQQ7RR6T4kVa6JrmvjbSRM=", // Secret key used for decoding
                }).then((res) => {
                    // Map decoded token information to a user-friendly object
                    return {
                        email: res?.email,
                        picture: res?.picture,
                        id: res?.sub,
                        name: res?.name,
                    };
                });
            })
        );

        // Respond with the decoded session data if available
        return Response.json(decodedSessions);
    } else {
        // If no "sessions" cookie found, return an error response
        return Response.json({ error: "No extra session found" });
    }
}
