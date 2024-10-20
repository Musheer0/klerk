import AuthCard from '@/components/auth/auth-card'
import SignInForm from '@/components/auth/sign-in/sign-in-form'
import Link from 'next/link'
import React from 'react'
const page = () => {
  return (
    <AuthCard
    footerLink={
      <>
        <p className='text-sm py-3 text-muted-foreground'>Don&apos;t have an account? <Link href={'/sign-up'}><span className='text-primary font-semibold hover:underline hover:text-primary/80 cursor-pointer'>Sign up</span></Link></p>
      </>
    }
    >
      <SignInForm/>
    </AuthCard>
  )
}

export default page