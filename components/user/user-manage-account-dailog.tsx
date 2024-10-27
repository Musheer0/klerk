"use client"

import React, { ReactNode, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IoMenu } from "react-icons/io5"
import { X } from 'lucide-react'
import EditName from './edit-name'
import EditEmail from './edit-email'
import { MdManageAccounts, MdOutlineSecurity } from "react-icons/md"
import Enable2fa from './enable-2fa'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useUser } from '@/stores/useUser'

const ManageAccount = ({ children }: { children: ReactNode }) => {
  const tabItems = useMemo(() => [
    { value: 'account', label: 'Account', icon: <MdManageAccounts /> },
    { value: 'security', label: 'Security', icon: <MdOutlineSecurity /> },
  ], [])
 const {user} = useUser()
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent 
        className='max-w-[800px] bg-secondary sm:bg-background overflow-hidden rounded-md w-[96%] h-[95vh] my-auto p-0'
        aria-label="Manage Account"
      >
        <Tabs defaultValue="account" className="w-full h-full flex flex-col sm:flex-row items-start">
          {/* Mobile Header */}
          <div className="header sm:hidden px-3 py-2 flex w-full justify-between items-center">
            <MobileSheetMenu tabItems={tabItems} />
            <DialogClose className='hover:bg-foreground/5 p-1 rounded-sm' aria-label="Close">
              <X />
            </DialogClose>
          </div>

          {/* Sidebar for larger screens */}
          <SidebarMenu tabItems={tabItems} />

          {/* Main content area */}
          <div className="content flex-1 rounded-t-md shadow-md border-2 sm:shadow-transparent sm:border-none sm:rounded-none bg-background w-full p-4 h-full">
            <TabsContent value="account" className='flex flex-col overflow-auto'>
              <SectionHeader title="Profile details" />
              <EditName />
              <EditEmail />
            </TabsContent>
            <TabsContent value="security" className='flex flex-col w-full h-full'>
              <SectionHeader title="Security" />
              {user?.accounts.length===0 && <Enable2fa/>}
              <div className='w-full flex flex-col py-2 border-b'>
                <p className='font-semibold'>Password</p>
                {user?.accounts.length===0&&                 <p className="text-xs bg-secondary w-fit px-2 py-1 rounded-full border">last updated on {user?.lastpasswordChange.toLocaleString()}</p>              }
                {user?.accounts.length!==0 ? <><div className='text-xs text-wrap  p-1 rounded-lg text-orange-500'>warning: your account is linked to your {user?.accounts[0].provider} account so  its not necessary to have an password</div></>:   <p>***************</p>}
                <div className="action flex items-center justify-between w-full pt-1">
                  {/* //it is new page as it can be used for both autharized and non autharized users */}
                  <Link href={'/reset-password'}>
                  <Button variant={'outline'}>Change Password</Button></Link>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// Component for rendering the mobile sheet menu
const MobileSheetMenu = ({ tabItems }: { tabItems: { value: string, label: string, icon: ReactNode }[] }) => (
  <Sheet>
    <SheetTrigger>
      <div className="left flex items-center gap-2 hover:bg-foreground/5 hover:text-primary group p-1 rounded-sm px-4">
        <IoMenu size={24} />
        <h3 className='text-foreground text-xl font-semibold group-hover:text-primary'>Account</h3>
      </div>
    </SheetTrigger>
    <SheetContent side={'left'} className='max-w-1/2' aria-label="Menu">
      <TabsList className='flex flex-col justify-start rounded-full bg-transparent w-full h-full'>
        <div className="header flex flex-col items-start justify-start w-full py-6">
          <h3 className='text-foreground text-2xl font-semibold'>Account</h3>
          <p className='text-sm'>Manage your account info.</p>
        </div>
        {tabItems.map(({ value, label, icon }) => (
          <SheetClose key={value} className='w-full'>
            <TabsTrigger value={value} className='w-full capitalize flex items-center justify-start gap-2'>
              {icon}
              {label}
            </TabsTrigger>
          </SheetClose>
        ))}
      </TabsList>
    </SheetContent>
  </Sheet>
)

// Component for rendering the sidebar menu on larger screens
const SidebarMenu = ({ tabItems }: { tabItems: { value: string, label: string, icon: ReactNode }[] }) => (
  <div className="menu h-full hidden sm:flex px-4 w-[250px] rounded-none bg-secondary">
    <TabsList className='flex flex-col justify-start rounded-full bg-transparent w-full h-full'>
      <div className="header flex flex-col items-start justify-start w-full py-6">
        <h3 className='text-foreground text-2xl font-semibold'>Account</h3>
        <p className='text-sm'>Manage your account info.</p>
      </div>
      {tabItems.map(({ value, label, icon }) => (
        <TabsTrigger value={value} key={value} className='w-full capitalize flex items-center justify-start gap-2'>
          {icon}
          {label}
        </TabsTrigger>
      ))}
      <div className="banner py-1 mt-auto">
        <p className='text-[12px] mx-auto text-muted-foreground flex items-center gap-x-1 font-semibold'>
          Secured by
          <span>
            <img className='w-4 h-4 object-cover' src="https://authjs.dev/img/etc/logo-sm.webp" alt="auth js" />
          </span>
          <span>Auth.js</span>
        </p>
      </div>
    </TabsList>
  </div>
)

// Component for rendering section headers
const SectionHeader = ({ title }: { title: string }) => (
  <div className="header border-b pb-4 flex w-full justify-between">
    <p className='text-xl font-semibold'>{title}</p>
    <DialogClose className='hidden sm:flex' aria-label="Close">
      <X />
    </DialogClose>
  </div>
)

export default ManageAccount
