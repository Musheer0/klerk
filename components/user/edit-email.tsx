"use client"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React from 'react'
import { Button } from '../ui/button'
import { BsThreeDots } from "react-icons/bs";
import { useUser } from '@/stores/useUser';
import EditMailForm from "./edit-email-form"

const EditEmail = () => {
    const { user } = useUser();

    return (
        <div className='w-full border-b py-3 flex flex-col space-y-2'>
            <p className='font-semibold text-sm'>Email address</p>
            <div className='flex items-center justify-between w-full'>
                <p>{user?.email || 'No email provided'}</p>
                {user?.password && (
                    <Popover>
                        <PopoverTrigger>
                            <Button className='bg-transparent hover:bg-foreground/5 text-primary hover:text-primary/80'>
                                <BsThreeDots />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-1">
                            <AlertDialog>
                                <AlertDialogTrigger className="w-full">
                                    <Button className='bg-transparent w-full text-start flex items-start justify-start shadow-none hover:bg-foreground/5 text-primary hover:text-primary/80'>
                                        Change Email
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-lg">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Change Email</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            An email containing a verification code will be sent to the new email address.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <EditMailForm />
                                </AlertDialogContent>
                            </AlertDialog>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        </div>
    )
}

export default EditEmail;
