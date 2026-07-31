function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20">

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-purple-500 mb-4">
              Melophile 🎸
            </h2>

            <p className="text-gray-400 leading-7">
              Personalized guitar lessons for all skill levels.
              Learn, practice, and perform with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-purple-400 transition">
                  About
                </a>
              </li>

              <li>
                <a href="#pricing" className="hover:text-purple-400 transition">
                  Pricing
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-purple-400 transition">
                  Contact
                </a>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-gray-400">

              <p>📞 9322210102</p>

              <p>
                📍 Virar West,
                Maharashtra
              </p>

              <p>
                🎵 Learn • Practice • Perform
              </p>

            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">

          <p>
            © 2026 Melophile. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;