"use client"
import React, { ReactNode} from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { IoMenu } from "react-icons/io5";
import { X } from 'lucide-react'
import EditName from './edit-name'
import EditEmail from './edit-email'
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
const ManageAccount = ({children}:{children:ReactNode}) => {
  return (
    <Dialog >
    <DialogTrigger>{children}</DialogTrigger>
    <DialogContent className='max-w-[800px] bg-secondary sm:bg-background overflow-hidden rounded-md w-[96%] h-[95vh] my-auto    p-0'>
    <Tabs defaultValue="account" className="w-full h-full flex flex-col sm:flex-row items-start">
   <div className="header sm:hidden px-3 py-2 flex w-full justify-between items-center">
   <Sheet>
  <SheetTrigger>
  <div className="left flex items-center gap-2 hover:bg-foreground/5 hover:text-primary group p-1 rounded-sm px-4">
   <IoMenu  size={24}/>
   <h3 className='text-foreground text-xl font-semibold group-hover:text-primary'>Account</h3>
   </div>
  </SheetTrigger>
  <SheetContent side={'left'} className='max-w-1/2'>
  <TabsList className='flex flex-col justify-start rounded-full bg-transparent w-full h-full'>
  <div className="header flex flex-col items-start justify-start w-full  py-6 ">
        <h3 className='text-foreground text-2xl font-semibold'>Account</h3>
        <p className='text-sm'>Manage your account info.</p>
      </div>
    {['account', 'security'].map((e)=>{
      return      <SheetClose key={e} className='w-full'>
<TabsTrigger value={e}  className='w-full capitalize flex  items-center justify-start gap-2' >
        {e==='account'? <MdManageAccounts/>: < MdOutlineSecurity/>}
        {e}</TabsTrigger>
      </SheetClose>
    })}
    
    
  </TabsList>
  </SheetContent>
</Sheet>
    <DialogClose className='hover:bg-foreground/5 p-1 rounded-sm'>
        <X/>
      </DialogClose>
   </div>
   <div className="menu h-full hidden sm:flex  px-4 w-[250px] rounded-none bg-secondary">
   <TabsList className='flex flex-col justify-start rounded-full bg-transparent w-full h-full'>
  <div className="header flex flex-col items-start justify-start w-full  py-6 ">
        <h3 className='text-foreground text-2xl font-semibold'>Account</h3>
        <p className='text-sm'>Manage your account info.</p>
      </div>
    {['account', 'security'].map((e)=>{
      return       <TabsTrigger value={e} key={e} className='w-full capitalize flex items-center justify-start gap-2' >
        {e==='account'? <MdManageAccounts/>: < MdOutlineSecurity/>}
        {e}</TabsTrigger>
    })}
  <div className="banner py-1 mt-auto">
      <p
   className='text-[12px] mx-auto  text-muted-foreground flex items-center gap-x-1 font-semibold' 
      >
          Secured by
           <span>
              <img className='w-4 h-4 object-cover ' src="https://authjs.dev/img/etc/logo-sm.webp" alt="auth js" />
              </span>
      <span>Auth.js</span>
      </p>
      </div>
  </TabsList>
   </div>
  <div className="content flex-1 rounded-t-md shadow-md border-2 sm:shadow-transparent sm:border-none sm:rounded-none bg-background  w-full p-4 h-full">
  <TabsContent value="account" className='flex flex-col'>
  <div className="header border-b pb-4 flex w-full justify-between">
      <p className='text-xl font-semibold'>Profile details</p>
      <DialogClose className='hidden sm:flex'>
        <X/>
      </DialogClose>
      </div>
      <EditName />
      <EditEmail/>

  </TabsContent>
  <TabsContent value="security" className='flex flex-col w-full h-full'>
  <div className="header border-b pb-4 flex w-full justify-between">
      <p className='text-xl font-semibold'>Security</p>
      <DialogClose className='hidden sm:flex'>
        <X/>
      </DialogClose>
      </div>

  </TabsContent>
  </div>
</Tabs>

    </DialogContent>
  </Dialog>
  
  )
}

export default ManageAccount