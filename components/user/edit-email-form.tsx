/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/

"use client"

import { PasswordSchema, UpdateEmailSchema } from '@/zod-schema/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import SubmitButton from '../shared/submit-button';
import { AlertDialogCancel } from '../ui/alert-dialog';
import { useUser } from '@/stores/useUser';
import { compare } from 'bcryptjs';
import PasswordInput from '../ui/password-input';
import { toast } from 'sonner';
import { changeEmail, sendChangeEmailVerificationCode } from '@/lib/actions/auth-actions';
import Error from '../promise-states/error';
import Success from '../promise-states/success';
import { OtpForm } from '../shared/otp-form';

const EditMailForm = () => {
    const form = useForm<z.infer<typeof UpdateEmailSchema>>({
        resolver: zodResolver(UpdateEmailSchema)
    });

    const passwordform = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema)
    });

    const { user } = useUser();
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const closeDailogRef = useRef<HTMLButtonElement | null>(null);
    const { setUser } = useUser();

    const validatePassword = async (data: z.infer<typeof PasswordSchema>) => {
        setIsSubmitting(true);
        setError('');
        setToken('');

        const isValidPassword = await compare(data.password, user?.password || '');
        if (isValidPassword) {
            setIsCorrectPassword(true);
        } else {
            toast('Incorrect password', { position: 'top-center' });
            setError('Incorrect password');
        }
        setIsSubmitting(false);
    };

    const handleSubmit = async (data: z.infer<typeof UpdateEmailSchema>) => {
        setIsSubmitting(true);
        setError('');
        setToken('');
        toast.loading('Please wait...');

        const mail = await sendChangeEmailVerificationCode(data, passwordform.getValues().password);
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

        const response = await changeEmail(form.getValues().email, otp, token, passwordform.getValues().password);
        if (response?.error) {
            toast(response.error); // Display the actual error message returned from the server
            setError(response.error);
        } else {
            closeDailogRef.current?.click(); // Close the dialog if the reference is available
            toast.success('Email changed successfully');
            setUser(response?.user! || null); // Safely set user without non-null assertion
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
                <Form {...passwordform}>
                    <form onSubmit={passwordform.handleSubmit(validatePassword)} className='space-y-3'>
                        <FormField
                            name='password'
                            control={passwordform.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} disabled={isSubmitting} />
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
            {token && isCorrectPassword && (
                <OtpForm SubmitButtonText='Change Email' onSubmit={handleEmailChange} isLoading={isSubmitting} />
            )}
            <AlertDialogCancel ref={closeDailogRef} className='hidden'>Close</AlertDialogCancel>
        </div>
    );
};

export default EditMailForm;
