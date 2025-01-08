'use client'
import { supabaseClient } from '@/api/config';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
import { useStore } from './zustand';

const Dashboard = (users, error ) => {
    const router = useRouter()
    const signOut = async (e) => {
        e.preventDefault();
        await supabaseClient.auth.signOut();
        router.push('/');
        console.log('done')
    }
    console.warn(error)
    const user = users.user[0];
    const fullName = user["full-name"];
    const address = user.Address
    const transfer = useStore((state) => state.setUser);
    transfer({name: fullName, address: address})
    const phoneRef = useRef(null);
    const fullNameRef = useRef(null);
    const addressRef = useRef(null);

    
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(phoneRef.current?.value,addressRef.current?.value,fullNameRef.current?.value)
        const nameVal = fullNameRef.current?.value
        const addressVal= addressRef.current?.value

        if(addressVal === ''){
            console.log('Address did not update')
        }
            else{

                const { data, error } = await supabaseClient
                .from('users')
                .update({ Address: addressVal })
                .eq('Address', address)
                .select()
                console.log(data , error)
            }
        
                if(nameVal === ''){
                    console.log('name did not update')
                }
                    else{
        
                        const { data, error } = await supabaseClient
                        .from('users')
                        .update({ 'full-name': nameVal })
                        .eq('full-name', fullName)
                        .select()
                        console.log(data , error)
                    }
    }

  return (
    <div className='w-screen h-full bg-white flex justify-center max-w-screen'>
    <div className="flex justify-center h-screen w-10/12 bg-gray-100">
       <div className="bg-white p-8 rounded shadow-md w-full max-w-sm  mt-12"> 
        <form>
           <div className="mb-4">
           <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your full name</label>
          <input ref={fullNameRef}  type="text" id="name" placeholder={fullName} className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div> <div className="mb-6">
               <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your address</label>
           <input ref={addressRef}  type="text" id="address" placeholder={address} className="shadow appearance-none border rounded w-full h-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
               </div>
                <div className="flex items-center justify-between">
                 <button onClick={(e)=>handleUpdate(e)} type="submit" className=" w-80 bg-customOrange hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Update </button>
                  </div> 
                  <button onClick={(e)=>signOut(e)} className='w-80 bg-red-700 mt-4 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>sign out</button>
                 </form> 
                 </div> 
                 </div>
    </div>
  )
}

export default Dashboard