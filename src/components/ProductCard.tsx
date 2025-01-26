//eslint-disable-next-line
'use client'
import { supabaseClient } from '@/api/config';
import Image from 'next/image';
import { useStore } from './zustand';
import { useEffect, useState, useRef } from 'react';

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

interface ProductCardProps {
  user: string;
  pid: number;
  image: string;
  title: string;
  price: number;
  description: string;
  category: string | null;
  rating: number;
  card: Product[];
}
// interface Favorite {
//   category?: string;
//   created_at?: string;
//   description?: string;
//   id?: number;
//   imageurl?: string;
//   pid?: number;
//   price?: number;
//   rating?: number;
//   title?: string;
//   uid?: string;
// }




const ProductCard: React.FC<ProductCardProps> = ({ user, pid, image, title, price, description, rating, category}) => {
  const [session, setSession] = useState(() => {
    const savedSession = localStorage.getItem('supabaseSession');
    return savedSession ? JSON.parse(savedSession) : false;
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const likeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setSession(true);
        localStorage.setItem('supabaseSession', JSON.stringify(true));
      } else if (event === "SIGNED_OUT") {
        setSession(false);
        localStorage.removeItem('supabaseSession');
      }
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const setProduct = useStore((state) => state.setProduct);
  const setShowAddCard = useStore((state) => state.setShowAddCard);
  const thisProduct = {
    user: user,
    pid: pid,
    image: image,
    title: title,
    price: price,
    description: description,
    rating: rating,
    category: category
  };

  const fetchFavorites = async () => {
    const { data: favorites, error } = await supabaseClient
      .from('Favorite')
      .select('*');

    setFavorites(favorites);

    if (error) {
      console.error('Error fetching favorites:', error);
      return;
    }
  };

  useEffect(() => {
    if (!isFavorite && likeButtonRef.current) {
      likeButtonRef.current.classList.remove('red-like-svg');
    }
    if (isFavorite && likeButtonRef.current) {
      likeButtonRef.current.classList.add('red-like-svg');
    }
  }, [isFavorite]);

  useEffect(() => {
    if (favorites.length > 1) {
      favorites.map((favorite) => {
        if (pid == favorite.pid && user == `${favorite.uid}`) {
          setIsFavorite(true);
        }
        console.log(isFavorite)
        console.log(user , pid)
        console.log(favorite.pid , favorite.uid)
      });
    }

  }, [favorites, pid, user , isFavorite]);

  useEffect(() => {
    fetchFavorites();
  }, [pid, user]);

  const useAddProduct = () => {
    if (session) {
      setProduct(thisProduct);
      setShowAddCard();
      console.log(useStore.getState().product);
      console.log(thisProduct);
    } else {
      alert('Please Log in to your Account first');
    }
  };

  const likeProduct = async () => {
    const { data, error } = await supabaseClient
      .from('Favorite')
      .insert({
        uid: thisProduct.user || '',
        pid: thisProduct.pid || '',
        title: thisProduct.title || '',
        category: thisProduct.category || '',
        imageurl: thisProduct.image || '',
        price: thisProduct.price || 0,
        rating: thisProduct.rating || 0,
        description: thisProduct.description || ''
      })
      .select();
  
    console.log(data, error);
    if (data) {
      setIsFavorite(true);
    }
  };
  
  

  const dislikeProduct = async () => {
    const { data, error } = await supabaseClient
      .from('Favorite')
      .delete()
      .eq('pid', pid)
      .eq('uid', user);
    console.log(data, error);

    if (!error) {
      setIsFavorite(false);
    }
  };

  const addFavorite = async () => {
    if (!isFavorite) {
      await likeProduct();
    } else {
      await dislikeProduct();
    }
  };


  return (
    <div className="max-w-sm rounded overflow-hidden my-6 relative">
      <Image className="w-[260] h-[260] " src={image} alt={title} width={260} height={260} />
      {/* like button */}
      <button ref={likeButtonRef} onClick={addFavorite} className={`bg-white rounded-full w-9 h-9 flex justify-center items-center absolute top-2 left-[203px] z-10 ${isFavorite? 'red-like-svg' : ''}`}>
        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.7663 2.32611C15.3753 1.90569 14.9111 1.57219 14.4002 1.34465C13.8893 1.11711 13.3417 1 12.7887 1C12.2357 1 11.6881 1.11711 11.1772 1.34465C10.6663 1.57219 10.2021 1.90569 9.81116 2.32611L8.9998 3.19821L8.18843 2.32611C7.39874 1.4773 6.32768 1.00044 5.21089 1.00044C4.09409 1.00044 3.02303 1.4773 2.23334 2.32611C1.44365 3.17492 1 4.32616 1 5.52656C1 6.72696 1.44365 7.87819 2.23334 8.727L3.0447 9.5991L8.9998 16L14.9549 9.5991L15.7663 8.727C16.1574 8.30679 16.4677 7.80785 16.6794 7.25871C16.891 6.70957 17 6.12097 17 5.52656C17 4.93214 16.891 4.34355 16.6794 3.7944C16.4677 3.24526 16.1574 2.74633 15.7663 2.32611Z" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      {/* add button */}
      <div className='w-[260px] h-[248px] bg-gray-800 rounded-lg absolute top-0 opacity-0 hover:opacity-80 transition-opacity'>
      <button onClick={useAddProduct} className='bg-white rounded-full w-12 h-12 flex justify-center items-center absolute top-[105px] left-[105px] '>
      <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H4.18032L5.01195 6.15508C5.01638 6.18353 5.02201 6.21159 5.02879 6.2392L6.69916 14.5848L6.69933 14.5857C6.83664 15.2759 7.21225 15.8959 7.76048 16.3373C8.3062 16.7766 8.98837 17.011 9.68864 17H19.3914C20.0916 17.011 20.7738 16.7766 21.3195 16.3373C21.868 15.8958 22.2437 15.2754 22.3808 14.5848L22.3809 14.5848L22.3823 14.5773L23.9823 6.18733C24.0381 5.89458 23.9605 5.59218 23.7705 5.36256C23.5805 5.13293 23.298 5 23 5H6.82043L5.98055 0.803743C5.88701 0.336385 5.47663 0 5 0H1ZM8.66055 14.1937L7.22073 7H21.7913L20.4185 14.1984C20.3723 14.4273 20.2474 14.6328 20.0654 14.7793C19.8826 14.9265 19.6538 15.0047 19.4192 15.0002L19.4 15H9.68L9.66084 15.0002C9.42619 15.0047 9.19743 14.9265 9.01461 14.7793C8.83179 14.6322 8.70656 14.4254 8.66084 14.1952L8.66055 14.1937ZM7 21C7 19.8954 7.89543 19 9 19C10.1046 19 11 19.8954 11 21C11 22.1046 10.1046 23 9 23C7.89543 23 7 22.1046 7 21ZM18 21C18 19.8954 18.8954 19 20 19C21.1046 19 22 19.8954 22 21C22 22.1046 21.1046 23 20 23C18.8954 23 18 22.1046 18 21Z" fill="black" fill-opacity="0.5"/>
      </svg>
      </button>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-600">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
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
