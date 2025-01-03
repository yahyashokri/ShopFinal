import Image from 'next/image'
import React, { useEffect } from 'react'

const CartProducts = (product) => {
  const [cartProduct, setCartProduct] = React.useState()
  useEffect(() => {
   setCartProduct(product.product)
  }, [product])
  console.log(cartProduct)
  if (cartProduct) return (
    <>
    <div className='border border-gray-600 w-full h-full rounded-2xl'>
      <div className=' w-full h-[100px]'><Image width={100} height={100} className=' rounded-l-2xl' src={cartProduct.imageurl} alt={cartProduct.title}/></div>
    </div>
    </>
  )
}

export default CartProducts