import { useEffect, useState } from "react";

function Dashboard() {
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

        fetch(`http://localhost:5000/api/students/${studentId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch student");
                }

                return res.json();
            })
            .then((data) => {
                setStudent(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load student details");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-gray-500">
                    Loading your dashboard...
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

            {/* Welcome Section */}
            <div>
                <p className="text-sm font-medium text-purple-600 mb-2">
                    YOUR MELOPHILE JOURNEY
                </p>

                <h1 className="text-4xl font-bold text-gray-900">
                    Welcome back, {student.name} 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Keep learning, keep practicing, keep making music.
                </p>
            </div>


            {/* Main Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Instrument Card */}
                <div className="lg:col-span-1 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-7 text-white shadow-lg">

                    <p className="text-purple-200 text-sm font-medium">
                        YOUR INSTRUMENT
                    </p>

                    <div className="flex items-center gap-4 mt-6">

                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
                            🎵
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold">
                                {student.instrument?.name || "Not assigned"}
                            </h2>

                            <p className="text-purple-200 mt-1">
                                Keep playing!
                            </p>
                        </div>

                    </div>

                </div>


                {/* Sessions Card */}
                <div className="lg:col-span-1 bg-white rounded-2xl p-7 shadow-sm border border-gray-100">

                    <div className="flex justify-between items-start">

                        <div>
                            <p className="text-gray-500 text-sm font-medium">
                                SESSIONS
                            </p>

                            <h2 className="text-4xl font-bold text-gray-900 mt-3">
                                {student.sessionsLeft}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                sessions remaining
                            </p>
                        </div>

                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-xl">
                            🎯
                        </div>

                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                        Your remaining sessions will be updated when
                        the academy records your attendance.
                    </div>

                </div>


                {/* Fee Card */}
                <div className="lg:col-span-1 bg-white rounded-2xl p-7 shadow-sm border border-gray-100">

                    <div className="flex justify-between items-start">

                        <div>
                            <p className="text-gray-500 text-sm font-medium">
                                FEE STATUS
                            </p>

                            <h2
                                className={`text-3xl font-bold mt-3 ${
                                    student.fees === "Paid"
                                        ? "text-green-600"
                                        : "text-red-500"
                                }`}
                            >
                                {student.fees}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                {student.fees === "Paid"
                                    ? "Everything is up to date"
                                    : "Please contact the academy"}
                            </p>
                        </div>

                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                                student.fees === "Paid"
                                    ? "bg-green-100"
                                    : "bg-red-100"
                            }`}
                        >
                            {student.fees === "Paid" ? "✓" : "!"}
                        </div>

                    </div>

                </div>

            </div>


            {/* Recent Sessions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Recent Sessions
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Your latest visits to Melophile
                        </p>
                    </div>

                    <button className="text-sm font-semibold text-purple-600 hover:text-purple-700">
                        View all →
                    </button>

                </div>

                <div className="p-6 rounded-xl bg-gray-50 text-center">

                    <div className="text-3xl mb-2">
                        🎵
                    </div>

                    <p className="font-semibold text-gray-900">
                        Your session history will appear here
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        Sessions will be shown once the academy records
                        your attendance.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;