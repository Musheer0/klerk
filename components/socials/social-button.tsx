"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'
import { IconType } from 'react-icons';
import Spinner from '../shared/spinner';
interface SocialButtonProps{
    text: string,
    Icon:IconType,
    Onclick? :()=>void,
    className?:string,
    loading?:boolean
}
const SocialButton = ({className, Icon, text, Onclick, loading}:SocialButtonProps) => {
  return (
   <Button
   disabled={loading}
   onClick={Onclick}
   className={cn(
    'flex items-center gap-2 py-0 rounded-xl min-w-[150px] h-[35px] text-sm bg-background border shadow-sm hover:bg-secondary/50 hover:shadow-md transition-all duration-300 ease-out text-foreground flex-1',
    className)}>
      {loading ? <Spinner/> :  <Icon  size={20}/>}
    {text}
   </Button>
  )
}

export default SocialButton