import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
    return(
      <>
        <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-800">
            <a href="#" className="flex items-center gap-2">
                  <img
                      src={logo}
                      alt="Melophile Logo"
                      className="w-12 h-12 transition-transform duration-300 hover:rotate-6 hover:scale-110"
                  />

                  <span className="text-3xl font-bold text-white">
                      Melophile
                  </span>
              </a>
          
        <ul className="hidden md:flex gap-8 text-lg">
          <li><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        </nav>

        {/*Mobile Menu*/}
        
        {menuOpen && (
            <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-black">
              <a href="#">Home</a>
              <a href="#about">About</a>
              <a href="#pricing">Pricing</a>
              <a href="#contact">Contact</a>
            </div>
          )
        }
        </>
    );
}
export default Navbar;