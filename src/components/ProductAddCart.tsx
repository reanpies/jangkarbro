import React, { useState } from 'react';  
import { useCart } from '@/context/cartcontext';  

interface ProductAddCartProps {  
  id: string;  
  image: string;  
  name: string;  
  price: string;  
  maxQuantity: number;  
}  
  
export const ProductAddCart: React.FC<ProductAddCartProps> = ({ id, image, name, price, maxQuantity }) => {  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [quantity, setQuantity] = useState(0);  
  const { addToCart } = useCart();  
  
  const handleQuantityChange = (change: number) => {  
    setQuantity((prev) => Math.max(0, Math.min(maxQuantity, prev + change)));  
  };  
  
  const handleAddToCart = () => {  
    const itemPrice = parseInt(price.replace(/[^0-9]/g, ''), 10);  
    addToCart({ id, name, price: itemPrice, quantity });  
    setIsModalOpen(false);  
  };  
  
  return (  
    <div className="relative bg-[#003B72] m-2 flex flex-col max-w-[220px] rounded-lg shadow-lg transition-transform transform hover:translate-y-[-0.5rem] hover:shadow-xl cursor-pointer" onClick={() => setIsModalOpen(true)}>  
      <img src={image} alt="product-img" className="w-full h-32 object-cover rounded-t-lg" />  
      <div className="p-3">  
        <h3 className="text-base font-bold text-yellow-500">{name}</h3>  
        <div className="flex justify-between mt-1">  
          <div className="text-lg font-semibold text-white">{price}</div>  
        </div>  
      </div>  
  
      {isModalOpen && (  
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">  
          <div className="bg-white p-5 rounded-lg">  
            <h2 className="text-lg font-bold">{name}</h2>  
            <div className="flex items-center justify-between mt-4">  
              <button onClick={() => handleQuantityChange(-1)} className="bg-gray-300 px-2 py-1 rounded">-</button>  
              <span>{quantity}</span>  
              <button onClick={() => handleQuantityChange(1)} className="bg-gray-300 px-2 py-1 rounded">+</button>  
            </div>  
            <div className="mt-4">  
              <button onClick={handleAddToCart} className="bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>  
              <button onClick={() => setIsModalOpen(false)} className="ml-2 bg-red-600 text-white px-4 py-2 rounded">Close</button>  
            </div>  
          </div>  
        </div>  
      )}  
    </div>  
  );  
};  
