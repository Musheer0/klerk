// this is just a ui showcase for home page
"use client"
import SubmitButton from '@/components/shared/submit-button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CredentialsLoginSchema } from '@/zod-schema/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import PasswordInput from '../../ui/password-input'

const SignInDisplay = ({email}:{email?:string}) => {
    const form = useForm<z.infer<typeof CredentialsLoginSchema>>({
        resolver:zodResolver(CredentialsLoginSchema),
        defaultValues:{
            email
        }
    });
    const handleSubmit = async(data:z.infer<typeof CredentialsLoginSchema>)=>{
    console.log(data)
    }
  return (
    <>
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
                    <SubmitButton text='Login' />

        </form>
    </Form>   

    </>
  )
}

export default SignInDisplay