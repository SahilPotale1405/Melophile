function Pricing() {
  return (
    <section
     data-aos="zoom-in"
      id="pricing"
      className="px-6 sm:px-10 lg:px-24 py-24 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Pricing <span className="text-purple-500">Plans</span>
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Flexible plans designed for every aspiring guitarist.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Plan 1 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 text-center hover:border-purple-500 transition">
            <h3 className="text-2xl font-bold mb-4">
              Once a Week
            </h3>

            <p className="text-gray-400 mb-4">
              4 Sessions / Month
            </p>

            <h2 className="text-5xl font-bold text-purple-400 mb-6">
              ₹1600
            </h2>

            <p className="text-gray-400 mb-8">
              Perfect for beginners who want to learn at a comfortable pace.
            </p>

            <button className="bg-purple-600 px-6 py-3 rounded-full hover:bg-purple-700 transition">
              Book Demo
            </button>
          </div>

          {/* Plan 2 */}
          <div className="bg-purple-900/20 border-2 border-purple-500 rounded-3xl p-8 text-center relative">

            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Three Days / Week
            </h3>

            <p className="text-gray-400 mb-4">
              12 Sessions / Month
            </p>

            <h2 className="text-5xl font-bold text-purple-400 mb-6">
              ₹2000
            </h2>

            <p className="text-gray-400 mb-8">
              Ideal for students who want faster progress and regular practice.
            </p>

            <button className="bg-purple-600 px-6 py-3 rounded-full hover:bg-purple-700 transition">
              Book Demo
            </button>
          </div>

          {/* Plan 3 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 text-center hover:border-purple-500 transition">
            <h3 className="text-2xl font-bold mb-4">
              Five Days / Week
            </h3>

            <p className="text-gray-400 mb-4">
              20 Sessions / Month
            </p>

            <h2 className="text-5xl font-bold text-purple-400 mb-6">
              ₹2500
            </h2>

            <p className="text-gray-400 mb-8">
              Best for dedicated learners who want maximum improvement.
            </p>

            <button className="bg-purple-600 px-6 py-3 rounded-full hover:bg-purple-700 transition">
              Book Demo
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Pricing;