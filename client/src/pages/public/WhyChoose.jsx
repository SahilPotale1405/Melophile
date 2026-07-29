function WhyChoose() {
    return (
        <section
        data-aos="fade-left" 
        id="courses"
        className="px-6 sm:px-10 lg:px-24 py-24 bg-black test-white"
        >
            <div className="max-w-7xl mx-auto">
                {/*Heading*/}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold">
                        Why Choose{" "}
                        <span className="text-purple-500">Melophile</span>
                    </h2>
                    <p className="text-gray-400 mt-4 text-lg">
                    </p>
                </div>            
                {/*Cards*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols3 gap-8">
                    {/*Card 1 */}
                    <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 hover:border hover:border-purple-500 transition-all duration-300">
                        <div className="text-5xl mb-4">🎸</div>
                        <h3 className= "text2xl font-semibold mb-4">
                            Personalized Attention
                        </h3>
                        <p className="text-gray-400 leading-7">
                            Every student gets individual guidance based on their
                            learning speed and musical goals.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 hover:border hover:border-purple-500 transition-all duration-300">
                        <div className="text-5xl mb-4">🎼</div>

                        <h3 className="text-2xl font-semibold mb-4">
                        Structured Learning
                        </h3>

                        <p className="text-gray-400 leading-7">
                        Learn guitar step-by-step with proper music concepts,
                        creativity, and practical sessions.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 hover:border hover:border-purple-500 transition-all duration-300">
                        <div className="text-5xl mb-4">🏆</div>

                        <h3 className="text-2xl font-semibold mb-4">
                        Grade Exam Guidance
                        </h3>

                        <p className="text-gray-400 leading-7">
                        Get expert preparation for Trinity College London
                        grade examinations and certifications.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 hover:border hover:border-purple-500 transition-all duration-300">
                        <div className="text-5xl mb-4">⏰</div>

                        <h3 className="text-2xl font-semibold mb-4">
                        Flexible Timings
                        </h3>

                        <p className="text-gray-400 leading-7">
                        Choose schedules that fit your lifestyle with online
                        and offline learning options.
                        </p>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 hover:border hover:border-purple-500 transition-all duration-300">
                        <div className="text-5xl mb-4">🎵</div>

                        <h3 className="text-2xl font-semibold mb-4">
                        Creative Music Training
                        </h3>

                        <p className="text-gray-400 leading-7">
                        Improve ear training, composition skills,
                        creativity, and musical confidence.
                        </p>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 hover:border hover:border-purple-500 transition-all duration-300">
                        <div className="text-5xl mb-4">🔥</div>

                        <h3 className="text-2xl font-semibold mb-4">
                        Guitar Provided
                        </h3>

                        <p className="text-gray-400 leading-7">
                        Acoustic and electric guitars are provided
                        during classes at no extra charge.
                        </p>
                    </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
                