import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

const Spinner = ({className, size}:{className?:string ,size?:number|string}) => {
  return (
    <Loader2 className={cn('animate-spin', className)} size={size}/>
  )
}

export default Spinner