"use client"
import React from 'react'
import { Switch } from '../ui/switch'
import { useUser } from '@/stores/useUser'
import SetUp2fa from './setup-2fa'

const Enable2fa = () => {
    const {user} = useUser()
  return (
    <div className='flex items-center py-5 border-b gap-2 justify-between'>
        <p className='font-semibold'>Two factor authentication</p>
       <SetUp2fa>
       <Switch  className='pointer-events-none' checked={!!user?.twofactorauthenticationenable}/>
       </SetUp2fa>
    </div>
  )
}

export default Enable2fa