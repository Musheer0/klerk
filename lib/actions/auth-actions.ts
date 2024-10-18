"use server"

import { auth, signIn } from "@/auth"
import prisma from "@/db"
import { CredentialsLoginSchema, CredentialsRegisterSchema, UpdateProfileSchema } from "@/zod-schema/auth-schema"
import { User } from "@prisma/client"
import { AuthError } from "next-auth"
import { z } from "zod"
import { send_email } from "./resend"
import { WelcomeEmailTemplate } from "@/components/email-templates/welcome-email"
import { defualt_token_life } from "@/defualt-values"
import { compare, hash } from "bcryptjs"
import { PasswordChangeEmailTemplate } from "@/components/email-templates/password-changed-email"
import { EmailChangeEmailTemplate } from "@/components/email-templates/email-change"
import { generateOtp } from "@/otp-generator"
import { OtpEmailTemplate } from "@/components/email-templates/otp-email"

export const Login= async(value:z.infer<typeof CredentialsLoginSchema>)=>{
const {error, data} = CredentialsLoginSchema.safeParse(value)
if(!error){
try {
    await signIn('credentials',{
        ...data,
        redirectTo: '/home'
    })
} catch (error) {
    if(error instanceof AuthError){
        return {error: error.cause?.err?.message|| 'invalid credentials'}
    }
    else return {error: 'internal server error'}
}
}
else{
    return {error: 'invalid credentials'}
}
};
export const RegisterUser = async(value:z.infer<typeof CredentialsRegisterSchema>)=>{
    const {error, data} = CredentialsRegisterSchema.safeParse(value);
    if(!error){
        try {
           const user = await prisma.user.create({
            data:{
                ...data
            }
           }) as User;
           const token = await prisma.verificationToken.create({
            data:{
                identifier: user.id!,
                expires: defualt_token_life
            }
        });
           const response =   await send_email(
            'Action Required: Verify Your Email to Complete Your Registration',
            WelcomeEmailTemplate({firstName: user.name!,verificationLink: `${process.env.NEXT_PUBLIC_APP_URL}/verfiy/${token.token}` }),
            user.email
          );
          return response
        } catch (error) {
      return {error: 'internal server error'}
        }
        }
        else{
            return {error: 'invalid credentials'}
        }

};
export const resetpassword = async(password:string, otp:string, tokenId:string)=>{
    if(!password || !otp ||!tokenId) return {error: 'missing data'};
   try {
    const session = await auth();
    if(!session?.user?.id) return {error: 'access denied'}
    const token = await prisma.verificationToken.findFirst({
        where:{
            identifier: session.user.id!,
            token: tokenId,
            otp
        }
    });
    if(token?.identifier===session.user.id!){
        const hashed_password =await hash(password, 10)
  if(hashed_password){
    const user = await prisma.user.update({
        where:{
         id:session.user.id!
        },
        data:{
          password: hashed_password
        }
    });
    await send_email(
        'Your Account Password Was Changed',
        PasswordChangeEmailTemplate({firstName: user.name!, changeDate: new Date().toISOString()}),
       user.email!
    );
    return {user}
  }
    }
   } catch (error) {
    return {error: 'server error , try again'}
   }
};
export const changeEmail = async(email:string, otp:string, tokenId:string)=>{
    if(!email || !otp ||!tokenId) return {error: 'missing data'};
   try {
    const session = await auth();
    if(!session?.user?.id) return {error: 'access denied'}
    const token = await prisma.verificationToken.findFirst({
        where:{
            identifier: session.user.id!,
            token: tokenId,
            otp
        }
    });
    if(token?.identifier===session.user.id!){
  if(email){
    const user = await prisma.user.update({
        where:{
         id:session.user.id!
        },
        data:{
         email
        }
    });
    await send_email(
        'Your Account Email Was Changed',
        EmailChangeEmailTemplate({firstName: user.name!, changeDate: new Date().toISOString(), newEmail: email,}),
        session.user.email!
    );
    return {user}
  }
    }
   } catch (error) {
    return {error: 'server error , try again'}
   }
};
export const sendOtp = async(title:string,subject:string)=>{
    if(title){
      const session = await auth();
      if(session?.user?.email){
        const otp = await generateOtp(4)
        const token = await prisma.verificationToken.create({
            data:{
                identifier: session.user.id!,
                expires: defualt_token_life,
                otp
            }
        });
        const response = await send_email(
            subject,
            OtpEmailTemplate({firstName: session.user.name!, otp:token.otp!,title, expirationTime: 'your otp will expire in 15 mins' }),
            session.user.email
        );
        return response
      }
    }
    else return{error:'missing data'}
};
export const updateProfile = async(value:z.infer<typeof UpdateProfileSchema>)=>{
    const {error , data} = UpdateProfileSchema.safeParse(value);
    if(!error){
        try {
        const session = await auth();
        if(!session?.user) return {error: 'access denied'}
           const user = await prisma.user.update({
            where:{
                id: session.user.id
            },
            data:{
                ...data
            }
           }) as User;
     return {user}
        } catch (error) {
      return {error: 'internal server error'}
        }
        }
        else{
            return {error: 'invalid credentials'}
        }
};
export const authenticatePassword = async(password:string)=>{
    if(password){
        try {
            const session = await auth();
            if(session?.user){
              const user = await prisma.user.findUnique({where:{id:session.user.id}});
              if(user){
                if(!user.emailVerified) {
                    return {error: 'please verify your email first'}
                }
                 const iscorrectpassword = await compare(password, user.password!);
               if(iscorrectpassword)  return {success: iscorrectpassword};
               else return {error: 'incorrect password'}
              }
              else{
                return {error: 'user not found'}
              }
            }
            else return {error:'access denied'}
        } catch (error) {
            return {error:'server error'}
        }
    }
    else return {error: 'missing data'}
};
export const deleteAccound = async(password:string)=>{
    const sesssion = await auth();
    if(sesssion?.user){
     const isCorrectPassword =await authenticatePassword(password);
     if((isCorrectPassword).success){
        await prisma.user.delete({
            where:{id: sesssion.user.id}
        });
        return {success: true}
     }
    }
    else return {error:'access denied'}


};
