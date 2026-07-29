import Navbar from "../../components/Navbar";
import Hero from "./Hero";
import About from "./About";
import WhyChoose from "./WhyChoose";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Footer from "../../components/Footer";

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <WhyChoose />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;