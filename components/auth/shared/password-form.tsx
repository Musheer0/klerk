"use client"
import Spinner from '@/components/shared/spinner'
import SubmitButton from '@/components/shared/submit-button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import PasswordInput from '@/components/ui/password-input'
import { cn } from '@/lib/utils'
import { PasswordSchema } from '@/zod-schema/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const PasswordForm = (
    {
        onSubmit,
        submintbuttontext,
        isLoading,
        label,
        className,
    
    }:{
        onSubmit:(data:z.infer<typeof PasswordSchema>)=>void,
        submintbuttontext:string,
        isLoading:boolean,
        label:string,
        className?:string
    }
) => {
    const form  = useForm<z.infer<typeof PasswordSchema>>({
        resolver:zodResolver(PasswordSchema)
    })
if(!isLoading)
  return (
   <Form {...form}>
 <form 
    onSubmit={form.handleSubmit(onSubmit)}
    className={cn(className, 'space-y-2')}
    >
        <FormField
        control={form.control}
        name='password'
        render={({field})=>{
            return <>
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                <PasswordInput {...field}/>
                </FormControl>
            </FormItem>
            </>
        }}
        />
 
        <SubmitButton className='w-full' text={submintbuttontext}/>
    </form>
   </Form>
  )
  else 
return (
    <div className='w-full h-full flex items-center justify-center'>
     <Spinner/>

    </div>
)
}

export default PasswordForm