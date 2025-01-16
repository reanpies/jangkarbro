const menuItems = [
  { id: 1, name: "Nasi Tim Ayam", image: "/nasi_tim.jpg", price: "Rp. 60.000" },
  { id: 2, name: "Ayam Cah Pete", image: "/ayam_cah_pete.jpg", price: "Rp. 80.000" },
  { id: 3, name: "Saklon Cah", image: "/saklon_cah.jpg", price: "Rp. 95.000" },
  { id: 4, name: "Nasi Capcay", image: "/nasi_capcay.jpg", price: "Rp. 80.000" },
];

export const CardSlider = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="min-w-[250px] bg-[#003B72] shadow-md rounded-lg overflow-hidden border"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};