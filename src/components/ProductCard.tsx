import Image from 'next/image';
import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  categories: string;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, categories, rating }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden my-6 relative">
      <Image className="w-[260] h-[260]" src={image} alt={title} width={260} height={260} />
      <button className='bg-white rounded-full w-9 h-9 flex justify-center items-center absolute top-2 left-[203px]'>
      <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.7663 2.32611C15.3753 1.90569 14.9111 1.57219 14.4002 1.34465C13.8893 1.11711 13.3417 1 12.7887 1C12.2357 1 11.6881 1.11711 11.1772 1.34465C10.6663 1.57219 10.2021 1.90569 9.81116 2.32611L8.9998 3.19821L8.18843 2.32611C7.39874 1.4773 6.32768 1.00044 5.21089 1.00044C4.09409 1.00044 3.02303 1.4773 2.23334 2.32611C1.44365 3.17492 1 4.32616 1 5.52656C1 6.72696 1.44365 7.87819 2.23334 8.727L3.0447 9.5991L8.9998 16L14.9549 9.5991L15.7663 8.727C16.1574 8.30679 16.4677 7.80785 16.6794 7.25871C16.891 6.70957 17 6.12097 17 5.52656C17 4.93214 16.891 4.34355 16.6794 3.7944C16.4677 3.24526 16.1574 2.74633 15.7663 2.32611Z" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </button>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{categories}</p>
        <div className="text-gray-900 font-bold text-xl">${price}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`inline-block ${i < rating ? 'text-yellow-500' : 'text-gray-300'} text-lg`}>
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
