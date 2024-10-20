import VerifyToken from '@/components/auth/verify-token/verify-token'
import React from 'react'

const page = ({params:{id}}:{params:{id:string}}) => {
  return (
    <div
    className='w-full h-full min-h-screen flex items-center justify-center'

    >
        <VerifyToken id={id}/>
    </div>
  )
}

export default page