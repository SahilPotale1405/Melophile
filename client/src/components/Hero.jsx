import heroImage from "D:/Melophile/client/src/assets/guitarBoy.png";

function Hero() {
  return (
   <section
   data-aos="fade-up" 
   className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-24 py-16 min-h-screen overflow-hidden">

    {/* Background Glow */}
    <div className="absolute top-40 left-1/2 w-[600px] h-[600px] bg-purple-700 opacity-20 blur-[150px] rounded-full"></div>

    {/* Left Side */}
    <div className="max-w-2xl z-10">

      <p className="text-purple-300 mb-4 uppercase tracking-widest">
        Welcome to Melophile
      </p>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
        Learn Guitar <br />
        <span className="text-purple-400">The Easy Way</span>
      </h1>

      <p className="text-gray-300 text-lg leading-8 mb-8">
          Guitar lessons for everyone with flexible practice sessions,
          online learning, and personalized guidance.
      </p>

      {/*Buttons*/}

      <div className="flex flex-col sm:flex-row gap-4">
      <a href="#contact">
        <button className="bg-purple-600 hover:bg-purple-700 text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
          Try Free Lesson
        </button>
      </a>

      <a href="#about">
        <button className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition">
          Watch Video
        </button>
      </a>
      </div>

      {/*Stats*/}

      <div className="flex flex-wrap gap-8 mt-10 text-gray-400">

        <div>
          <h3 className="text-2xl font-bold text-white">10K+</h3>
          <p>Students Trained</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white">10+</h3>
          <p>Years Experience</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white">4.9★</h3>
          <p>Student Rating</p>
       </div>

      </div>

    </div>

      {/* Right Side */}
      <div className="flex justify-center flex-1 relative mt-10 lg:mt-0">

        {/* Glow Effect */}
        <div className="absolute w-[500px] h-[500px] bg-purple-800 blur-[120px] opacity-20 rounded-full"></div>

        {/* Floating Music Notes */}
          <div className="
            hidden lg:block
            absolute
            right-[-45px]
            bottom-32
            text-[180px]
            text-purple-500
            opacity-10
            animate-pulse
            pointer-events-none
            ">
              𝄞
          </div>

        <div className="
          hidden lg:block
          absolute
          top-[180px]
          right-[250px]
          text-2xl
          text-purple-400
          opacity-60
          animate-pulse
          pointer-events-none
          ">
            ♪
          </div>

          {/* <div className="
            hidden lg:block
            absolute
            bottom-32 right-24
            text-5xl
            text-pink-400
            opacity-60
            animate-bounce
            ">
              ♫
          </div> */}
        <img
        src={heroImage}
        alt="Guitar Illustration"
        className="w-[320px] sm:w-[500px] md:w-[650px] lg:w-[850px] object-contain relative z-10"
        />

        

      </div>

    </section>
  );
}

export default Hero;