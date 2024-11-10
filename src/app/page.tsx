import { supabaseServerClient } from '@/api/config'
import ProductCard from '@/components/ProductCard'
import { cookies } from 'next/headers'
import Image from 'next/image'
import React from 'react'

const page = async () => {
  const cookieStore = cookies()
  const supabase = supabaseServerClient(await cookieStore)
  const { data: productList, error } = await supabase.from('products').select('*')

  if (error) {
    console.error('Error fetching product list:', error)
    return <div>Error loading products</div>
  }

  return (
    <div className='w-screen h-full bg-white flex justify-center max-w-screen'>
      <div className='w-10/12 h-full bg-gray-100 flex justify-center'>
        <div className='w-[1050px] h-full bg-gray-100 '>
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
                 image={product.imageurl}
                  title={product.title}
                  category={product.category}
                  description={product.description}
                    price={product.price} 
                    rating={product.rating} /> 
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
