'use client';
import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { makeToast } from "@/utils/helper";
import Image from "next/image";

interface IPayload {
    category: string;
    title: string;
    price: number;
    order: number;
    imageUrl: string;
    isActive: boolean;
}

const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    category: "",
    title: "",
    price: 0, 
    order: 0, 
    imageUrl: "",
    isActive: true,
  })
  
  const dispatch = useAppDispatch()
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    axios
        .post("/api/add_product", payload)
        .then((res) => {
            makeToast("Product Added Successfully");
            setPayload({
                category: "",
                title: "",
                price: 0,
                order: 0,
                imageUrl: "",
                isActive: true,
            });
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(setLoading(false)));
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={payload.imageUrl ? payload.imageUrl : "/uploads/placeholder.png"}
        width={800}
        height={500}
        alt="product_image"
      />
    </form>
  );
};

export default ProductForm;