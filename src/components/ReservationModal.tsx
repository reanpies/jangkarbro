"use client";    
import React, { useState } from 'react';    
    
interface ReservationModalProps {    
  isOpen: boolean;    
  onClose: () => void;    
}    
    
const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {    
  const [name, setName] = useState('');    
  const [people, setPeople] = useState('2 Orang');    
  const [date, setDate] = useState('');    
  const [isConfirming, setIsConfirming] = useState(false);    
    
  if (!isOpen) return null;    
    
  const handleSubmit = (e: React.FormEvent) => {    
    e.preventDefault();    
    setIsConfirming(true);    
  };    
    
  const handleConfirm = () => {    
    // Handle reservation logic here    
    alert('Reservation created!');    
    onClose();    
  };    
    
  const handleEdit = () => {    
    setIsConfirming(false);    
  };    
    
  return (    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">    
      <div className="bg-[#003B72] p-6 rounded-lg shadow-lg relative w-96"> {/* Set width here */}    
        <button    
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl p-2"  // Increased size  
          onClick={onClose}    
        >    
          &times; {/* Close icon */}    
        </button>    
        {isConfirming ? (    
          <>    
            <h2 className="text-xl font-bold mb-4 text-yellow-500 text-center">Konfirmasi Reservasi</h2>    
            <p className="text-white text-center">Reservasi atas nama <strong>{name}</strong></p>    
            <p className="text-white text-center">Meja untuk <strong>{people}</strong></p>    
            <p className="text-white text-center">Sabtu <strong>{date}</strong></p>    
            <p className="text-white text-center mt-5">Apakah yakin sudah benar?</p>    
              <button className="bg-yellow-500 text-black py-3 px-4 rounded w-full my-5" onClick={handleConfirm}>    
                Iya, buatkan reservasi    
              </button>    
              <button className="bg-gray-300 text-black py-3 px-4 rounded w-full" onClick={handleEdit}>    
                Belum, sesuaikan lagi    
              </button>    
          </>    
        ) : (    
          <>    
            <h2 className="text-xl font-bold mb-4 text-yellow-500">Reservasi Meja</h2>    
            <form onSubmit={handleSubmit}>    
              <div className="mb-4">    
                <label className="block mb-2 text-white">Atas Nama</label>    
                <input    
                  type="text"    
                  value={name}    
                  onChange={(e) => setName(e.target.value)}    
                  className="border rounded w-full p-2"    
                  required    
                />    
              </div>    
              <div className="mb-4">    
                <label className="block mb-2 text-white">Meja Untuk</label>    
                <select    
                  value={people}    
                  onChange={(e) => setPeople(e.target.value)}    
                  className="border rounded w-full p-2"    
                >    
                  <option>1 Orang</option>    
                  <option>2 Orang</option>    
                  <option>3 Orang</option>  
                  <option>4 Orang</option>    
                  <option>5 Orang</option>    
                  <option>6 Orang</option>   
                </select>    
              </div>    
              <div className="mb-4">    
                <label className="block mb-2 text-white">Tanggal</label>    
                <input    
                  type="date"    
                  value={date}    
                  onChange={(e) => setDate(e.target.value)}    
                  className="border rounded w-full p-2"    
                  required    
                />    
              </div>    
              <button type="submit" className="bg-yellow-500 text-black py-2 px-4 rounded w-full">    
                Selesai Reservasi    
              </button>    
            </form>    
          </>    
        )}    
      </div>    
    </div>    
  );    
};    
    
export default ReservationModal;    
