import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const SubmitButton = ({text, className}:{text:string, className?:string}) => {
  return (
    <Button
    style={{
        boxShadow: 'inset 0px 10px  10px -5px rgba(255,255, 255, .3), inset 0px -10px  10px -5px rgba(0,0, 0, .1)'
    }}
    className={cn(
      'rounded-[11px]  h-[35px] hover:border-primary hover:bg-primary/80 border border-transparent',
      className
    )}>{text}</Button>
  )
}

export default SubmitButton