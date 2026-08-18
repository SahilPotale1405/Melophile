import { useState } from "react";

function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            alert("Please fill both fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        const studentId = localStorage.getItem("studentId");

        if (!studentId) {
            alert("Student not logged in");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/students/change-password/${studentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ newPassword }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Password changed successfully!");
            window.location.href = "/student/dashboard";

        } catch (error) {
            console.error(error);
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-3">
                    Create New Password
                </h1>

                <p className="text-gray-400 text-center text-sm mb-6">
                    You're using a temporary password.
                    Please create your own password to continue.
                </p>

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 outline-none"
                />

                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 mb-6 rounded-lg bg-gray-800 border border-gray-700 outline-none"
                />

                <button
                    onClick={handleChangePassword}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
                >
                    Change Password
                </button>

            </div>
        </div>
    );
}

export default ChangePassword;