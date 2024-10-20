"use client"
import Spinner from '@/components/shared/spinner'
import SubmitButton from '@/components/shared/submit-button'
import { Form, FormControl, FormField, FormItem,FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CredentialsLoginSchema } from '@/zod-schema/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Error from '../../promise-states/error'
import Pending from '../../promise-states/pending'
import { Login } from '@/lib/actions/auth-actions'
import PasswordInput from '../../ui/password-input'

const SignInForm = ({email}:{email?:string}) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof CredentialsLoginSchema>>({
        resolver:zodResolver(CredentialsLoginSchema),
        defaultValues:{
            email
        }
    });
    const [error, setError] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const handleSubmit = async(data:z.infer<typeof CredentialsLoginSchema>)=>{
          setError('');
        setIsloading(true);
       try {
        const response = await Login(data);
        if(response?.error) setError(response.error);
        router.push('/home')
       } catch (error) {
        console.log(error)
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
        <p className='text-xs text-muted-foreground'>loging your account please wait</p>
    </div>
</> 
:
<Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col space-y-4 pb-2 pt-2'>
            <FormField
            name='email'
            control={form.control}
            render={({field})=>(
                <FormItem className='gap-1'>
                    <p className='text-xs font-semibold leading-none'>Email address</p>
                    <FormControl>
                    <Input {...field} required  disabled={!!email}/>
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
                        <PasswordInput {...field} required  autoComplete='false'/>
                    </FormControl>
                        <FormMessage/>
                </FormItem>
            )}
            />
         <Error text={!error.includes('Email not verified') ? error : ''}/>
         <Pending text={error.includes('Email not verified') ? error : ''}/>
                    <SubmitButton text='Login' />

        </form>
    </Form>   
}
    </>
  )
}

export default SignInForm