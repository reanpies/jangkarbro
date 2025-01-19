import React from 'react';  
import { useCart } from '@/context/cartcontext';  

export const Cart: React.FC<{ onClose: () => void }> = ({ onClose }) => {  
  const { cartItems, getTotal } = useCart();  
  
  return (  
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">  
      <div className="bg-white p-5 rounded-lg max-w-md w-full">  
        <h2 className="text-lg font-bold">Keranjang</h2>  
        <div className="mt-4">  
          {cartItems.map((item) => (  
            <div key={item.id} className="flex justify-between">  
              <span>{item.name}</span>  
              <span>Rp. {item.price.toLocaleString()} x{item.quantity}</span>  
              <span>Rp. {(item.price * item.quantity).toLocaleString()}</span>  
            </div>  
          ))}  
        </div>  
        <div className="mt-4 border-t pt-2">  
          <div className="flex justify-between">  
            <span>Total =</span>  
            <span>Rp. {getTotal().toLocaleString()}</span>  
          </div>  
        </div>  
        <div className="mt-4">  
          <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded">  
            Selesaikan Pesanan  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
};  
