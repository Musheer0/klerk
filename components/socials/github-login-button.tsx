"use client"

import React from 'react'
import { SiGithub } from "react-icons/si";
import SocialButton from './social-button';
import { signIn } from 'next-auth/react';
const GithubLoginButton = ({className}:{className?:string}) => {
  return (
 <SocialButton
 className={className}
 Onclick={()=>{
  signIn("github")
 }}
 text='Github' Icon={SiGithub}/>
  )
}

export default GithubLoginButton