"use client"
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import SocialButton from './social-button';
import { signIn } from 'next-auth/react';
const GoogleLoginButton = ({className=''}:{className?:string}) => {
  return (
 <SocialButton Onclick={()=>{
  //@ts-expect-error fk this type check
  className={className}
  signIn("google")
 }} text='Google' Icon={FcGoogle}/>
  )
}

export default GoogleLoginButton