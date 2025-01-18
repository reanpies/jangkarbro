import { Header } from "../src/sections/Header";
import { Hero } from "../src/sections/Hero";
import { Menu_Home } from "@/sections/Menu_Home";
import About from "@/sections/About";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return <>
  <Header/>
  <Hero/>
  <Menu_Home/>
  <About/>
  <Footer/>
  </>;
}
