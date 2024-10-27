"use client"
import { PlusIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'

const AddSession = () => {
  return (
<div onClick={async()=>{
  await fetch(`${process.env.NEXT_PUBLIC_APP_URL!}/api/addsession/push`,{method:'POST'}).then(async()=>{
      await signOut({redirectTo:'/sign-in'})
  })
}} className='w-full flex items-center gap-4 py-3 opacity-70 hover:opacity-100 cursor-pointer  border-t'>
        <div className="icon bg-secondary p-1 rounded-full border border-dashed border-foreground/20">
            <PlusIcon size={20}/>
        </div>
            <p className='text-sm font-semibold'>Add account</p>
            
    </div>
  )
}

export default AddSession