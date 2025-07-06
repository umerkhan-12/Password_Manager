import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';


export default function Manager() {
  const ref = useRef(null)
  const inputRef = useRef(null)
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPassword = async ()=>{
    let req = await fetch ("http://localhost:3000/passwords")
    let passwords = await req.json()
    console.log(passwords)
    setpasswordArray(passwords)
  }

  useEffect(() => {
   
    getPassword()
  },
    [])


  const showAlet = () => {
    // alert("Show Password")

    console.log(ref.current.src)
    if (ref.current.src.includes("icons/eye-icon.png")) {
      inputRef.current.type = "text"
      ref.current.src = "icons/eye-blind-icon.png"
    }
    else {
      inputRef.current.type = "password"
      ref.current.src = "icons/eye-icon.png"

    }
  }

  const savePassword = async () => {
    toast('Password saved sucessfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // if any such id exit in dn delete it
     await fetch ("http://localhost:3000/delete" ,{method: "DELETE" , headers:{"Content-Type": "application/json" }
    , body: JSON.stringify({id:form.id})} )

    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    await fetch ("http://localhost:3000/add" ,{method: "POST" , headers:{"Content-Type": "application/json" }
     , body: JSON.stringify({...form ,id: uuidv4()})} )
    
    setform({ site: "", username: "", password: "" })
  }
  const deletePassword =  async (id) => {
    console.log("Delete password ", id)
    let c = confirm("Do you want to delete this password")
    if (c) {
         toast('Password deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
      setpasswordArray(passwordArray.filter(item => item.id !== id))
       let res = await fetch ("http://localhost:3000/delete" ,{method: "DELETE" , headers:{"Content-Type": "application/json" }
     , body: JSON.stringify({id})} )
    }
  }
  const editPassword = (id) => {
    console.log("edit password ", id)
    setform({...passwordArray.filter(i => i.id == id)[0],id:id})
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }



  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  {/* <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  /> */}



  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
      <h1 className='text-center  font-extrabold mt-4'><span className='bg-gradient-to-r from-blue-300 to-purple-700 tracking-tight text-3xl'>PassMag</span></h1>
      <p className='text-center font-bold'>Your own  Password manager </p>
      <div className=" mt-8 conatiner flex  justify-center  ">
        <div className="input flex flex-col justify-center  space-y-3  w-[30%]">
          <span className='text-black font-bold'>Website URL</span>
          <input value={form.site} onChange={handleChange} type="text" name="site" placeholder='Enter website url' className=' border-slate-500  border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full px-4 max-w-md' />
          <span className='text-black font-bold'>User-name</span>
          <input value={form.username} name="username" onChange={handleChange} className=' border-slate-500  border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full px-4 max-w-md' type="text" placeholder='Enter username ' />
          <span className='text-black font-bold'>Set password</span>
          <div className="relative w-full max-w-md">
            <input ref={inputRef} name="password" value={form.password} onChange={handleChange} className='border-slate-500 border-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500  rounded-full px-4' type="password" placeholder='Enter password' />
            <span> <img ref={ref} className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer' onClick={showAlet} width={20} src="icons/eye-icon.png" alt="eye" /></span>
          </div>
          <button onClick={savePassword} className='  border-2 rounded-lg mx-auto text-black font-semibold  p-1 bg-blue-400 hover:bg-blue-700 '>
            <div className="m-1 button flex justify-center text-center gap-3">
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover"
                className="">
              </lord-icon>
              <span className='mt-0.5'>Save</span>
            </div>
          </button>
        </div>
      </div>
      <h1 className='font-extrabold  text-xl p-4 text-center'>Your  Passwords</h1>
      {passwordArray.length === 0 && <div className='text-center font-bold'> No Password to show </div>}
      {passwordArray.length != 0 &&
        <div className="passTable flex justify-center m-4">
          <table className="table-auto w-[75%] border border-collapse">
            <thead className='bg-purple-400 text-center p-6 border border-black rounded-full overflow-hidden'>
              <tr>
                <th className='px-4 py-2 border border-blue-300' >Site</th>
                <th className='px-4 py-2 border border-blue-300'>Username</th>
                <th className='px-4 py-2 border border-blue-300'>Password</th>
                <th className='px-4 py-2 border border-blue-300'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-purple-100 text-center'>
              {passwordArray.map((item) => {

                return <tr key={item.id}>
                  <td className='px-4 py-2 border border-blue-600'><a href={item.site} target='_blank'>{item.site}</a> </td>
                  <td className='px-4 py-2 border border-blue-600'>{item.username}</td>
                  <td className='px-4 py-2 border border-blue-600'>{"*".repeat(item.password.length)}</td>
                  <td className='px-4 py-2 border border-blue-600 ' >
                    <span className='cursor-pointer size-5 ' onClick={() => { editPassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/exymduqj.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#121331,secondary:#4030e8"
                        className="w-6 h-6">

                      </lord-icon>
                    </span>
                    <span className='cursor-pointer ' onClick={() => { deletePassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/jzinekkv.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#121331,secondary:#a866ee"
                        className="w-6 h-6">
                      </lord-icon> </span></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>}
    </div>

  )
}
