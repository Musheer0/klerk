"use client"
/*
This validates password from hashed password stored in the zustand state
use must validate password in backend also using authenticatePassword function
from auth-actions.ts
*/
/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/
import React, { useState } from 'react'
import SubmitButton from '../shared/submit-button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '../ui/form';
import PasswordInput from '../ui/password-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordSchema } from '@/zod-schema/auth-schema';
import { compare } from 'bcryptjs';
import { toast } from 'sonner';
import { useUser } from '@/stores/useUser';
import { useForm } from 'react-hook-form';
import { authenticatePassword } from '@/lib/actions/auth-actions';
import Spinner from '../shared/spinner';
export enum Method{
    fontEnd = "front-end",
    backEnd = "back-end",
}
interface Props{
    LoadState? : React.Dispatch<React.SetStateAction<boolean>>,
    ErrorState?:React.Dispatch<React.SetStateAction<string>>,
    CorrectPasswordState?:React.Dispatch<React.SetStateAction<boolean>>,
    setPassword?:React.Dispatch<React.SetStateAction<string>>,
    method:Method,
    afterVerify?: (data:string)=>void;
}
const ValidatePassword:React.FC<Props> = ({LoadState, ErrorState, CorrectPasswordState,setPassword,method=Method.fontEnd, afterVerify}) => {
    const {user} = useUser()
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const passwordform = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema)
    });
    const validatePassword = async (data: z.infer<typeof PasswordSchema>) => {
        setIsSubmitting(true);
       if(LoadState)  LoadState(true);
        setError('');
        const validatePasswordFun = async ()=>{
            if(method===Method.fontEnd){
                const isCorrectPassword = await compare(data.password, user?.password || '');
                return isCorrectPassword
            }
            else{
                const isCorrectPassword = await authenticatePassword(data.password).then((res)=>{
                    if(res.success) return true ;
                    else return false
                });
                return isCorrectPassword
            }
        }
        const isValidPassword =await validatePasswordFun()
        if (isValidPassword) {
            setIsCorrectPassword(true);
       if(CorrectPasswordState)      CorrectPasswordState(true);
          if(setPassword)   setPassword(data.password);
            if(afterVerify)await afterVerify(data.password);
        } else {
            toast('Incorrect password', { position: 'top-center' });
            setError('Incorrect password');
          if(ErrorState)   ErrorState('inccorect password')
        }
       if(LoadState)  LoadState(false);
        setIsSubmitting(false);
    };

  return (
<>
<Form {...passwordform} >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); // Prevent default form submission
                            passwordform.handleSubmit(validatePassword)(e);
                        }}
                    className='space-y-3'>
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
                        {!isSubmitting ? (
                            <div className='flex items-center gap-2 w-full'>
                                <SubmitButton text='Next' />
                            </div>
                        ): <div className='w-full flex items-center justify-center py-1'><Spinner/></div>}
                    </form>
                </Form>
</>
  )
}

export default ValidatePassword