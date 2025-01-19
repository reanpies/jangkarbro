// components/ProductCard.tsx  
import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa';  
  
interface ProductProps {  
  id: string;  
  image: string;  
  name: string;  
  price: string;  
}  

export const ProductCard: React.FC<ProductProps> = ({ id, image, name, price }) => {
  return (
    <div key={id} className="relative bg-[#003B72] m-2 flex flex-col max-w-[220px] rounded-lg shadow-lg transition-transform transform hover:translate-y-[-0.5rem] hover:shadow-xl">
      <img src={image} alt="product-img" className="w-full h-32 object-cover rounded-t-lg" />
      <div className="p-3">
        <h3 className="text-base font-bold text-yellow-500">{name}</h3>
        <div className="flex justify-between mt-1">
          <div className="text-lg font-semibold text-white">{price}</div>
        </div>
      </div>
    </div>
  );
};
  
// export const ProductCard: React.FC<ProductProps> = ({ id, image, name, price }) => {  
//   return (  
//     <div key={id} className="relative bg-[#003B72] m-4 flex flex-col max-w-xs rounded-lg shadow-lg transition-transform transform hover:translate-y-[-0.5rem] hover:shadow-xl">  
//       <img src={image} alt="product-img" className="w-full h-48 object-cover rounded-t-lg" />  
//       <div className="p-4">  
//         <h3 className="text-lg font-bold text-yellow-500">{name}</h3>  
//         <div className="flex justify-between mt-2">  
//           <div className="text-xl font-semibold text-white">{price}</div>  
//         </div>  
//         <div className="flex justify-between mt-2">   
//         </div>  
//       </div>  
//     </div>  
//   );  
// };  
