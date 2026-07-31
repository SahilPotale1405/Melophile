import Navbar from "../../components/public/Navbar";
import Hero from "./Hero";
import About from "./About";
import WhyChoose from "./WhyChoose";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Footer from "../../components/public/Footer";

function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Hero />
      <About />
      <WhyChoose />
      <Pricing />
      <Contact />
    </div>
  );
}

export default Home;