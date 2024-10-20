
"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { IoIosSettings } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import SignOutButton from '../auth/sign-out-button'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { ModeToggle } from '../shared/theme-togler'
import { useUser } from '@/stores/useUser'
import ManageAccount from './user-manage-account-dailog'

const UserAction = () => {
    const { user } = useUser(); // Get user data from custom store

    // Render the user action UI only if the user is authenticated
    if (user)
        return (
            <div className='bg-background rounded-b-sm shadow-md'>
                <div className='p-5 pb-1 flex flex-col gap-1'>
                    <div className="user flex items-start gap-2">
                    <Avatar>
    <AvatarImage 
        src={user?.image || ''} // Use an empty string as a fallback if user.image is undefined
        alt={user?.name || 'User Avatar'} // Provide an alt text for accessibility
    />
    <AvatarFallback
        className='bg-primary text-background'
        style={{
            boxShadow: 'inset 0px 10px 10px -5px rgba(255,255, 255, .3), inset 0px -10px 10px -5px rgba(0,0, 0, .1)',
        }}
    >
        {user?.name?.slice(0, 2) || 'KL'} {/* Show initials if name is not available */}
    </AvatarFallback>
</Avatar>

                        <div className="info">
                            <p className='text-sm font-semibold'>{user?.name}</p> {/* Display user name */}
                            <p className='text-xs text-muted-foreground'>{user?.email}</p> {/* Display user email */}
                        </div>
                    </div>
                    <div className="actions py-4 flex w-full items-center gap-2 flex-wrap">
                        <ManageAccount>
                            <Button className='text-xs flex-1 h-[26px] rounded-[7px] flex items-center gap-1 w-fit hover:bg-secondary text-foreground/60 bg-background border border-foreground/20 shadow-md'>
                                <IoIosSettings size={15} /> {/* Settings icon */}
                                Manage account
                            </Button>
                        </ManageAccount>

                        <SignOutButton
                            className='text-xs flex-1 h-[26px] rounded-[7px] flex items-center gap-1 w-fit hover:bg-secondary text-foreground/60 bg-background border border-foreground/20 shadow-md'
                        >
                            <HiOutlineLogout size={15} /> {/* Logout icon */}
                            Sign-out
                        </SignOutButton>
                    </div>
                </div>
                <DropdownMenuSeparator className='border border-secondary/80' />
                <div className="theme flex items-center gap-2 py-2 px-5">
                    <ModeToggle /> {/* Theme toggle button */}
                </div>
            </div>
        );

    return null; // Render nothing if there is no user
}

export default UserAction;
