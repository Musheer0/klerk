import { CircleCheck } from 'lucide-react'
import React from 'react'

const Success = ({text}:{text:string}) => {
    if(text)
  return (
    <p className='text-sm text-emerald-500 flex items-center gap-2'>
        <CircleCheck/>
        {text}
    </p>
  )
}

export default Success