'use client';

import React, { useEffect, useState } from 'react';
import { getMenuData } from '@/api/menu';
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { MenuItem } from '@/types/menu';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Menu_Home = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>("");

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