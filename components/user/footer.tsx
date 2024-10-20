import React from 'react'

const Footer = () => {
  return (
    <div
    className='bg-secondary/50 flex flex-col items-center py-2 px-0'
    >
      <div className="banner py-1 ">
      <p
      className='text-[12px] mx-auto  text-muted-foreground flex items-center gap-x-1 font-semibold' 
      >
          Secured by
           <span>
              <img className='w-4 h-4 object-cover ' src="https://authjs.dev/img/etc/logo-sm.webp" alt="auth js" />
              </span>
      <span>Auth.js</span>
      </p>
      </div>
    </div>
  )
}

export default Footer