"use client";  
  
import { useState, useEffect } from "react";  
import Image from "next/image";  
import { ChevronLeft, ChevronRight } from "lucide-react";  
  
const images = [  
  { src: "/nasi_tim.jpg", name: "Nasi Tim", price: "Rp. 60.000" },  
  { src: "/ayam_cah_pete.jpg", name: "Ayam Cah Pete", price: "Rp. 80.000" },  
  { src: "/nasi_capcay.jpg", name: "Nasi Capcay", price: "Rp. 80.000" },  
  { src: "/saklon_cah.jpg", name: "Saklon Cah", price: "Rp. 95.000" },  
];  
  
const ImageSlider = () => {  
  const [currentIndex, setCurrentIndex] = useState(0);  
  const [itemsPerRow, setItemsPerRow] = useState(4); // Default for desktop  
  
  useEffect(() => {  
    const updateItemsPerRow = () => {  
      if (window.innerWidth < 640) setItemsPerRow(2); // Mobile  
      else if (window.innerWidth < 1024) setItemsPerRow(3); // Tablet  
      else setItemsPerRow(4); // Desktop  
    };  
  
    updateItemsPerRow(); // Set initial value  
    window.addEventListener("resize", updateItemsPerRow);  
  
    return () => {  
      window.removeEventListener("resize", updateItemsPerRow);  
    };  
  }, []);  
  
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
                  width={500} // Adjust width for wider images  
                  height={400} // Adjust height for wider images  
                  className="w-full h-48 object-cover"  
                />  
                <div className="p-4 flex justify-between items-center">  
                  <h3 className="mb-16 text-lg font-bold text-yellow-500 ">{image.name}</h3>  
                  <p className="mt-16 text-md text-white ml-auto">{image.price}</p>  
                </div>  
              </div>  
            </div>  
          ))}  
        </div>  
      </div>  
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">  
        <button onClick={prevSlide} className="text-white">  
          <ChevronLeft />  
        </button>  
      </div>  
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">  
        <button onClick={nextSlide} className="text-white">  
          <ChevronRight />  
        </button>  
      </div>  
    </div>  
  );  
};  
  
export default ImageSlider;  
