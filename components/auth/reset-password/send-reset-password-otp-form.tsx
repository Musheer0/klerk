"use client"
import React, { useState } from 'react'
import EmailForm from '../shared/email-form'
import AuthCard from '../auth-card'
import Link from 'next/link'
import { z } from 'zod'
import { UpdateEmailSchema } from '@/zod-schema/auth-schema'
import { toast } from 'sonner'
import { sendOtp } from '@/lib/actions/auth-actions'
import { useRouter } from 'next/navigation'
import Error from '@/components/promise-states/error'
import Success from '@/components/promise-states/success'

const SendResetPasswordOtpForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading ,setIsloading]= useState(false);
 const router = useRouter();
  const onEmailSubmit = async(data:z.infer<typeof UpdateEmailSchema>)=>{
    setError('');
    setSuccess('');
    setIsloading(true)
    toast.loading('sending otp please wait');

   const response =   await sendOtp(
      'One-Time Password (OTP) for Password Reset',
      'Password Reset Request: Your One-Time Password (OTP)',
        data.email,
      true
    );
    if(response.error) setError(response.error);
    if(response.token) {
      setSuccess('otp sent to your email');
      router.push('/reset-password/'+response.token)
    }
    toast.dismiss();
    toast.success('otp sent your email')
  }
    //TODO:
    /*
    enter email->send reset-password-link->open reset-password/[id]->enter new password->verify otp
      */
  return (
    <div
    className='w-full h-screen flex items-center justify-center flex-col'
    >
         <AuthCard 
         showSocialButton={false}
         title='Change Password'
         description='forgot your password?'
         footerLink={
          <>
          <p className='text-sm py-3 text-muted-foreground'>Already have an account? 
            <Link href={'/sign-in'}>
            <span className='text-primary font-semibold hover:underline hover:text-primary/80 cursor-pointer'>Sign in</span>
            </Link></p>
        </>
         }
         >
          <Error text={error}/>
          <Success text={success}/>
        <EmailForm isLoading={isLoading} label='Email adress' onSubmit={onEmailSubmit}/>
         </AuthCard>
    </div>
  )
}

export default SendResetPasswordOtpForm