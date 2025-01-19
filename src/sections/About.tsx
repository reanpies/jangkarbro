"use client";    
    
import Image from "next/image";    
    
const About = () => {    
  return (    
    <div className="bg-white flex flex-col md:flex-row items-center justify-between p-4 max-w-6xl mx-auto mt-28 mb-28">    
      <div className="md:w-1/2 p-4">    
        <h2 className="text-3xl font-bold mb-12">Tentang Kami</h2>    
        <p className="text-lg mb-6">    
          Selamat datang di Restoran Jangkar, sebuah pelabuhan cita rasa di tengah sejuknya udara Cipanas. Kami adalah restoran Chinese yang menggabungkan perpaduan sempurna antara tradisi kuliner Tiongkok dan bahan-bahan segar lokal.    
        </p>    
        <p className="text-lg mb-6">    
          Sejak pertama kami membuka pintu, kami berkomitmen menyajikan pengalaman bersantap yang unik dan hangat. Setiap hidangan di Restoran Jangkar diolah dengan penuh dedikasi oleh chef kami, menggunakan resep turun-temurun yang dipadukan dengan sentuhan modern.    
        </p>    
        <p className="text-lg mb-6">    
          Nikmati suasana nyaman yang dihadirkan oleh kehangatan keramahan, aroma menggoda, dan rasa yang memikat hati. Dari jamur tumis hingga bumbu hotpot, kami berusaha untuk memberikan pengalaman perjalanan kuliner yang tak terlupakan.    
        </p>    
        <p className="text-lg">    
          Terima kasih telah menjadi bagian dari cerita kami di Cipanas. Selamat bersantap!    
        </p>    
      </div>    
      <div className="md:w-1/2 flex flex-wrap justify-center">    
        <Image    
          src="/About.png"    
          alt="About Us"    
          layout="responsive"    
          width={500}    
          height={500}    
          className="object-cover rounded-lg shadow-lg"    
        />    
      </div>    
    </div>    
  );    
};    
    
export default About;    
