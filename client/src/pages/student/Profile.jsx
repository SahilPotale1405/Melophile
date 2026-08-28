import { useEffect, useState } from "react";

function Profile() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const studentId = localStorage.getItem("studentId");

        if (!studentId) {
            setError("Student is not logged in");
            setLoading(false);
            return;
        }

        const fetchStudent = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/students/${studentId}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch student");
                }

                const data = await response.json();

                setStudent(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch student:", error);
                setError("Unable to load your profile");
                setLoading(false);
            }
        };

        fetchStudent();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-gray-500">
                    Loading your profile...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <p className="text-sm font-medium text-purple-600 mb-2">
                    YOUR MELOPHILE PROFILE
                </p>

                <h1 className="text-4xl font-bold text-gray-900">
                    My Profile
                </h1>

                <p className="text-gray-500 mt-2">
                    View your personal and academy information.
                </p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                {/* Profile Header */}
                <div className="flex items-center gap-5 pb-6 border-b border-gray-100">

                    <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold">
                        {student.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {student.name}
                        </h2>

                        <p className="text-gray-500">
                            {student.email}
                        </p>
                    </div>

                </div>

                {/* Personal Information */}
                <div className="mt-8">

                    <h3 className="text-lg font-semibold text-gray-900 mb-5">
                        Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <p className="text-sm text-gray-500 mb-1">
                                Full Name
                            </p>

                            <p className="font-medium text-gray-900">
                                {student.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-1">
                                Email
                            </p>

                            <p className="font-medium text-gray-900">
                                {student.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-1">
                                Phone
                            </p>

                            <p className="font-medium text-gray-900">
                                {student.phone}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-1">
                                Instrument
                            </p>

                            <p className="font-medium text-gray-900">
                                {student.instrument?.name || "Guitar"}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Academy Information */}
                <div className="mt-10 pt-8 border-t border-gray-100">

                    <h3 className="text-lg font-semibold text-gray-900 mb-5">
                        Academy Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-purple-50 rounded-xl p-5">
                            <p className="text-sm text-purple-600 mb-2">
                                Account Status
                            </p>

                            <p className="font-bold text-gray-900">
                                {student.status}
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-xl p-5">
                            <p className="text-sm text-green-600 mb-2">
                                Fees
                            </p>

                            <p className="font-bold text-gray-900">
                                {student.fees}
                            </p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-5">
                            <p className="text-sm text-blue-600 mb-2">
                                Sessions Left
                            </p>

                            <p className="font-bold text-gray-900">
                                {student.sessionsLeft}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;