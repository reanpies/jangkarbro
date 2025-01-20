'use client';

import React, { useState } from 'react';
import Link from "next/link";
import Slider from "react-slick";
import { ProductCard } from '@/components/ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define the MenuItem type
interface MenuItem {
  _id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  order: number;
}

// Hardcoded menu data
const menuData: MenuItem[] = [
  {
    _id: '1',
    title: 'Nasi Tim',
    price: 60000,
    category: 'Main Course',
    imageUrl: 'nasi_tim.jpg',
    order: 1
  },
  {
    _id: '2',
    title: 'Nasi Capcay',
    price: 80000,
    category: 'Main Course',
    imageUrl: 'nasi_capcay.jpg',
    order: 2
  },
  {
    _id: '3',
    title: 'Saklon Cah',
    price: 95000,
    category: 'Kodok',
    imageUrl: 'saklon_cah.jpg',
    order: 1
  },
  {
    _id: '4',
    title: 'Ayam Cah Pete',
    price: 80000,
    category: 'Pete',
    imageUrl: 'ayam_cah_pete.jpg',
    order: 1
  }
];

export const Menu_Home = () => {
  const [currentCategory, setCurrentCategory] = useState<string>(menuData[0]?.category || "");

  const settings = {
    dots: true,
    infinite: false,
    speed: 650,
    slidesToShow: 4,
    slidesToScroll: 4,
    beforeChange: (_: any, nextSlide: number) => {
      const itemIndex = nextSlide * settings.slidesToShow;
      setCurrentCategory(menuData[itemIndex]?.category || currentCategory);
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
            {menuData.map((product) => (
              <div key={product._id} className="px-1">
                <div className="mx-auto">
                  <ProductCard
                    id={product._id}
                    image={product.imageUrl || '/default-menu-image.jpg'}
                    name={product.title}
                    price={`Rp. ${product.price.toLocaleString()}`}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="text-center mt-8">
          <Link href="/Menu">
            <button className="text-white px-4 py-2 transition">
              Lihat Menu Lainnya →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};