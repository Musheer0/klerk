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
        <DropdownMenuContent className="overflow-hidden  bg-secondary shadow-sm m-2 p-0 rounded-md min-w-[300px] "  forceMount  >
        
         <UserAction/>
         <Footer/>
        </DropdownMenuContent>
      </DropdownMenu>
      
    )
  }
  
  export default UserDropDown