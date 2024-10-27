import React from 'react'
import { MdError } from 'react-icons/md'

const Error = ({text}:{text:string}) => {
    if(text)
  return (
    <p className='text-sm text-destructive text-start  flex items-center gap-2'>
        <MdError/>
        {text}
    </p>
  )
}

export default Error