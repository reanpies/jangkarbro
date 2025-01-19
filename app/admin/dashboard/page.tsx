'use client';

import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { setLoading } from "@/redux/features/loadingSlice";
import ProductRow from "@/components/admin-panel/productrow";

export interface IProduct {
    _id: string;
    category: string;
    title: string;
    price: number;
    order: number;
    imageUrl: string;
  }

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
      
        axios
          .get("/api/menu")
          .then((res) => setProducts(res.data))
          .catch((err) => console.log(err))
          .finally(() => dispatch(setLoading(false)));
    }, [updateTable]);

    return (
        <div>
          <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
            <h2 className="text-3xl">All Products</h2>
      
            <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-500 border-t border-[#ececec]">
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Harga</th>
                    <th>Gambar</th>
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                    {products.map((product:IProduct, index) => (
                        <ProductRow 
                          key={product._id}
                          srNo={index + 1}
                          setOpenPopup={setOpenPopup}
                          setUpdateTable={setUpdateTable}
                          product={product}
                        />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
}

export default Dashboard