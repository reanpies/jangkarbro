'use client';
import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { makeToast } from "@/utils/helper";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";

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
  })
  
  const dispatch = useAppDispatch()
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/add_product", payload);
      makeToast("Product Added Successfully");
      setPayload({
        _id:"",
        category: "",
        title: "",
        price: 0,
        order: 0,
        imageUrl: "",
        isActive: true,
      });
    } catch (err) {
      makeToast("Error adding product");
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={payload.imageUrl ? payload.imageUrl : "/uploads/placeholder.jpeg"}
        width={800}
        height={500}
        alt="product_image"
      />
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res?.[0]) {
            setPayload({
              ...payload,
              imageUrl: res[0].url,
              _id: res[0].key,
            });
            makeToast("Image uploaded successfully");
          }
        }}
        onUploadError={(error: Error) => {
          makeToast(`error ${error.message}`);
          console.error("Upload Error:", error);
        }}
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
    </form>
  );
};

export default ProductForm;