/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import SubmitButton from '../shared/submit-button'
import { Button } from '../ui/button'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@/stores/useUser'
import { EditNameSchema } from '@/zod-schema/edit-account'
import { motion } from 'framer-motion'
import { updateProfile } from '@/lib/actions/auth-actions'
import { UserWithAccount } from '@/lib/types'

const EditNameForm = ({ onclose }: { onclose?: () => void }) => {
    const { user, setUser } = useUser()
    const [isLoading, setIsloading] = useState(false)

    const form = useForm<z.infer<typeof EditNameSchema>>({
        resolver: zodResolver(EditNameSchema),
        defaultValues: {
            name: user?.name! || '',
            displayName: user?.displayName!||''
        }
    })

    const handleSubmit = async (data: z.infer<typeof EditNameSchema>) => {
        setIsloading(true)
        try {
            const response = await updateProfile(data)
            const updated_user :UserWithAccount ={
                ...user,
                name: response.user?.name,
                displayName: response.user?.displayName
            } as UserWithAccount
            if (response.user) {
                setUser(updated_user)
                toast("updated profile", { position: 'top-center' });
             if(onclose)   onclose();
            }
            if (response.error) {
                toast(response.error)
            }
        } catch  {
            toast('server error, try again')
        } finally {
            setIsloading(false)
        }
    }

    return (
        <Form {...form}>
            <motion.form
                initial={{
                    height: 0,
                    opacity: 0,
                }}
                animate={{
                    height: 'auto',
                    opacity: 1,
                }}
                exit={{
                    height: 0,
                    opacity: 0,
                }}
                transition={{ type: 'spring', duration: 0.3 }} // Spring transition settings
                layout
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-4 relative'
            >
                {isLoading ? (
                    <div className="loader absolute z-[50] top-0 left-0 rounded-md w-full h-full flex items-center justify-center bg-background/50">
                        <Loader2Icon className='animate-spin' />
                    </div>
                ) : ''}

                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <motion.div
                                className='origin-top-left'
                                initial={{
                                    height: 0,
                                    opacity: 0,
                                    scale: 0.5
                                }}
                                animate={{
                                    height: 'auto',
                                    opacity: 1,
                                    scale: 1
                                }}
                                exit={{
                                    height: 0,
                                    opacity: 0,
                                    scale: 0.5
                                }}
                            >
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </motion.div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='displayName'
                    render={({ field }) => (
                        <FormItem>
                            <motion.div
                                className='origin-top-left'
                                initial={{
                                    height: 0,
                                    opacity: 0,
                                    scale: 0.5
                                }}
                                animate={{
                                    height: 'auto',
                                    opacity: 1,
                                    scale: 1
                                }}
                                exit={{
                                    height: 0,
                                    opacity: 0,
                                    scale: 0.5
                                }}
                            >
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </motion.div>
                        </FormItem>
                    )}
                />

                {!isLoading ? (
                    <div className="actions flex items-center gap-2 justify-end w-full">
                        <Button
                            onClick={onclose}
                            type='button'
                            variant={'outline'}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <SubmitButton text='Save Changes' />
                    </div>
                ): ''}
            </motion.form>
        </Form>
    )
}

export default EditNameForm
