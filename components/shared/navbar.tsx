import React from 'react'
import UserButton from '../user/user-button'
import { ModeToggle } from './theme-togler'

const Navbar = () => {
  return (
    <nav
    className='w-full h-[60px] p-2 flex items-center justify-between border-b '
    >
        <h1 className='text-lg font-semibold'>Klerk</h1>
   <div className="right flex items-center gap-2">
   <UserButton/>
   <ModeToggle/>
   </div>
    </nav>
  )
}

export default Navbar