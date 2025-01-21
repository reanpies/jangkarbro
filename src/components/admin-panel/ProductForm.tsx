'use client';
import React, { FormEvent, useState, ChangeEvent } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { makeToast } from "@/utils/helper";
import Image from "next/image";

interface IPayload {
    _id: string;
    category: string;
    title: string;
    price: number;
    order: number;
    imageUrl: string;
    isActive: boolean;
}

const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    _id: "",
    category: "",
    title: "",
    price: 0, 
    order: 0, 
    imageUrl: "",
    isActive: true,
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        
        // Upload image first
        const uploadResponse = await axios.post('/api/upload', formData);
        const imageUrl = uploadResponse.data.imageUrl;
        
        // Then submit product with image URL
        const productData = {
          ...payload,
          imageUrl
        };
        
        await axios.post("/api/add_product", productData);
        makeToast("Product Added Successfully");
        
        // Reset form
        setPayload({
          _id: "",
          category: "",
          title: "",
          price: 0,
          order: 0,
          imageUrl: "",
          isActive: true,
        });
        setSelectedFile(null);
        if (e.target instanceof HTMLFormElement) {
          e.target.reset();
        }
      }
    } catch (err) {
      makeToast("Error adding product");
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={selectedFile ? URL.createObjectURL(selectedFile) : "/uploads/placeholder.jpeg"}
        width={800}
        height={500}
        alt="product_image"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2 rounded-md"
        required
      />
      <div>
        <label className="block ml-1">Product Name</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.title}
          onChange={(e) => setPayload({ ...payload, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block ml-1">Product Category</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.category}
          onChange={(e) => setPayload({ ...payload, category: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block ml-1">Product Price</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.price}
          onChange={(e) => setPayload({ ...payload, price: Number(e.target.value) })}
          required
        />
      </div>
      <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;