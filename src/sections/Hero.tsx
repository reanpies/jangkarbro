export const Hero = () => {
  return <section className="pt-28 pb-20 bg-bannerImg bg-no-repeat bg-cover bg-bottom w-full h-screen flex items-center justify-center">
    <div className="container">
      <div>
        <h1 className="text-7xl text-center font-bold tracking-tighter bg-gradient-to-b from-white to-[#F3BD2C] text-transparent bg-clip-text mt-6 leading-tight overflow-visible">
          Restoran Jangkar
        </h1>
        <p className="text-xl text-center tracking-tight mt-6 text-white">
          Rest & Run
        </p>
        <div className="flex justify-center gap-5 mt-6 ">
          <button className="btn btn-secondary">Lihat Menu</button>
          <button className="btn btn-primary">Reservasi</button>
        </div>
      </div>
    </div>
  </section>;
};
