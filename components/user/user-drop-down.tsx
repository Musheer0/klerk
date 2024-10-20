import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import React, { ReactNode } from 'react'
import Footer from "./footer"
import UserAction from "./user-actions"
  
  const UserDropDown = ({children}:{children:ReactNode}) => {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild className="select-none">
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="  bg-secondary shadow-sm p-0 rounded-md min-w-[300px] translate-x-5"  forceMount  >
        
         <UserAction/>
         <Footer/>
        </DropdownMenuContent>
      </DropdownMenu>
      
    )
  }
  
  export default UserDropDown