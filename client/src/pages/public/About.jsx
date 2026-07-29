function About() {
  return (
    <section
    data-aos="fade-right"
      id="about"
      className="px-6 sm:px-10 lg:px-24 py-24 bg-black"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          About <span className="text-purple-500">Melophile</span>
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg leading-8 max-w-4xl">
          Melophile is a modern guitar learning platform where students
          can learn, practice, and grow at their own pace. We provide
          flexible practice sessions, personalized mentoring, and
          online/offline learning experiences.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">

          {/* Card 1 */}
          <div className="bg-gray-900 rounded-3xl p-8 hover:-translate-y-2 hover:border-purple-500 transition-all duration-300">
            <div className="text-5xl mb-4">🎸</div>
            <h3 className="text-2xl font-bold mb-3">
              Acoustic & Electric Guitar
            </h3>
            <p className="text-gray-400 leading-7">
              Learn both acoustic and electric guitar through structured
              lessons designed for beginners and advanced learners.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 rounded-3xl p-8 hover:-translate-y-2 hover:border-purple-500 transition-all duration-300">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold mb-3">
              Trinity Grade Guidance
            </h3>
            <p className="text-gray-400 leading-7">
              Prepare for Trinity College London grade examinations with
              expert guidance, practice sessions, and performance tips.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 rounded-3xl p-8 hover:-translate-y-2 hover:border-purple-500 transition-all duration-300">
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-2xl font-bold mb-3">
              Online & Offline Classes
            </h3>
            <p className="text-gray-400 leading-7">
              Learn from anywhere with flexible online sessions or join
              in-person classes for a more hands-on experience.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-900 rounded-3xl p-8 hover:-translate-y-2 hover:border-purple-500 transition-all duration-300">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold mb-3">
              Personalized Mentoring
            </h3>
            <p className="text-gray-400 leading-7">
              Every student receives individual attention and a learning
              plan tailored to their goals and musical interests.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;