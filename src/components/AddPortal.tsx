'use client';
import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import CartProducts from './CartProducts';
import { useStore } from './zustand';
import { supabaseClient } from '@/api/config';
import Image from 'next/image';

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

const AddPortal = () => {
  const isOpen = useStore((state) => state.showCardPortal);
  const togglePortal = useStore((state) => state.setShowCardPortal);
  const [products, setProducts] = useState(null)
  const fetchData = async() =>{
    const { data: card } = await supabaseClient
    .from('card')
    .select('*')
    setProducts(card)
  }

   if (isOpen) fetchData()

  if (!isOpen) return null;

 if (products?.length < 1 ){
    return ReactDom.createPortal(
      <>
        <div
          onClick={togglePortal}
          className='z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-600 opacity-65'
        ></div>
        <div className="z-50 max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg fixed top-8 bottom-8 left-16 right-16 flex justify-center items-center">
         <Image  width={300} height={300} src={'https://pjereaeszrgxezwznwbw.supabase.co/storage/v1/object/public/logo/images.png'} alt={'empty portal'}></Image>
    
        </div>
      </>
      , document.body
    );
  }

  return ReactDom.createPortal(
    <>
      <div
        onClick={togglePortal}
        className='z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-600 opacity-65'
      ></div>
      <div className="z-50 max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg fixed top-8 bottom-8 left-16 right-16">
        <div className='relative h-full w-full'>
          <section className='absolute left-0 top-0 right-96 bottom-40 m-2 border border-solid rounded-2xl border-gray-500 overflow-hidden overflow-y-scroll text-gray-800'>
            <h2 className='ml-3 mt-5 text-xl text-gray-700 font-extrabold'>Cart Details</h2>
            {products ? (
              products.map((product) => (
                <div key={product.id} className='w-full p-2'>
                  <CartProducts product={product} />
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </section>
          <section className='absolute right-0 top-2 bottom-2 w-96 border border-solid rounded-2xl border-gray-500'></section>
          <section className='absolute left-2 bottom-2 right-96 h-[150px] mr-2 mt-2 border border-solid rounded-2xl border-gray-500'></section>
          <button
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
          </button>
        </div>
      </div>
    </>
    , document.body
  );
};

export default AddPortal;
