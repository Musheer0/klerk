"use client"
/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/
import React, { useState } from 'react'
import PasswordForm from '../shared/password-form'
import { z } from 'zod';
import { PasswordSchema } from '@/zod-schema/auth-schema';
import { OtpForm } from '@/components/shared/otp-form';
import { resetpasswordwithoutlogin, verifyOtp } from '@/lib/actions/auth-actions';
import { toast } from 'sonner';
import Error from '@/components/promise-states/error';
import { useRouter } from 'next/navigation';

const ResetPasswordForm = ({id}:{id:string}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router  = useRouter()
    const [isLoading ,setIsloading]= useState(false);
    const [otp ,setOtp]= useState('')
    const handleSubmit = async(data:z.infer<typeof PasswordSchema>)=>{
      toast.loading('please wait');
      const response=await resetpasswordwithoutlogin(data.password, otp, success)
      if(response?.error) setError(response.error);
      if(response?.user) {
        router.push('/sign-in')
      }
    };

    const [isCorrectOtp, setIscorrectOtp] = useState(false)
    const verifyotp = async(data:string)=>{
        toast.loading('please wait')
      const response = await verifyOtp(id,data);
      if(response.token) {
        setIscorrectOtp(true);
        setSuccess(response.token)
        setOtp(data);
      }
      else setError(response?.error!);
      toast.dismiss()
    }
if(isCorrectOtp)
  return (
    <div>
        <Error text={error}/>
        <PasswordForm
        label='Enter new password'
        className=''
        isLoading={isLoading}
        onSubmit={handleSubmit}
        submintbuttontext='next'
        />
    </div>
  )
else 
return (
    <>
    <Error text={error}/>
    <OtpForm
    SubmitButtonText='verify'
    onSubmit={verifyotp}
    isLoading={isLoading}
    />
    </>
)
}

export default ResetPasswordForm