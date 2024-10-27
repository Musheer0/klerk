import React, { ReactNode } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import TwoFactorAuthenticationForm from './2fa-form'
  
const SetUp2fa = ({children}:{children:ReactNode}) => {
  return (
    <AlertDialog>
  <AlertDialogTrigger>{children}</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Verify its you</AlertDialogTitle>
      <AlertDialogDescription>
        please enter your account password 
      </AlertDialogDescription>
    </AlertDialogHeader>
    <TwoFactorAuthenticationForm/>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default SetUp2fa