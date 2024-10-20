/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from "react";
import { Resend } from "resend"

export const send_email = async(
   subject: string,
   react: ReactNode,
   to?: string
)=>{
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const {data, error} = await resend.emails.send({
        // Replace with your registered custom domain
        from: 'Klerk <onboarding@resend.dev>',
        //this is email for any info please contact here or any of my socials
        to: ['musheeran444@gmail.com'],
       subject,
        react
    });
    console.log(error, 'reseend--------')
    if(data){
        return {success: 'check your email to confrim your account'}
    }
    else return{error: error?.message}
}