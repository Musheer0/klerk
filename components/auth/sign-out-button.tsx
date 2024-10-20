"use client"
import React, { ReactNode } from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

const SignOutButton = ({className, children}:{className?:string, children:ReactNode}) => {
  return (
    <Button
    onClick={()=>{
        signOut();
    }}
    className={className}
    >
{children}
    </Button>
  )
}

export default SignOutButton