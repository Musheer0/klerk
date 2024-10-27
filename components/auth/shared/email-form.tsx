import SubmitButton from '@/components/shared/submit-button'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { UpdateEmailSchema } from '@/zod-schema/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import Spinner from '@/components/shared/spinner';

const EmailForm = ({label, onSubmit, isLoading}:{label:string, onSubmit:(data:z.infer<typeof UpdateEmailSchema>)=>void, isLoading:boolean}) => {
    const form = useForm<z.infer<typeof UpdateEmailSchema>>({
        resolver: zodResolver(UpdateEmailSchema)
    });
if(!isLoading)
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
                <SubmitButton text='Next' className='w-full'/>

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

export default EmailForm