import { useEffect, useState } from "react";
import InstrumentDropdown from "../../components/common/InstrumentDropdown";

function Register() {
    const[instruments,setInstruments]= useState([]);

    const[name,setName]=useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [instrument, setInstrument] = useState("");


    useEffect(() =>{
        fetch("http://localhost:5000/api/instruments")
        .then((res)=>res.json())
        .then((data)=> setInstruments(data))
        .catch((error)=>console.log(error));
    },[]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Student Registration
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg border"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg border"
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e)=> setPhone(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg border"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg border"
                />
                <InstrumentDropdown
                    instruments={instruments}
                    value={instruments}
                    onChange={setInstruments}
                />
                <button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
                >
                    Register
                </button>

            </div>
        </div>
    );
}

export default Register;