import { supabaseServerClient } from '@/api/config'
import AddCardModal from '@/components/AddCardModal'
import AddPortal from '@/components/AddPortal'
import ProductCard from '@/components/ProductCard'
import { cookies } from 'next/headers'
import Image from 'next/image'
import React from 'react'


const page = async () => {
  const cookieStore = cookies()
  const supabase = supabaseServerClient(await cookieStore)
  const { data: productList, error } = await supabase.from('products').select('*')
  const { data: users} = await supabase.from('users').select('id')
  const { data: cardArr} = await supabase.from('card').select('*')
  const { data: usersInfo } = await supabase.from('users').select('*')
  const user = users?.[0]?.id ?? 'defaultId';
  if (error) {
    console.error('Error fetching product list:', error)
    return <div>Error loading products</div>
  }

  

  return (
    <div className='w-full h-full bg-white flex justify-center max-w-full'>
      <div className='w-10/12 h-full bg-gray-100 flex justify-center'>
        <div className='w-[1050px] h-full bg-gray-100 '>
          <div className='w-full h-auto bg-gray-100 flex flex-col justify-center items-center'>
          <h2 className='text-customOrange text-xl'>***This website is not designed to be responsive for mobile devices and is just a demo for showing my capabilities***</h2>
          <h3 className='text-customOrange text-xl'>---Guest Account For Login: guest@test.com | password: 12345678---</h3>
          </div>
          <Image
            className='h-auto'
            src='https://pjereaeszrgxezwznwbw.supabase.co/storage/v1/object/public/Banner/ad-group.png'
            alt='Banner'
            width={1150}
            height={360}
          />
          <div className='flex flex-wrap justify-center'>
          {productList ? (
            productList.map((product) => (
              <div key={product.id} className='w-full sm:w-1/2 md:w-1/4 p-2'>
                 <ProductCard 
                 card ={cardArr}
                 key={product.id}
                user={user}
                pid = {product.id}
                 image={product.imageurl}
                  title={product.title}
                  category={product.category}
                  description={product.description}
                    price={product.price} 
                    rating={product.rating}
                     /> 
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
          <AddPortal usersInfo={usersInfo}/>
          <AddCardModal/>

          </div>
        </div>
      </div>
    </div>
  )
}

export default page
