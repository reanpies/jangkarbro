"use client";  
  
import { useState } from "react";    
import Image from "next/image";    
import { ChevronLeft, ChevronRight } from "lucide-react";    
  
const images = [    
  { src: "/ayam_cah_pete.jpg", name: "Item 1", price: "$100" },    
  { src: "/nasi_tim.jpg", name: "Item 2", price: "$150" },    
  { src: "/nasi_capcay.jpg", name: "Item 3", price: "$200" },    
  { src: "/saklon_cah.jpg", name: "Item 4", price: "$250" },    
  { src: "/nasi_capcay.jpg", name: "Item 5", price: "$300" },    
  { src: "/ayam_cah_pete.jpg", name: "Item 6", price: "$350" },    
];    
  
const ImageSlider = () => {    
  const [currentIndex, setCurrentIndex] = useState(0);    
  const itemsPerRow = 4; // Default for desktop  
  
  const getItemsPerRow = () => {  
    if (window.innerWidth < 640) return 2; // Mobile  
    if (window.innerWidth < 1024) return 3; // Tablet  
    return 4; // Desktop  
  };  
  
  const handleResize = () => {  
    setCurrentIndex(0); // Reset index on resize  
  };  
  
  window.addEventListener('resize', handleResize);  
  
  const maxItems = images.length;  
  const totalRows = Math.ceil(maxItems / itemsPerRow);  
    
  const prevSlide = () => {  
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalRows) % totalRows);  
  };  
  
  const nextSlide = () => {  
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalRows);  
  };  
  
  const startIndex = currentIndex * itemsPerRow;  
  const currentImages = images.slice(startIndex, startIndex + itemsPerRow);  
  
  return (    
    <div className="relative w-full max-w-4xl mx-auto mt-4">    
      <div className="flex justify-center overflow-hidden">    
        <div className="flex">    
          {currentImages.map((image, index) => (    
            <div key={index} className="p-2 w-1/2 md:w-1/3 lg:w-1/4">    
              <div className="bg-[#003B72] rounded-lg shadow-lg overflow-hidden">    
                <Image      
                  src={image.src}      
                  alt={`Slider Image ${index + 1}`}      
                  layout="responsive"      
                  width={400}      
                  height={300}      
                  className="w-full h-48 object-cover"      
                />      
                <div className="p-4 flex justify-between items-center">      
                  <h3 className="mb-10 text-lg font-bold text-yellow-500">{image.name}</h3>    
                  <p className="mt-10 text-md text-white ml-auto">{image.price}</p>      
                </div>      
              </div>      
            </div>    
          ))}    
        </div>    
      </div>    
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">  
        <ChevronLeft />  
      </button>  
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">  
        <ChevronRight />  
      </button>  
    </div>    
  );    
};    
  
export default ImageSlider;    
