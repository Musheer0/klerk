"use client"
/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/
import React, { useState } from 'react'
import { SiGithub } from "react-icons/si";
import SocialButton from './social-button';
import { OauthLogin, OAuthProviders } from './modified-oauthlogin';
import { cn } from '@/lib/utils';
const GithubLoginButton =({className='',isModal}:{className?:string,isModal:boolean})=> {
  const [isLoading, setIsloading] = useState(false)

  return (
 <SocialButton
 Onclick={async()=>{
  setIsloading(true)
  await OauthLogin(OAuthProviders.GitHub)
 }} loading={isLoading} className={cn(className)}
 text='Github' Icon={SiGithub}/>
  )
}

export default GithubLoginButton