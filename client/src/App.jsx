import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WhyChoose from "./components/WhyChoose";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen">

      <Navbar />
      <Hero />
      <About/>
      <WhyChoose/>
      <Pricing/>
      <Contact/>
      <Footer/>

    </div>
  );
}

export default App;