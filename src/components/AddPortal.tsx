'use client';
import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import CartProducts from './CartProducts';
import { useStore } from './zustand';
import { supabaseClient } from '@/api/config';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  quantity: number;
  added_at: string;
  title: string;
  category: string;
  imageurl: string;
  price: number;
  rating: number;
  description: string;
  id: string;
  pid: number;
  uid: string | null;
  size: string;
}

interface Card {
  cardArr: Product[] | null;
}

const AddPortal: React.FC<Card> = ({ usersInfo }) => {
  // const [user, setUser] = useState()
  const [fullName, setFullName] = useState()
  const [address, setAddress] = useState()
  const user = usersInfo[0];
  console.log(usersInfo)
  useEffect(()=>{
  if (usersInfo.length !== 0) {
    // setUser(usersInfo[0])
      setFullName(user["full-name"])
      setAddress(user.Address)
    }
    },[])
    // const fullName = user["full-name"];
    // const address = user.Address;
    const isOpen = useStore((state) => state.showCardPortal);
  const togglePortal = useStore((state) => state.setShowCardPortal);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productLength, setProductLength] = useState(products?.length ?? 0);
  const [isMounted, setIsMounted] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const fetchData = async () => {
    const { data: card } = await supabaseClient.from('card').select('*');
    setProducts(card);
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
      setIsMounted(true);
      setTimeout(() => setAnimationClass('translate-y-0'), 10);
    } else {
      setAnimationClass('translate-y-full');
      const timer = setTimeout(() => setIsMounted(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (products) {
      const total = products.reduce((total, product) => total + product.price * product.quantity, 0);
      setTotalPrice(total);
      setProductLength(products?.length ?? 0);
    }
  }, [products]);

  if (!isMounted) return null;

  
if (products?.length < 1){ return ReactDom.createPortal( 
  <> 
  <div onClick={togglePortal} className={`z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-600 transition-opacity duration-300 ${isOpen ? 'opacity-65' : 'opacity-0'}`} ></div> 
  <div className={`flex justify-center items-center z-50 max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg fixed top-8 bottom-8 left-16 right-16 transform transition-transform duration-500 ${animationClass}`}> 
   <Image width={300} height={300} src={'https://pjereaeszrgxezwznwbw.supabase.co/storage/v1/object/public/logo/images.png'} alt={'empty portal'} />
    </div>
     </> 
     , document.body ); }

  const portalContent = (
    <>
      <div
        onClick={togglePortal}
        className={`z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-600 transition-opacity duration-300 ${isOpen ? 'opacity-65' : 'opacity-0'}`}
      ></div>
      <div className={`z-50 max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg fixed top-8 bottom-8 left-16 right-16 transform transition-transform duration-500 ${animationClass}`}>
        <div className='relative h-full w-full'>
          <section className='absolute left-0 top-0 right-96 bottom-40 m-2 border border-solid rounded-2xl border-gray-500 overflow-hidden overflow-y-scroll text-gray-800'>
            <h2 className='ml-3 mt-5 text-2xl text-gray-800 font-bold'>Cart Details</h2>
            {products ? (
              products.map((product) => (
                <div key={product.id} className='w-full p-2'>
                  <CartProducts 
                    product={product} 
                    setProductLength={setProductLength} 
                    productLength={productLength}
                    setTotalPrice={setTotalPrice}
                    totalPrice={totalPrice} 
                  />
                </div>
              ))
            ) : (
              <p className='text-center text-gray-600'>No products available</p>
            )}
          </section>
          <section className='flex flex-col justify-between absolute right-0 top-2 bottom-2 w-96 border border-solid rounded-2xl border-gray-500 p-4'>
            <div className='flex flex-col justify-around'>
              <h2 className='text-xl font-extrabold text-gray-700 mb-2'>Order Summary</h2>
              <p className='text-gray-600'>Products added: {productLength}</p>
              <p className='text-gray-600'>GST: 1.25%</p>
              <p className='text-gray-600'>S-GST: 1.25%</p>
              <p className='text-gray-600'>Total Cart Value: <span className='font-bold'>${totalPrice.toFixed(2)}</span></p>
              <p className='text-gray-600'>Discount: 0%</p>
            </div>
            <Image width={500} height={400} src={'https://pjereaeszrgxezwznwbw.supabase.co/storage/v1/object/public/logo/Product%20Info.png'} alt={'delivery limit'} />
          </section>
          <section className='absolute left-2 bottom-2 right-96 h-[150px] mr-2 mt-2 border border-solid rounded-2xl border-gray-500 p-4'>
            <h2 className='text-xl font-extrabold text-gray-700 mb-4'>Delivery Information</h2>
            <p className='text-gray-600 mb-4'>Address: {address} | {fullName}</p>
            <Link href={'/dashboard'} className="border border-customOrange text-customOrange rounded-full px-4 py-2">Edit</Link>
          </section>
          {/* <button
            className='absolute -top-5 -right-5 w-8 h-8 rounded-full bg-gray-500 flex justify-center items-center'
            onClick={togglePortal}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L13 13"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </>
  );

  return ReactDom.createPortal(portalContent, document.body);
};

export default AddPortal;
