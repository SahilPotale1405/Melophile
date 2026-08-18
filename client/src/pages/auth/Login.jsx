import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/students/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        // Save logged-in student's ID
        localStorage.setItem("studentId", data.student._id);

        if (data.student.mustChangePassword) {
            navigate("/student/change-password");
        } else {
            navigate("/student/dashboard");
        }

    } catch (error) {
        console.error(error);
        alert("Unable to connect to server");
    }
};

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 outline-none"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 outline-none"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
                >
                    Login
                </button>

            </div>
        </div>
    );
}

export default Login;