import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import axios from 'axios';
import { makeToast } from "@/utils/helper";
import { IoCloseCircleOutline } from "react-icons/io5";

interface PropsType {
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
}

const Popup = ({ setOpenPopup, setUpdateTable }: PropsType) => {
  const productData = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const [inputData, setInputData] = useState({
    title: productData.title,
    category: productData.category,
    price: productData.price,
    imageUrl: productData.imageUrl
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    axios
    .put(`/api/edit_product/${productData._id}`, inputData)
    .then((res) => {
        makeToast("Product Updated Successfully!");
        setUpdateTable((prevState) => !prevState);
    })
    .catch((err) => console.log(err))
    .finally(() => {
        dispatch(setLoading(false));
        setOpenPopup(false);
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000070] grid place-items-center">
      <div className="bg-white w-[700px] py-8 rounded-lg text-center relative">
        <IoCloseCircleOutline
          className="absolute text-2xl right-8 top-0 m-4 cursor-pointer hover:text-red-600"
          onClick={() => setOpenPopup(false)}
        />

        <h2 className="text-2x1 -mt-3">Edit Product</h2>

        <form className="mt-6 w-fit space-y-4 mx-auto" onSubmit={handleSubmit}>
        <input
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            type="text"
            placeholder="Title"
            value={inputData.title}
            onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
            }
            required
        />
        <input
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            type="text"
            placeholder="Category"
            value={inputData.category}
            onChange={(e) =>
                setInputData({ ...inputData, category: e.target.value })
            }
            required
        />
        <input
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            type="text"
            placeholder="Price"
            value={inputData.price}
            onChange={(e) =>
                setInputData({ ...inputData, price: e.target.value })
            }
            required
        />
        <input
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            type="text"
            placeholder="ImageUrl"
            value={inputData.imageUrl}
            onChange={(e) =>
                setInputData({ ...inputData, imageUrl: e.target.value })
            }
            required
        />
        <div className="flex justify-end">
            <button className="bg-accent block text-white px-8 py-2 rounded-lg self-center">
                Save
            </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Popup