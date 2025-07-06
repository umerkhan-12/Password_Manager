import React from 'react'


export default function Navbar() {
  return (
    <div className='bg-purple-400 text-black flex justify-between gap-5 px-4 h-10 items-center'> 
    <div className=" text-black text-xl font-extrabold  bg-gradient-to-r from-blue-300 to-purple-700 tracking-tight">PassMag
      
    </div>
    <ul>
      <li className='flex gap-5'>
        <a href="#">Home</a>
        <a href="#">Links</a>
        <a href="#">About</a>
        <a href="#">Contact us</a>
      </li>
    </ul>
    </div>

  )
}