"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'
import { IconType } from 'react-icons';
interface SocialButtonProps{
    text: string,
    Icon:IconType,
    Onclick? :()=>void,
    className?:string
}
const SocialButton = ({className, Icon, text, Onclick}:SocialButtonProps) => {
  return (
   <Button
   onClick={Onclick}
   className={cn(
    'flex items-center gap-2 py-0 rounded-xl min-w-[150px] h-[35px] text-sm bg-background border shadow-sm hover:bg-secondary/50 hover:shadow-md transition-all duration-300 ease-out text-foreground flex-1',
    className)}>
        <Icon  size={20}/>
    {text}
   </Button>
  )
}

export default SocialButton