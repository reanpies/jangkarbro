import { Header } from "../src/sections/Header";
import { Hero } from "../src/sections/Hero";
import { Menu } from "../src/sections/Menu";
import About from "@/sections/About";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return <>
  <Header/>
  <Hero/>
  <Menu/>
  <About/>
  <Footer/>
  </>;
}
