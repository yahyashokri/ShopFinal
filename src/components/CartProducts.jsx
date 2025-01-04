import { supabaseClient } from '@/api/config';
import Image from 'next/image';
import React, { useEffect } from 'react';

const CartProducts = ({ product }) => {
  const [cartProduct, setCartProduct] = React.useState(null);
  
  useEffect(() => {
    if (product) {
      setCartProduct(product);
    }
  }, [product]);

  const deleteProduct = async() =>{
    setCartProduct(null)
    const { error } = await supabaseClient
    .from('card')
    .delete()
    .eq('id', cartProduct.id)
    console.log(error)
  }

  const increaseQuantity= async() =>{
    setCartProduct((prevProduct) => {
      if (prevProduct.quantity > 1) {
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      } else {
        return null;
      }
    })
    const { data, error } = await supabaseClient
    .from('card')
    .update({ quantity : cartProduct.quantity + 1 })
    .eq('id', cartProduct.id)
    .select()
    console.log(data , error)
  }
  const decreaseQuantity= async() =>{
    setCartProduct((prevProduct) => {
      if (prevProduct.quantity > 1) {
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      } else {
        return null;
      }
    })
    if (cartProduct.quantity > 1) {
          const { data, error } = await supabaseClient
          .from('card')
          .update({ quantity: cartProduct.quantity - 1 })
          .eq('id', cartProduct.id)
          .select()
          console.log(data , error)
  }
  else{
    const { error } = await supabaseClient
  .from('card')
  .delete()
  .eq('id', cartProduct.id)
  console.log(error)
  }
}

  if (!cartProduct) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-200 w-full h-full rounded-2xl p-4">
      <div className="col-span-1 flex items-center justify-center">
        <Image
          width={200}
          height={300}
          className="rounded-l-2xl"
          src={cartProduct.imageurl}
          alt={cartProduct.title}
        />
      </div>
      <div className="col-span-3 flex flex-col justify-between">
        <div>
          <h2 className="text-gray-700 font-bold text-xl">{cartProduct.title}</h2>
          <h4 className="text-gray-500 font-medium text-sm mt-1">{cartProduct.description}</h4>
          <div className="flex items-center mt-2">
            <div className="text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`inline-block ${i < cartProduct.rating ? 'text-yellow-500' : 'text-gray-300'} text-lg`}>
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">({cartProduct.rating})</span>
          </div>
          <span className="text-2xl font-bold mt-2 block">${cartProduct.price * cartProduct.quantity}</span>
          {/* <p className="text-gray-600 mt-1">Quantity: {cartProduct.quantity}</p> */}
          <h5>{cartProduct.size}</h5>
        </div>
        <div className='flex justify-end'>
        <button
          onClick={deleteProduct}
          className="border border-red-800 text-red-800 rounded-full px-4 py-2 mt-4 self-end"
          >
          Delete
        </button>
        <div className="flex items-center mt-4">
                <button onClick={decreaseQuantity} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l">-</button>
                <span className="text-gray-800 px-4 py-1">{cartProduct.quantity}</span>
                <button onClick={increaseQuantity} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r">+</button>
          </div>
              </div>
      </div>
    </div>
  );
};

export default CartProducts;
