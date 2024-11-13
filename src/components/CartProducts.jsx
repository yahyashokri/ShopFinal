import React from 'react'

const CartProducts = (uid , pid, image, title, category, rating, price, quantity) => {
  console.log(uid , pid, image, title, category, rating, price, quantity)
  return (
    <>
    <div className='bg-black text-white w-full h-full'>{title}</div>
    </>
  )
}

export default CartProducts