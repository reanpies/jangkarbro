import ImageSlider from "@/components/ImageSlider";

export const Menu = () => {
  return <section className="pt-28 pb-20 bg-menuPageImg bg-no-repeat bg-cover bg-bottom w-full h-screen flex items-center justify-center">
    <div>
      <p className="text-yellow-500 text-3xl">
        Menu Favorit
      </p>
      <ImageSlider/>
      <button className="text-white mt-8">Lihat Menu Lainnya →</button>
    </div>
  </section>;
};
