import { useEffect, useState } from "react";
import InstrumentDropdown from "../../components/common/InstrumentDropdown";

function Register() {
    const [instruments, setInstruments] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [instrument, setInstrument] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/instruments")
            .then((res) => res.json())
            .then((data) => setInstruments(data))
            .catch((error) => console.log(error));
    }, []);

    const handleRegister = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/students/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        instrument,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert(data.message);

            setName("");
            setEmail("");
            setPhone("");
            setInstrument("");

        } catch (error) {
            console.error(error);
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-3">
                    Student Registration
                </h1>

                <p className="text-center text-gray-500 text-sm mb-6">
                    Submit your details to join Melophile
                </p>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg border"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg border"
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg border"
                />

                <InstrumentDropdown
                    instruments={instruments}
                    value={instrument}
                    onChange={setInstrument}
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold mt-4"
                >
                    Submit Registration
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                    Your account will be reviewed by the academy before
                    login credentials are provided.
                </p>

            </div>

        </div>
    );
}

export default Register;