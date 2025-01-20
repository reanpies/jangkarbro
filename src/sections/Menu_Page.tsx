"use client";
import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import { getMenuData } from '@/api/menu';
import { ProductAddCart } from "@/components/ProductAddCart";
import { Cart } from "@/components/Cart";
import { MenuItem } from '@/types/menu';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Menu_Page = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const sliderRefs = useRef<Record<string, Slider>>({});
  
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

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-yellow-500 p-2 rounded-full shadow-lg hover:bg-yellow-600 text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-yellow-500 p-2 rounded-full shadow-lg hover:bg-yellow-600 text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    );
  };

  const handleReInit = (category: string) => {
    const slider = sliderRefs.current[category];
    if (slider) {
      const { state = {}, innerSlider, props = {} } = (slider as any);
      const slickTrack = innerSlider?.list?.querySelector?.(".slick-track");
      if (slickTrack) {
        const { settings } = (props.responsive?.find(
          (chkPoint: any) => chkPoint.breakpoint === state.breakpoint
        ) || { settings: props });
        if (settings?.variableWidth === false && slickTrack?.firstChild) {
          slickTrack.style.marginLeft = "0px";
        }
      }
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

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
        <h1 className="text-3xl font-bold text-yellow-500 mb-8">Menu Favorit</h1>

        {/* Categories and Products */}
        <div className="space-y-12">
          {Object.entries(groupedMenu).map(([category, products]) => (
            <div key={category} className="space-y-6">
              <h2 className="text-2xl font-semibold text-yellow-500 border-b border-white/20 pb-2">
                {category}
              </h2>
              <div className="px-4">
                <Slider 
                  {...sliderSettings} 
                  ref={ref => {
                    if (ref) {
                      sliderRefs.current[category] = ref;
                    }
                  }}
                  onReInit={() => handleReInit(category)}
                >
                  {products.map((product) => (
                    <div key={product._id} className="pr-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <ProductAddCart
                          id={product._id}
                          image={product.imageUrl || '/default-menu-image.jpg'}
                          name={product.title}
                          price={`Rp. ${product.price.toLocaleString()}`}
                          maxQuantity={20}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-4 right-4 text-white px-8 py-3 bg-yellow-500 rounded-md hover:bg-yellow-600 transition shadow-lg"
        >
          Keranjang ({cartItems.length})
        </button>

        {/* Cart Modal */}
        {isCartOpen && (
          <Cart onClose={() => setIsCartOpen(false)} />
        )}
      </div>
    </div>
  );
};