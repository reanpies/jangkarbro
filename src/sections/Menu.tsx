// src/components/Menu.tsx  
import { ProductCard } from "@/components/ProductCard";  
import productData from "@/data/productData"; // Adjust the path as necessary  
  
export const Menu = () => {  
  return (  
    <section className="pt-28 pb-20 bg-menuPageImg bg-no-repeat bg-cover bg-bottom w-full h-screen flex items-center justify-center">  
      <div className="text-center">  
        <p className="text-yellow-500 text-3xl mb-4">Menu Favorit</p>  
        <div className="flex flex-wrap justify-center">  
          {productData.map((product) => (  
            <ProductCard  
              key={product.id}  
              id={product.id}  
              image={product.image}  
              name={product.name}  
              price={`Rp. ${product.price}`} 
            />  
          ))}  
        </div>  
        <button className="text-white mt-8 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">  
          Lihat Menu Lainnya →  
        </button>  
      </div>  
    </section>  
  );  
};   
