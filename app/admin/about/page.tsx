"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AboutPage = () => {
 const [formData, setFormData] = useState({
   whatsappPH: '',
   facebookPH: '',
   Email: '', 
   instagramPH: ''
 });

 useEffect(() => {
   fetchData();
 }, []);

 const fetchData = async () => {
   try {
     const response = await fetch('/api/about');
     const data = await response.json();
     setFormData(data);
   } catch (error) {
     console.error('Error:', error);
   }
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   const processedData = {
     whatsapp: `https://wa.me/${formData.whatsappPH}`,
     whatsappPH: formData.whatsappPH,
     facebook: `https://www.facebook.com/${formData.facebookPH}`,
     facebookPH: formData.facebookPH,
     Email: formData.Email,
     instagram: `https://www.instagram.com/${formData.instagramPH}/`,
     instagramPH: formData.instagramPH
   };

   try {
     const response = await fetch('/api/about', {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(processedData)
     });

     if (response.ok) alert('Updated successfully');
   } catch (error) {
     console.error('Error:', error);
   }
 };

 return (
   <div className="p-8">
     <h1 className="text-2xl font-bold mb-6">Edit About Section</h1>
     <form onSubmit={handleSubmit} className="max-w-2xl">
       <div className="flex items-center justify-between mb-4">
         <div className="flex-1 mr-4">
           <label className="block text-sm font-medium mb-1">
             WhatsApp Number <span className="text-gray-500">(Format: 081xxx)</span>
           </label>
           <input
             type="text"
             value={formData.whatsappPH}
             onChange={(e) => setFormData({...formData, whatsappPH: e.target.value})}
             className="w-full p-2 border rounded"
           />
         </div>
         <div className="text-gray-500 text-sm pt-6">
           Current: {formData.whatsappPH || 'None'}
         </div>
       </div>

       <div className="flex items-center justify-between mb-4">
         <div className="flex-1 mr-4">
           <label className="block text-sm font-medium mb-1">
             Facebook Username <span className="text-gray-500">(Will be added to: facebook.com/)</span>
           </label>
           <input
             type="text"
             value={formData.facebookPH}
             onChange={(e) => setFormData({...formData, facebookPH: e.target.value})}
             className="w-full p-2 border rounded"
           />
         </div>
         <div className="text-gray-500 text-sm pt-6">
           Current: {formData.facebookPH || 'None'}
         </div>
       </div>

       <div className="flex items-center justify-between mb-4">
         <div className="flex-1 mr-4">
           <label className="block text-sm font-medium mb-1">Email</label>
           <input
             type="email"
             value={formData.Email}
             onChange={(e) => setFormData({...formData, Email: e.target.value})}
             className="w-full p-2 border rounded"
           />
         </div>
         <div className="text-gray-500 text-sm pt-6">
           Current: {formData.Email || 'None'}
         </div>
       </div>

       <div className="flex items-center justify-between mb-4">
         <div className="flex-1 mr-4">
           <label className="block text-sm font-medium mb-1">
             Instagram Username <span className="text-gray-500">(Will be added to: instagram.com/)</span>
           </label>
           <input
             type="text" 
             value={formData.instagramPH}
             onChange={(e) => setFormData({...formData, instagramPH: e.target.value})}
             className="w-full p-2 border rounded"
           />
         </div>
         <div className="text-gray-500 text-sm pt-6">
           Current: {formData.instagramPH || 'None'}
         </div>
       </div>

       <button
         type="submit"
         className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
       >
         Save Changes
       </button>
     </form>
   </div>
 );
};

export default AboutPage