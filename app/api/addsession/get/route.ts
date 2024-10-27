import { session_cookie } from "@/lib/types";
import { cookies } from "next/headers";
import {decode} from 'next-auth/jwt'
export async function GET(){
    const cookiesFun = await cookies();
    const sessions = await cookiesFun.get('sessions');
    if(sessions){
        const parsedSession = JSON.parse(sessions.value) as session_cookie[]
        
        const decode_sessions = await Promise.all(parsedSession.map(async(session)=>{
            return await decode({
                 token: session["authjs.session-token"],
                 salt: "authjs.session-token",
                 secret:"l1Igad3G6zJOnxS27uUnanQQ7RR6T4kVa6JrmvjbSRM="
             }).then((res)=>{
                return {
                    email : res?.email,
                    picture: res?.picture,
                    id: res?.sub,
                    name: res?.name
                }
             })
         }));
         return Response.json(decode_sessions)
    }
    else{
         return Response.json({error: 'no extra session found'})
    }
}