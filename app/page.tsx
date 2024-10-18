import { auth } from '@/auth'
import SignIn from '@/components/sign-in'
import React from 'react'

const page =async () => {
  const session = await auth();
  console.log(session)
  return (
    <div>
      <SignIn/>
    </div>
  )
}

export default page