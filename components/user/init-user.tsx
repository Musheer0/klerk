"use client"

import { useUser } from '@/stores/useUser'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { GetSessionUser } from '@/lib/actions/auth-actions'
import { redirect } from 'next/navigation'

const InitUser = ({ children }: { children: ReactNode }) => {
    const {  status } = useSession(); // Get session data and status from next-auth
    const { user, setUser } = useUser(); // Access user state and updater from custom store
    const [isLoading, setIsloading] = useState(true); // Loading state

    useEffect(() => {
        // Function to fetch current user session
        const setSession = async () => {
            try {
                setIsloading(true); // Set loading to true before fetching
                const current_user = await GetSessionUser(); // Fetch current user session
                if (current_user) {
                    setUser(current_user!); // Update user state if current user exists
                }
            } catch (error) {
                toast('Something went wrong'); // Display error message on failure
                console.log(error)
            } finally {
                setIsloading(false); // Set loading to false after fetching
            }
        };

        setSession(); // Call the session fetching function
    }, [status]); // Dependency on session status

    // Show loading state while fetching user data
    if (isLoading && !user ) return (
        <div className='h-screen w-full flex items-center justify-center'>
            <Card className='shadow-md border overflow-hidden w-[95%] mx-auto max-w-[450px]'>
                <CardHeader className='flex items-center'>
                    <CardTitle className='text-lg'>Connecting to your account</CardTitle>
                </CardHeader>
                <CardContent className='p-1 px-10 rounded-xl border-b flex w-full items-center justify-center shadow-sm'>
                    <Loader2Icon className='animate-spin' />
                </CardContent>
                <CardFooter className='bg-secondary/50 flex flex-col items-center py-2'>
                    <div className="banner pb-3 pt-4">
                        <p className='text-[13px] mx-auto text-muted-foreground flex items-center gap-x-1 font-semibold'>
                            Secured by
                            <span>
                                <img className='w-4 h-4 object-cover' src="https://authjs.dev/img/etc/logo-sm.webp" alt="auth js" />
                            </span>
                            <span>Auth.js</span>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );

    // Render children if user is authenticated
    if (user) return (
        <>
            {children} {/* Render child components when user is present */}
        </>
    );

    // Render message when there is no session
    return  redirect('/sign-in')
};

export default InitUser;
