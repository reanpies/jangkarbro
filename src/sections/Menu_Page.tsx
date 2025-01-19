"use client";
import React, { useEffect, useState } from 'react';
import { getMenuData } from '@/api/menu';
import { ProductAddCart } from "@/components/ProductAddCart";
import { Cart } from "@/components/Cart";
import Link from "next/link";
import { MenuItem } from '@/types/menu';
import { useCart } from '@/context/CartContext';

export const Menu_Page = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cartItems } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuData = await getMenuData();
        const sortedMenu = menuData.sort((a, b) => {
          if (a.category === b.category) {
            return a.order - b.order;
          }
          return a.category.localeCompare(b.category);
        });
        setMenu(sortedMenu);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  // Group menu items by category
  const groupedMenu = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen bg-[#092C4C]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Menu Favorit</h1>

        {/* Categories and Products */}
        <div className="space-y-8">
          {Object.entries(groupedMenu).map(([category, products]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-white/20 pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div key={product._id} className="bg-white/10 rounded-lg p-4">
                    <ProductAddCart  
                    id={product._id}  
                    image={product.imageUrl || '/default-menu-image.jpg'}  
                    name={product.title}  
                    price={`Rp. ${product.price.toLocaleString()}`}  
                    maxQuantity={10}  
                  /> 
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-4 right-4 text-white px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-lg"
        >
          Keranjang ({cartItems.length})
        </button>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <Cart onClose={() => setIsCartOpen(false)} />
      )}
    </div>
  );
};
