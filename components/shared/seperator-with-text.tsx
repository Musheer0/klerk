"use client"
import { cn } from '@/lib/utils'
import React, { useRef } from 'react'
interface Props{
    text : string;
    className?:string
}
const SeperatorWithText:React.FC<Props> = ({text, className}) => {
    const textref = useRef<HTMLParagraphElement|null>(null)
    const width = textref.current?.getBoundingClientRect().width || 0;
  return (
    <div
    className={cn(
        'relative bg-transparent py-2  flex items-center justify-center w-full',
        className
    )}
    >
          <div
  style={{width : `calc(50% - ${(width!/2)+10}px)`}}
  className={cn(" absolute top-1/2 -translate-y-1/2 left-0 border ")}
  ></div>
  <p ref={textref} className='text-sm  text-muted-foreground'>
    {text}
  </p>
  <div
  style={{width : `calc(50% - ${(width!/2)+10}px)`}}
  className={cn(" absolute  bg-secondary top-1/2 -translate-y-1/2 right-0 border ")}
  ></div>
    </div>
  )
}

export default SeperatorWithText