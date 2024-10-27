"use client"
import React, { ReactNode, useState } from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import Spinner from '../shared/spinner'

const SignOutButton = ({className, children}:{className?:string, children:ReactNode}) => {
  const [isLoading ,setIsloading ]= useState(false)
  return (
    <Button
    onClick={async()=>{
      setIsloading(true);
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/addsession/sign-out}`,{method:"POST"}).then(()=>
        {
          signOut()
})

    }}
    className={className}
    disabled={isLoading}
    >
  {isLoading ? <Spinner/> : <>{children}</>}
    </Button>
  )
}

export default SignOutButton