import { Header } from "@/sections/Header";  
import { Menu_Page } from "@/sections/Menu_Page";  
import { Footer } from "@/sections/Footer";  
import { CartProvider } from '@/context/cartcontext'; // Adjust the import path as necessary  
  
export default function Home() {  
  return (  
    <CartProvider>  
      <Header />  
      <Menu_Page />  
      <Footer />  
    </CartProvider>  
  );  
}  
