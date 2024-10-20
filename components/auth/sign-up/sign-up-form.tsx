"use client"
import { CredentialsRegisterSchema } from '@/zod-schema/auth-schema'
import { Form, FormControl, FormField, FormItem,FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Spinner from '../../shared/spinner'
import { Input } from '../../ui/input'
import PasswordInput from '../../ui/password-input'
import SubmitButton from '../../shared/submit-button'
import Success from '../../promise-states/success'
import Error from '../../promise-states/error'
import Pending from '../../promise-states/pending'
import { RegisterUser } from '@/lib/actions/auth-actions'

const SignUpForm = () => {
    const form = useForm<z.infer<typeof CredentialsRegisterSchema>>({
        resolver:zodResolver(CredentialsRegisterSchema),
    });
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const onSubmit =async(data:z.infer<typeof CredentialsRegisterSchema>)=>{
        setSuccess('')
        setError('')
        setIsloading(true)
        try {
            const response = await RegisterUser(data)
            if(response?.error) setError(response.error!);
            if(response.success) setSuccess(response.success)
           } catch {
            setError('server error , please try again')
           }
           finally{
            setIsloading(false)
           }
    }
  return (
    <>
  {isLoading ?
  <>
  <div className="loader flex items-center justify-center w-full gap-2 py-2 mx-auto ">
        <Spinner className='text-muted-foreground w-4 h-4'/>
        <p className='text-xs text-muted-foreground'>creating your account please wait</p>
    </div>
  </>
  :
  <Form {...form}>
  <form action="" onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-4 pb-2 pt-2'>
    <div className="usernames flex flex-wrap items-center w-full  gap-1">
    <FormField
      name='name'
      control={form.control}
      
      render={({field})=>(
          <FormItem className='gap-1 flex-1 min-w-[200px]'>
              <p className='text-xs font-semibold leading-none'>Name</p>
              <FormControl>
                  <Input {...field} />
              </FormControl>
                  <FormMessage/>
          </FormItem>
      )}
      />
      <FormField
      name='displayName'
      control={form.control}
      render={({field})=>(
          <FormItem className='gap-1 flex-1 min-w-[200px]'>
              <p className='text-xs font-semibold leading-none'>Username</p>
              <FormControl>
                  <Input {...field} />
              </FormControl>
                  <FormMessage/>
          </FormItem>
      )}
      />
    </div>
      <FormField
      name='email'
      control={form.control}
      render={({field})=>(
          <FormItem className='gap-1'>
              <p className='text-xs font-semibold leading-none'>Email address</p>
              <FormControl>
                  <Input {...field} />
              </FormControl>
                  <FormMessage/>
          </FormItem>
      )}
      />
      <FormField
      name='password'
      control={form.control}
      render={({field})=>(
          <FormItem className='gap-1'>
              <p className='text-xs font-semibold leading-none'>Password</p>
              <FormControl>
                  <PasswordInput  {...field}  type='password' autoComplete='false'/>
              </FormControl>
                  <FormMessage/>
          </FormItem>
      )}
      />
    <Success text={success}/>
    <Error text={!error.includes('Email not verified') ? error : ''}/>
    <Pending text={error.includes('Email not verified') ? error : ''}/>
    <SubmitButton text='continue' />
  </form>
</Form>
  }
    </>
  )
}

export default SignUpForm