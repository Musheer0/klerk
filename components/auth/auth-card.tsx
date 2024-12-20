import React, { ReactNode } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import SeperatorWithText from '@/components/shared/seperator-with-text'
import GoogleLoginButton from '../socials/google-login-button'
import GithubLoginButton from '../socials/github-login-button'
import { cn } from '@/lib/utils'
import SocialButton from '../socials/social-button'
import { FcGoogle } from 'react-icons/fc'
import { SiGithub } from 'react-icons/si'
// import EmailPasswordLogin from './email-password'
  
const AuthCard = ({children,
   footerLink,
    className, 
    showcase,
    showSocialButton=true,
    title,
    description,
    isModal=false
  }:{
    children:ReactNode,
    footerLink?:ReactNode, 
    className?:string,
    showcase?:boolean,
    showSocialButton:boolean,
    title:string,
    description?:string,
    isModal?:boolean
  }) => {
  return (
<div className='flex flex-col gap-4 w-full'>
<Card
    className={cn('shadow-md border bg-secondary p-0 overflow-hidden w-[95%] mx-auto max-w-[450px]', className)}
    >
  <CardHeader
   className='flex bg-background items-center pt-10'
  >
    <CardTitle className='text-lg'>{title}</CardTitle>
    <CardDescription className='text-[13px]'>{description|| 'Welcome back! Please sign in to continue'}</CardDescription>
  </CardHeader>
  <CardContent
  className='py-2 px-10 bg-background rounded-b-xl border-b shadow-sm'
  >
   {showSocialButton
   ?
   <>
   <div className="socials flex items-center w-full flex-wrap gap-1">
   {showcase ? <>
     <SocialButton Onclick={()=>{
}} text='Google'  Icon={FcGoogle}/>
 <SocialButton
text='Github' Icon={SiGithub}/>
   </>
 :
 <>
         <GoogleLoginButton  isModal={isModal}  />
         <GithubLoginButton  isModal={isModal} />
 </>  
 }
   </div>
   <SeperatorWithText text='or' />
   </>
   :
   <></>
   }
  
    {children}

  </CardContent>
  <CardFooter 
  className=' flex flex-col items-center py-2 px-0'
  >
 {footerLink}
 {footerLink ?    <div className="seperator w-full border"></div>: <></>}
    <div className="banner pb-3 pt-4">
    <p
    className='text-[13px] mx-auto  text-muted-foreground flex items-center gap-x-1 font-semibold' 
    >
        Secured by
         <span>
            <img className='w-4 h-4 object-cover ' src="https://authjs.dev/img/etc/logo-sm.webp" alt="auth js" />
            </span>
    <span>Auth.js</span>
    </p>
    </div>
  </CardFooter>
</Card>
</div>
  )
}

export default AuthCard