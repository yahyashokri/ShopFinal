import { supabaseServerClient } from '@/api/config'
import { cookies } from 'next/headers'
import Image from 'next/image'
import React from 'react'

const page = async () => {
  const cookieStore = cookies()
  const supabase = supabaseServerClient(await cookieStore)
  const{ data : productList } = await supabase.from('products').select('*')

  return (
    <div className='w-screen h-full bg-white flex justify-center'>
      <div className='w-10/12 h-full bg-gray-100 flex justify-center'>
      <div className='w-[1200px] h-full bg-gray-100 '>
 <Image className='w-[1366px] h-auto' src={'https://pjereaeszrgxezwznwbw.supabase.co/storage/v1/object/public/Banner/ad-group.png'} alt='Banner' width={1366} height={361} ></Image>
    <p className='text-black'>{JSON.stringify(productList)}</p>
      </div>
      </div>
    </div>
  )
}

export default page