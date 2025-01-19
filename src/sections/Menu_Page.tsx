"use client";
import React, { useEffect, useState } from 'react';  
import { getMenuData } from '@/api/menu';  
import { ProductAddCart } from "@/components/ProductAddCart";  
import { Cart } from "@/components/Cart"; // Import the Cart component  
import Link from "next/link";  
import { MenuItem } from '@/types/menu';  
import Slider from "react-slick";  
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import { useCart } from '@/context/cartcontext';

export const Menu_Page = () => {  
  const [menu, setMenu] = useState<MenuItem[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  
  const [currentCategory, setCurrentCategory] = useState<string>("");  
  const [isCartOpen, setIsCartOpen] = useState(false); // State to manage cart visibility  
  
  const { cartItems } = useCart(); // Get cart items from context  
  
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
        setCurrentCategory(sortedMenu[0]?.category || "");  
      } catch (error) {  
        setError((error as Error).message);  
      } finally {  
        setLoading(false);  
      }  
    };  
  
    fetchMenu();  
  }, []);  
  
  if (loading) return <div>Loading...</div>;  
  if (error) return <div>Error: {error}</div>;  
  
  const settings = {  
    dots: true,  
    infinite: false,  
    speed: 650,  
    slidesToShow: 4,  
    slidesToScroll: 4,  
    beforeChange: (_: any, nextSlide: number) => {  
      const itemIndex = nextSlide * settings.slidesToShow;  
      setCurrentCategory(menu[itemIndex]?.category || currentCategory);  
    },  
    responsive: [  
      {  
        breakpoint: 1024,  
        settings: {  
          slidesToShow: 2,  
          slidesToScroll: 2,  
        },  
      },  
      {  
        breakpoint: 600,  
        settings: {  
          slidesToShow: 1,  
          slidesToScroll: 1,  
        },  
      },  
    ],  
  };  
  
  return (  
    <section className="min-h-screen pt-28 pb-20 bg-menuPageImg bg-no-repeat bg-cover bg-bottom">  
      <div className="container mx-auto px-4">  
        <p className="text-yellow-500 text-3xl mb-4 text-center">Menu Favorit</p>  
        <div className="max-w-6xl mx-auto">  
          <Slider {...settings}>  
            {menu.map((product) => (  
              <div key={product._id} className="px-1">  
                <div className="mx-auto">  
                  <ProductAddCart  
                    id={product._id}  
                    image={product.imageUrl || '/default-menu-image.jpg'}  
                    name={product.title}  
                    price={`Rp. ${product.price.toLocaleString()}`}  
                    maxQuantity={10}  
                  />  
                </div>  
              </div>  
            ))}  
          </Slider>  
        </div>  
        <div className="text-center mt-8">  
          <button onClick={() => setIsCartOpen(true)} className="text-white px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">  
            Keranjang ({cartItems.length})  
          </button>  
        </div>  
      </div>  
  
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />} {/* Render the Cart component */}  
    </section>  
  );  
};  
