import Logo from "../assets/logo-jangkar.png"
import Image from "next/image";
import MenuIcon from "../assets/menu.svg"

export const Header = () => {
  return (
    <header className="sticky top-0 bg-[#003B72] z-50">
      <div className="py-3">
        <div className="container">
          <div className="flex items-center justify-between">
          <Image src={Logo} alt="Logo Jangkar" height={40} width={40} />
          <MenuIcon className="h-5 w-5 md:hidden fill-current text-white" />
          <nav className="hidden md:flex gap-10 text-white items-center">
            <a href="#">Home</a>
            <a href="/Menu">Menu</a>
            <a href="/About">About</a>
            <a href="/Contact">Contact</a> 
            <button className="text-yellow-500 font-bold">Reservasi</button>
          </nav>            
          </div>
        </div>
      </div>
    </header>
  );
};
