"use client"
/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import SocialButton from './social-button';
import { cn } from '@/lib/utils';
import { OauthLogin, OAuthProviders } from './modified-oauthlogin';
const GoogleLoginButton = ({className='',isModal}:{className?:string,isModal:boolean}) => {
  const [isLoading, setIsloading] = useState(false)
  return (
 <SocialButton
 Onclick={async()=>{
  setIsloading(true);
  await OauthLogin(OAuthProviders.Google)
  setIsloading(false)
 }} className={cn(className)} text='Google' Icon={FcGoogle} loading={isLoading}/>
  )
}

export default GoogleLoginButton