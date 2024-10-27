"use client"
/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-unused-expressions  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/
import Spinner from '@/components/shared/spinner'
import SubmitButton from '@/components/shared/submit-button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CredentialsLoginSchema } from '@/zod-schema/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Error from '../../promise-states/error'
import { Login } from '@/lib/actions/auth-actions'
import PasswordInput from '../../ui/password-input'
import Link from 'next/link'

const SignInForm = ({ email ,redirect=false}: { email?: string,redirect?:boolean }) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof CredentialsLoginSchema>>({
    resolver: zodResolver(CredentialsLoginSchema),
    defaultValues: { email }
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(async (data: z.infer<typeof CredentialsLoginSchema>) => {
    setError('')
    setIsLoading(true)
    try {
      const response = await Login(data)
      if (response?.error) {
        setError(response.error)
      } else {
       redirect &&   router.push('/home')
      }
    } catch {
      setError('Server error, please try again')
    } finally {
      setIsLoading(false)
    }
  }, [router])
  return (
    <>
      {isLoading ? (
        <div className="loader flex items-center justify-center w-full gap-2 py-2 mx-auto">
          <Spinner className="text-muted-foreground w-4 h-4" />
          <p className="text-xs text-muted-foreground">Logging in, please wait...</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-4 pb-2 pt-2" aria-label="Sign in form">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="gap-1">
                  <label htmlFor="email" className="text-xs font-semibold leading-none">Email address</label>
                  <FormControl>
                    <Input {...field} id="email" required disabled={!!email} aria-required="true" aria-invalid={!!form.formState.errors.email} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="gap-1">
                  <label htmlFor="password" className="text-xs font-semibold leading-none">Password</label>
                  <FormControl>
                    <PasswordInput {...field} id="password" required autoComplete="off" aria-required="true" aria-invalid={!!form.formState.errors.password} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href={'/reset-password'} className='text-sm hover:underline text-'>
            forgot password?
            </Link>
            <Error text={error} />
            <SubmitButton text="Login" />
          </form>
        </Form>
      )}
    </>
  )
}

export default SignInForm
