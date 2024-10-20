import AuthCard from '@/components/auth/auth-card'
import SignUpForm from '@/components/auth/sign-up/sign-up-form'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <AuthCard
    footerLink={
      <>
        <p className='text-sm py-3 text-muted-foreground'>Already have an account? <Link href={'/sign-in'}><span className='text-primary font-semibold hover:underline hover:text-primary/80 cursor-pointer'>Sign in</span></Link></p>
      </>
    }
    >
        <SignUpForm/>
    </AuthCard>
  )
}

export default page