export const Footer = () => {    
  return (    
    <section className="footer-bg bg-no-repeat bg-cover w-full min-h-[400px] flex flex-col items-start p-10 text-white">    
      {/* Google Maps Section */}    
      <div className="w-full">    
        <a href="https://www.google.com/maps/place/Restoran+Jangkar/@-6.7396546,107.0426729,15z/data=!4m6!3m5!1s0x2e69b3a91d37c721:0xfa08068702d7e745!8m2!3d-6.7396546!4d107.0426729!16s%2Fg%2F11c1g3g3g3" target="_blank" rel="noopener noreferrer">  
          <iframe    
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.2473333387397!2d107.04267287370803!3d-6.7396545658968545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69b3a91d37c721%3A0xfa08068702d7e745!2sRestoran%20Jangkar!5e0!3m2!1sen!2sid!4v1737132366496!5m2!1sen!2sid"    
            width="100%"    
            height="300"    
            style={{ border: 0 }}    
            allowFullScreen    
            loading="lazy"    
          ></iframe>    
        </a>  
        <h1 className="mt-4 text-white text-4xl md:text-5xl lg:text-6xl text-center">    
          RESTORAN JANGKAR    
        </h1>    
      </div>    
    
      {/* Info Sections Below the Restaurant Name */}    
      <div className="flex flex-col md:flex-row justify-between w-full mt-4 mb-20">    
        {/* Left Section */}    
        <div className="flex flex-col mt-4 text-sm md:text-base lg:text-lg">    
          <h2 className="text-yellow-500 text-xl">Social Media:</h2>    
          <p>  
            Instagram: <a href="https://www.instagram.com/restojangkar3" target="_blank" rel="noopener noreferrer" className="text-yellow-500">@restojangkar3</a>  
          </p>    
          <p>  
            Facebook: <a href="https://www.facebook.com/managret/" target="_blank" rel="noopener noreferrer" className="text-yellow-500">Restoran Jangkar</a>  
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
          <p>Email: <a href="mailto:Email@gmail.com" className="text-yellow-500">Email@gmail.com</a></p>    
          <p>Phone: <a href="https://wa.me/6287776869673/" className="text-yellow-500">+62877-7686-9673</a></p>    
        </div>    
      </div>    
    </section>    
  );    
};    
