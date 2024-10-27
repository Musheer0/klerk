import ResetPasswordForm from '@/components/auth/reset-password/reset-password-form'
import React from 'react'

const page = ({params:{id}}:{params:{id:string}}) => {
  return (
    <div
    className='w-full h-screen flex items-center justify-center flex-col'
    >
      <ResetPasswordForm id={id}/>
    </div>
  )
}

export default page