/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/

"use client"

import { UpdateEmailSchema } from '@/zod-schema/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import SubmitButton from '../shared/submit-button';
import { AlertDialogCancel } from '../ui/alert-dialog';
import { useUser } from '@/stores/useUser';
import { toast } from 'sonner';
import { changeEmail, sendChangeEmailVerificationCode } from '@/lib/actions/auth-actions';
import Error from '../promise-states/error';
import Success from '../promise-states/success';
import { OtpForm } from '../shared/otp-form';
import { UserWithAccount } from '@/lib/types';
import ValidatePassword, { Method } from './validate-password-form';

const EditMailForm = () => {
    const form = useForm<z.infer<typeof UpdateEmailSchema>>({
        resolver: zodResolver(UpdateEmailSchema)
    });
    const { user } = useUser();
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const closeDailogRef = useRef<HTMLButtonElement | null>(null);
    const { setUser } = useUser();
    const [password,setPassword] = useState('')
    const handleSubmit = async (data: z.infer<typeof UpdateEmailSchema>) => {
        setIsSubmitting(true);
        setError('');
        setToken('');
        toast.loading('Please wait...');
        const mail = await sendChangeEmailVerificationCode(data, password);
        if (mail?.error) {
            setError(mail.error);
        } else {
            setToken(mail?.token || '');
        }

        toast.dismiss();
        toast.success('OTP sent to new email');
        setIsSubmitting(false);
    };

    const handleEmailChange = async (otp: string) => {
        setError('');
        setIsSubmitting(true);

        const response = await changeEmail(form.getValues().email, otp, token,password);
        if (response?.error) {
            toast(response.error); // Display the actual error message returned from the server
            setError(response.error);
        } else {
            closeDailogRef.current?.click(); // Close the dialog if the reference is available
            toast.success('Email changed successfully');
            const updated_user:UserWithAccount = {
                ...user,
                email: response.user?.email
            } as UserWithAccount
            setUser(updated_user || null); // Safely set user without non-null assertion
        }
        setIsSubmitting(false);
    };

    return (
        <div className='space-y-3'>
            <Error text={error} />
            <Success text={token ? `Email sent to ${form.getValues().email}` : ''} />
            {isCorrectPassword && !token && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-3'>
                        <FormField
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your new email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!isSubmitting && (
                            <div className='flex items-center gap-2 w-full'>
                                <SubmitButton text='Next' />
                                <AlertDialogCancel type='button'>Cancel</AlertDialogCancel>
                            </div>
                        )}
                    </form>
                </Form>
            )}
            {!isCorrectPassword && !token && (
                          <ValidatePassword 
                          setPassword={setPassword} 
                          LoadState={setIsSubmitting}
                           ErrorState={setError} 
                           CorrectPasswordState={setIsCorrectPassword}
                           method={Method.fontEnd}
                           />

            )}
            {token && isCorrectPassword && (
                <OtpForm SubmitButtonText='Change Email' onSubmit={handleEmailChange} isLoading={isSubmitting} />
            )}
            <AlertDialogCancel ref={closeDailogRef} className='hidden'>Close</AlertDialogCancel>
        </div>
    );
};

export default EditMailForm;
