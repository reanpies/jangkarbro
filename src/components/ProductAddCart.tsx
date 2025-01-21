"use client";  
  
import React, { useState, useCallback, useRef } from 'react';  
import { useCart } from '@/context/CartContext';  
  
interface ProductAddCartProps {  
  id: string;  
  image: string;  
  name: string;  
  price: string;  
  maxQuantity: number;  
}  
  
export const ProductAddCart: React.FC<ProductAddCartProps> = ({   
  id,   
  image,   
  name,   
  price,   
  maxQuantity   
}) => {  
  const [quantity, setQuantity] = useState(0);  
  const [popupVisible, setPopupVisible] = useState(false);  
  const { addToCart } = useCart();  
    
  // Swipe state  
  const startX = useRef(0);  
  const endX = useRef(0);  
  
  const handleQuantityChange = useCallback((change: number) => {  
    setQuantity((prev) => Math.max(0, Math.min(maxQuantity, prev + change)));  
  }, [maxQuantity]);  
  
  const handleAddToCart = useCallback(() => {  
    if (quantity > 0) {  
      const itemPrice = parseInt(price.replace(/[^0-9]/g, ''), 10);  
      addToCart({   
        id,   
        name,   
        price: itemPrice,   
        quantity   
      });  
      setPopupVisible(true);  
      setQuantity(0);  
        
      // Hide the popup after 2 seconds  
      setTimeout(() => {  
        setPopupVisible(false);  
      }, 2000);  
    }  
  }, [id, name, price, quantity, addToCart]);  
  
  // Swipe handlers  
  const handleTouchStart = (e: React.TouchEvent) => {  
    startX.current = e.touches[0].clientX;  
  };  
  
  const handleTouchMove = (e: React.TouchEvent) => {  
    endX.current = e.touches[0].clientX;  
  };  
  
  const handleTouchEnd = () => {  
    const distance = endX.current - startX.current;  
    if (distance > 50) {  
      // Swipe right  
      handleAddToCart();  
    } else if (distance < -50) {  
      // Swipe left (optional: add logic to dismiss or perform another action)  
    }  
  };  
  
  return (  
    <div   
      className="relative bg-[#003B72] m-2 flex flex-col w-full max-w-[280px] rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"  
      onTouchStart={handleTouchStart}  
      onTouchMove={handleTouchMove}  
      onTouchEnd={handleTouchEnd}  
    >  
      <div className="relative pt-[75%] w-full">  
        <img   
          src={image}   
          alt={name}  
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"  
        />  
      </div>  
      <div className="p-4 flex flex-col gap-2">  
        <h3 className="text-sm font-bold text-yellow-500 line-clamp-2">{name}</h3>  
        <div className="text-lg font-semibold text-white">{price}</div>  
      </div>  
  
      <div className="flex flex-col gap-4 p-4">  
        <div className="flex items-center justify-center gap-6">  
          <button   
            onClick={() => handleQuantityChange(-1)}  
            className="w-10 h-10 flex items-center justify-center text-xl bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 text-black"  
            disabled={quantity <= 0}  
          >  
            -  
          </button>  
          <span className="text-xl font-medium w-12 text-center">  
            {quantity}  
          </span>  
          <button   
            onClick={() => handleQuantityChange(1)}  
            className="w-10 h-10 flex items-center justify-center text-xl bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 text-black"  
            disabled={quantity >= maxQuantity}  
          >  
            +  
          </button>  
        </div>  
  
        <button   
          onClick={handleAddToCart}  
          disabled={quantity === 0}  
          className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-80 disabled:cursor-not-allowed"  
        >  
          Add to Cart  
        </button>  
      </div>  
  
      {popupVisible && (  
        <div className="absolute top-0 left-0 right-0 mt-2 p-2 bg-green-500 text-white text-center rounded-lg">  
          Item added to cart!  
        </div>  
      )}  
    </div>  
  );  
};  
  
export default ProductAddCart;  
