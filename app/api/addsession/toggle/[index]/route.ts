import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { session_cookie } from "@/lib/types";

export async function POST(request: Request, { params: { index } }: { params: { index: string } }) {
    const cookieStore = cookies();
    const response = NextResponse.json({ success: true });

    // Get the "sessions" cookie
    const sessionsCookie = cookieStore.get("sessions");
    const sessions = sessionsCookie ? JSON.parse(sessionsCookie.value) as session_cookie[] : [];

    if (sessions.length !== 0) {
        const sessionIndex = parseInt(index);
        if (sessionIndex >= 0 && sessionIndex < sessions.length) {
            // Update the session
            const sessionCopy = sessions;
            const currentSession = cookieStore.get("authjs.session-token")?.value;
            const newSession = sessions[sessionIndex]["authjs.session-token"]
               // Set the updated "authjs.session-token" cookie
               response.cookies.set("authjs.session-token", newSession, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                path: "/",
            });
              sessionCopy.push({"authjs.session-token": currentSession!})
            // Update the "sessions" cookie with modified session
            response.cookies.set("sessions", JSON.stringify(sessionCopy), {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                path: "/",
            });
        }
    }

    return response;
}
