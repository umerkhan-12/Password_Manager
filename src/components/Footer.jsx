import React from 'react'

export default function Footer() {
  return (
    <div className='pb-16 z-50 mt-10'>
      <footer className='flex justify-center items-center bg-purple-400 fixed w-full bottom-0 h-20 '>
        <div className='flex justify-center items-center gap-3'>
        <span className=' bg-gradient-to-r from-blue-300 to-purple-700 tracking-tight text-3xl'>PassMag</span>
        <span className='text-center flex justify-center  text-xl'>Created <span><img src="favicon.png" alt="" className='w-12 h-12 '/></span>By Umer Khan</span>
        {/* <span><img src="favicon.png" alt="" className='w-12 h-12 '/></span> */}
       </div>
      </footer>
    </div>
  )
}
