import React from 'react';
import { useCart } from '@/context/CartContext';
import { X } from 'lucide-react';

export const Cart: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cartItems, getTotal, removeFromCart } = useCart();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#003B72] p-5 rounded-lg max-w-md w-full relative">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-yellow-500" />
        </button>

        <h2 className="text-lg font-bold mb-4 text-yellow-500">Keranjang</h2>

        <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-yellow-500 text-center py-4">Keranjang kosong</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b">
                <div className="flex-1">
                  <div className="font-medium text-yellow-500">{item.name}</div>
                  <div className="text-sm text-yellow-500">
                    Rp. {item.price.toLocaleString()} x{item.quantity}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium text-yellow-500">
                    Rp. {(item.price * item.quantity).toLocaleString()}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="mt-4 border-t pt-3">
              <div className="flex justify-between items-center font-bold text-yellow-500">
                <span>Total = </span>
                <span>Rp. {getTotal().toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4">
              <button 
                onClick={onClose} 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-md transition-colors"
              >
                Selesaikan Pesanan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};