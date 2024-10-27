"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '@/stores/useUser';
import UserDropDown from './user-drop-down';

const UserButton =({size}:{size?:number}) => {
    const {user} = useUser()
  return (
    <div className='cursor-pointer '>
        <p className='hidden'>{size}</p>
        <UserDropDown>
        <Avatar >
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
        </UserDropDown>
    </div>
  )
}

export default UserButton