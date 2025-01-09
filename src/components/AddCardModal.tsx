'use client';
import ReactDOM from 'react-dom';
import { useStore } from './zustand';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabaseClient } from '@/api/config';

const AddCardModal = () => {
  const isOpen = useStore((state) => state.showAddCard);
  const togglePortal = useStore((state) => state.setShowAddCard);
  const product = useStore((state) => state.product);

  const [quantity, setQuantity] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [animationClass, setAnimationClass] = useState('translate-x-full');

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [selectedSize, setSelectedSize] = useState('S');
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  }

  const addProduct = async () => {
    const { data, error } = await supabaseClient
      .from('card')
      .insert([
        {
          uid: product.user,
          pid: product.pid,
          title: product.title || '',
          category: product.category || '',
          imageurl: product.image || '',
          price: product.price || 0,
          rating: product.rating || 0,
          description: product.description || '',
          quantity: quantity,
          size: selectedSize
        }
      ])
      .select();
    // if (error && error?.code == 42501 && "22P02") return alert('Please log in to your account to continue!');
    console.log(data, error);
  };

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => setAnimationClass('translate-x-0'), 10); // Add slight delay to ensure initial render is complete
    } else {
      setAnimationClass('translate-x-full');
      const timer = setTimeout(() => setIsMounted(false), 500); // Wait for the animation to complete
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted && !isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div onClick={togglePortal} className='z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-600 opacity-65'></div>
      <div className={`z-50 w-[600px] p-6 bg-white shadow-lg fixed top-0 bottom-0 right-0 transform transition-transform duration-500 ${animationClass}`}>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image className="h-48 w-full object-cover md:w-48" width={300} height={300} src={product.image} alt={product.title} />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.title}</div>
              <p className="block mt-1 text-lg leading-tight font-medium text-black">{product.description}</p>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`inline-block ${i < product.rating ? 'text-yellow-500' : 'text-gray-300'} text-lg`}>
                    ★
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <span className="text-slate-800 text-2xl font-bold">${product.price * quantity}</span>
              </div>
              <div className="flex items-center mt-4">
                <button onClick={decreaseQuantity} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l">-</button>
                <span className="text-gray-800 px-4 py-1">{quantity}</span>
                <button onClick={increaseQuantity} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r">+</button>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">Delivery limit: Free delivery within 50 km.</p>
                <p className="text-gray-600">Return Policy: Within 5 days of product delivery.</p>
              </div>
              <div className="mt-4">
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button key={size}
                      onClick={() => handleSizeClick(size)}
                      className={`w-10 h-10 border-2 rounded-full flex items-center justify-center font-bold ${selectedSize === size ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'} border-orange-500`}>
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    addProduct();
                    togglePortal();
                  }}
                  className="mt-36 border border-customOrange text-customOrange rounded-full px-4 py-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='relative h-full w-full'></div>
      </div>
    </>,
    document.body
  );
};

export default AddCardModal;
