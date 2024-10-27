"use client"
/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable   @typescript-eslint/no-non-null-asserted-optional-chain*/
import { useUser } from '@/stores/useUser';
import React, { useRef, useState } from 'react'
import ValidatePassword, { Method } from './validate-password-form';
import { AlertDialogCancel } from '../ui/alert-dialog';
import { toast } from 'sonner';
import { disableTwoFactorAuthentication, enableTwoFactorAuthentication } from '@/lib/actions/auth-actions';
import { UserWithAccount } from '@/lib/types';

const TwoFactorAuthenticationForm = () => {
  const { user ,setUser} = useUser();
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const closeDailogRef = useRef<HTMLButtonElement | null>(null);
  const ToggleTwoFactorAuthentication = async(password:string)=>{
   if(!user?.twofactorauthenticationenable){
    toast.loading('please wait');
    const response= await enableTwoFactorAuthentication(password)
    if(response.error){
       toast.error(response.error);
    }
    const updated_user = {
      ...user,
      twofactorauthenticationenable: response.twofactorauthenticationenable
    } as UserWithAccount;
    setUser(updated_user);
    toast.dismiss();
    toast.success('enabled two factor authentication');
    closeDailogRef.current?.click();
   }
   else{
    toast.loading('please wait')
    const response= await disableTwoFactorAuthentication(password)
    if(response.error){
      toast.dismiss();
       toast.error(response.error);
       return;
    }
    const updated_user = {
      ...user,
      twofactorauthenticationenable: response.twofactorauthenticationenable
    } as UserWithAccount;
    setUser(updated_user);
    toast.dismiss();
    toast.success('disabled two factor authentication');
    closeDailogRef.current?.click();
   }
  }
  return (
 <>
            <ValidatePassword
                             CorrectPasswordState={setIsCorrectPassword}
                             method={Method.fontEnd}
                             afterVerify={ToggleTwoFactorAuthentication}
                             />
    {/* //just to close dialog after enabling 2fa instead of using alert dailog action */}
<AlertDialogCancel ref={closeDailogRef} className='hidden'/>
 </>
  )
}

export default TwoFactorAuthenticationForm