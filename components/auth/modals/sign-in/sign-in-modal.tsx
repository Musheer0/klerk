"use client"
/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/
import React, { ReactNode } from 'react'
import SignInForm from '../../sign-in/sign-in-form'
import AuthCard from '../../auth-card'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'

const SignInModal = ({children}:{children:ReactNode}) => {
  return (
   <>
   <AlertDialog>
    <AlertDialogTrigger>
        {children}
    </AlertDialogTrigger>
    <AlertDialogContent className='bg-transparent border-none p-0'>
    <AuthCard
        
        className='relative w-full max-w-[400px]'
        title='Sign in to Klerk'
         showSocialButton
        >
        <SignInForm redirect={false} />
        </AuthCard>
    </AlertDialogContent>
   </AlertDialog>
   </>
  )
}

export default SignInModal