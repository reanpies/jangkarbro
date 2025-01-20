"use client";      
import { useEffect, useState } from 'react';      
  
// Define the interface for the about data  
interface AboutData {  
  facebookPH?: string;  
  instagramPH?: string;  
  instagram?: string;  
  facebook?: string;  
  Email?: string;  
  whatsappPH?: string;  
}  
  
export const Footer = () => {      
  const [aboutData, setAboutData] = useState<AboutData | null>(null);      
  const [loading, setLoading] = useState(true);      
  const [error, setError] = useState<string | null>(null);      
  
  useEffect(() => {      
    const fetchAboutData = async () => {      
      try {      
        const response = await fetch('/api/about');      
        if (!response.ok) {      
          throw new Error('Failed to fetch about data');      
        }      
        const data: AboutData = await response.json();      
        setAboutData(data);      
      } catch (err: any) {      
        setError(err.message);      
      } finally {      
        setLoading(false);      
      }      
    };      
  
    fetchAboutData();      
  }, []);      
  
  if (loading) return <div>Loading...</div>;      
  if (error) return <div>Error: {error}</div>;      
  
  return (      
    <section className="footer-bg bg-no-repeat bg-cover w-full min-h-[400px] flex flex-col items-start p-10 text-white">      
      {/* Google Maps Section */}      
      <div className="w-full">      
        <iframe      
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.2473333387397!2d107.04267287370803!3d-6.7396545658968545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69b3a91d37c721%3A0xfa08068702d7e745!2sRestoran%20Jangkar!5e0!3m2!1sen!2sid!4v1737132366496!5m2!1sen!2sid"      
          width="100%"      
          height="300"      
          style={{ border: 0 }}      
          allowFullScreen      
          loading="lazy"      
        ></iframe>      
        <h1 className="mt-4 text-white text-4xl md:text-5xl lg:text-6xl text-center">      
          {aboutData?.facebookPH || 'RESTORAN JANGKAR'}      
        </h1>      
      </div>      
  
      {/* Info Sections Below the Restaurant Name */}      
      <div className="flex flex-col md:flex-row justify-between w-full mt-4 mb-20">      
        {/* Left Section */}      
        <div className="flex flex-col mt-4 text-sm md:text-base lg:text-lg">      
          <h2 className="text-yellow-500 text-xl">Social Media:</h2>      
          <p>      
            Instagram: <a href={aboutData?.instagram || '#'} target="_blank" rel="noopener noreferrer">{aboutData?.instagramPH || 'Instagram'}</a>      
          </p>      
          <p>      
            Facebook: <a href={aboutData?.facebook || '#'} target="_blank" rel="noopener noreferrer">{aboutData?.facebookPH || 'Restoran Jangkar'}</a>      
          </p>      
        </div>      
  
        {/* Middle Section */}      
        <div className="flex flex-col mt-4 text-sm md:text-base lg:text-lg">      
          <h2 className="text-yellow-500 text-xl">Everyday:</h2>      
          <p>07:00 - 18:00</p>      
        </div>      
  
        {/* Right Section */}      
        <div className="flex flex-col mt-4 text-sm md:text-base lg:text-lg">      
          <h2 className="text-yellow-500 text-xl">Contact Us:</h2>      
          <p>Email: {aboutData?.Email || 'resto-jangkar@gmail.com'}</p>      
          <p>Phone: <a href={`https://wa.me/${aboutData?.whatsappPH || '0812225244900'}`} target="_blank" rel="noopener noreferrer">{aboutData?.whatsappPH || '+62 1234 5678 9023'}</a></p>      
        </div>      
      </div>      
    </section>      
  );      
};      
