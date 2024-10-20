import { CircleCheck } from 'lucide-react'
import React from 'react'

const Error = ({text}:{text:string}) => {
    if(text)
  return (
    <p className='text-sm text-destructive flex items-center gap-2'>
        <CircleCheck/>
        {text}
    </p>
  )
}

export default Error