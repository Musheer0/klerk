/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/
import { NextResponse } from "next/server";
import { session_cookie } from "@/lib/types";
import { auth} from "@/auth";
import { cookies } from "next/headers";

export async function POST(){
    // get user email 
    const  user = await auth();
    if(!user?.user) return Response.json({error: 'unauthorized'})
    const response = NextResponse.json({ message: 'Cookie set successfully' });
  const sessions =   cookies().get("sessions") ? JSON.parse(cookies().get("sessions")?.value! || "[]")  as session_cookie[] : [] as session_cookie[]
    const session = {
        "authjs.session-token": cookies().get("authjs.session-token")?.value! || '',
    } as session_cookie;
    response.cookies.set("sessions", JSON.stringify([...sessions, session]),{
        httpOnly: true,
        secure: true, // Use secure cookies in production
        path: '/',
        sameSite: 'lax'
    });
    return response
}