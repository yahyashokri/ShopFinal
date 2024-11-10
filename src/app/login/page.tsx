'use client'
import { supabaseClient } from '@/api/config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
const Login = () => {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const handleSignin = async (e: React.FormEvent) =>{
    e.preventDefault();
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: emailRef.current?.value || '',
      password: passRef.current?.value || ''
    })
    console.log(data)
    if (error) {
      alert(error);
    }
    router.push('/');

  }
  return (
    <div className='w-screen h-full bg-white flex justify-center max-w-screen'>
    <div className="flex justify-center h-screen w-10/12 bg-gray-100">
       <div className="bg-white p-8 rounded shadow-md w-full max-w-sm  mt-12"> 
        <form>
           <div className="mb-4">
           <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email address</label>
            <input ref={emailRef}  type="email" id="email" placeholder="Your email address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
             </div> <div className="mb-6"> 
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Your Password</label>
               <input ref={passRef} type="password" id="password" placeholder="Your password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" /> 
               </div>
                <div className="flex items-center justify-between">
                 <button onClick={(e)=>handleSignin(e)} type="submit" className="bg-customOrange hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Sign in </button>
                 <Link className='text-customOrange border-none' href={"/signup"}>create an account</Link>
                  </div> 
                 </form> 
                 </div> 
                 </div>
    </div>
  )
}

export default Login