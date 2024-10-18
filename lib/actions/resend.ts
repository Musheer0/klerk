import { ReactNode } from "react";
import { Resend } from "resend"

export const send_email = async(
   subject: string,
   react: ReactNode,
   to?: string
)=>{
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const {data, error} = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['musheeran165@gmail.com'],
       subject,
        react
    });
    if(data){
        return {success: 'check your email to confrim your account'}
    }
    else return{error}
}