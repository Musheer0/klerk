  "use client"
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link'
import SignInForm from '../sign-in/sign-in-form'
import Spinner from '@/components/shared/spinner'
import Error from '@/components/promise-states/error'
import Pending from '@/components/promise-states/pending'
import { VerifyEmail } from '@/lib/actions/auth-actions'

  
const VerifyToken = ({id}:{id:string}) => {
    const [isVerified, setIsVerified] = useState(false)
    const [isLoading ,setIsloading] = useState(false)
    const [email, setEmail] = useState('')
    const [error,setError] = useState('')
    useEffect(()=>{
    const verify = async()=>{
      if(!isVerified){
        setIsloading(true)
        const response =await VerifyEmail(id);
        if(response.success){
          setIsVerified(true);
          setEmail(response.email!)
          setIsloading(false)
        }
        else{
          setIsloading(false)
          setError(response.error!)
        }
       }
    };
    verify();
    },[])
  return (
<div className='flex flex-col gap-4 w-full'>
<Card
    className='shadow-md border pt-2 overflow-hidden w-[95%] mx-auto max-w-[400px]'
    >
  <CardHeader
   className='flex items-center'
  >
    <CardTitle className='text-lg'>Confrim account creation</CardTitle>
  </CardHeader>
  <CardContent
  className='p-1 px-10 rounded-xl border-b shadow-sm flex flex-col items-center'
  >
      {!isVerified &&
       <>
       <Error text={!error.includes('Email not verified') ? error : ''}/>
       <Pending text={error.includes('Email not verified') ? error : ''}/>
       </>
      }
    {isVerified ? 
   <SignInForm email={email}/>
:
<>
{isLoading && 
  <div className="loader flex items-center justify-center w-full gap-2 py-2 mx-auto ">
        <Spinner className='text-muted-foreground w-4 h-4'/>
        <p className='text-xs text-muted-foreground'>Verifying your account please wait</p>
    </div>
}
</>
}
  </CardContent>
  <CardFooter 
  className='bg-secondary/50 flex flex-col items-center py-2 px-0'
  >
    <p className='text-sm py-3 text-muted-foreground'>Don&apos;t have an account? <Link href={'/sign-up'}><span className='text-primary font-semibold hover:underline hover:text-primary/80 cursor-pointer'>Sign up</span></Link></p>
    <div className="seperator w-full border"></div>
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

export default VerifyToken