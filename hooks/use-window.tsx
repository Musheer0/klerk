"use client"
import { useEffect, useState } from 'react'

const UseWindow = () => {
    const [haswindow, setWindow] = useState<Window|null>(null)
    useEffect(()=>{
       if(!haswindow) {
      if(window!==undefined){
        setWindow(window);
      }
       }
    }
    ,[haswindow])
  return (
    haswindow
  )
}

export default UseWindow