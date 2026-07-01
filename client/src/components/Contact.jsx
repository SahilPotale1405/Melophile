import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
function Contact(){
    const form = useRef();

                    const sendEmail = (e) => {
            e.preventDefault();

            emailjs
                .sendForm(
                "service_7pndnhn",
                "template_8vjnu6t",
                form.current,
                "ocazeTIDwRosdZV9M"
                )
                .then(() => {
                toast.success("Message sent successfully!");
                form.current.reset();
                })
                .catch((error) => {
                console.error("EmailJS Error:", error);
                alert("Something went wrong.");
                });
            };
    return (
        <section
        data-aos="fade-up"
        id="contact"
        className="relative px-6 sm:px-10 lg:px-24 py-24 bg-black text-white"
        >
            <div className="absolute left-1/2 w-[400px] h-[400px] bg-purple-700 opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="max-w-6xl mx-auto">
                <div className = "text-center mb-16">
                        <h2 className="text-5xl font-bold">
                            Contact <span className="text-purple-500">Us</span>
                        </h2>
                        <p className="text-gray-400 mt-4">
                            Start your guitar journey today.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                        {/*left side */}

                        <div className="bg-gray-900 rounded-3xl p-8">
                            <h3 className="text-2xl font-bold md-6">
                                Get In Touch
                            </h3>
                            
                            <div className= "space-y-6">
                                <div>
                                    <p className="text-purple-400 font-semibold">📞 Phone</p>
                                    <p className="text-gray-300"> +91 9322210102 </p>
                                </div>

                                <div>
                                    <p className="text-purple-400 font-semibold">📧 Email</p>
                                    <p className="text-gray-300">Melophile@gmail.com</p>
                                </div>
                                <div>
                                    <p className="text-purple-400 font-semibold">📍 Location</p>
                                    <p className="text-gray-300">Mumbai, Maharashtra</p>
                                </div>
                                <div className="pt-6">
                                <p className="text-purple-400 font-semibold mb-3">
                                    Follow Us
                                </p>

                                <div className="flex gap-4 text-2xl">
                                    🎸 📸 📘
                                </div>
                                </div>
                            </div>
                        </div>

                        {/*Right side*/}
                        <div className="bg-gray-900 rounded-3xl p-8">
                            <form 
                                ref={form}
                                onSubmit={sendEmail}
                                className="space-y-5"
                            >
                                <input 
                                    type="text"
                                    name="user_name"
                                    placeholder="Your Name"
                                    className="w-full p-4 rounded-xl bg-black border border-gray-700 focus:border-purple-500 focus:outline-none transition"
                                />

                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="Your Email"
                                    className="w-full p-4 rounded-xl bg-black border border-gray-700 focus:border-purple-500 focus:outline-none transition"
                                    />

                                <textarea
                                    rows="5"
                                    name="message"
                                    placeholder="Your Message"
                                    className="w-full p-4 rounded-xl bg-black border border-gray-700 focus:border-purple-500 focus:outline-none transition"
                                    ></textarea>

                                <button 
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-full font-semibold">
                                    Send Message
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            
        </section>

    );
}
export default Contact;