'use client'
import ReactDom from 'react-dom';
import CartProducts from './CartProducts';
import { useStore } from './zustand.jsx';

const AddPortal = ({ cardArr: products }) => {
  const mergeDuplicateProducts = (products) => {
    const productMap = new Map();
  
    products.forEach((product) => {
      const key = `${product.pid}-${product.uid}`;
      if (productMap.has(key)) {
        productMap.get(key).quantity += product.quantity;
      } else {
        productMap.set(key, { ...product });
      }
    });
  
    return Array.from(productMap.values());
  };
  
  const mergedProducts = mergeDuplicateProducts(products);
  console.log(mergedProducts)
  
  const isOpen = useStore((state) => state.showCardPortal);
  const togglePortal = useStore((state) => state.setShowCardPortal);

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div onClick={togglePortal} className='z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-600 opacity-65'>
      </div>
      <div className="z-50 max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg fixed top-20 bottom-20 left-20 right-20">
        <div className='relative h-full w-full'>
          <section className='absolute left-0 top-0 right-96 bottom-40 m-2 border border-solid rounded-2xl border-gray-500 overflow-hidden overflow-y-scroll text-gray-800'>
            <h2 className='ml-3 mt-5 text-xl text-gray-700 font-extrabold'>Cart Details</h2>
            {mergedProducts ? (
              mergedProducts.map((product) => (
                <div key={product.id} className='w-full p-2'>
                  <CartProducts product={product} />
                    {/* // uid={product.uid}
                    // pid={product.id}
                    // image={product.image}
                    // title={product.title}
                    // category={product.category}
                    // description={product.description}
                    // price={product.price}
                    // rating={product.rating}
                    // quantity={product.quantity}
                  /> */}
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </section>
          <section className='absolute right-0 top-2 bottom-2 w-96 border border-solid rounded-2xl border-gray-500'></section>
          <section className='absolute left-2 bottom-2 right-96 h-[150px] mr-2 mt-2 border border-solid rounded-2xl border-gray-500'></section>
          <button className='absolute -top-5 -right-5 w-8 h-8 rounded-full bg-gray-500 flex justify-center items-center' onClick={togglePortal}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
    , document.body
  );
};

export default AddPortal;
