import { useEffect, useState } from "react";

function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const studentId = localStorage.getItem("studentId");

        if (!studentId) {
            setError("Student is not logged in");
            setLoading(false);
            return;
        }

        const fetchSessions = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/sessions/student/${studentId}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch sessions");
                }

                const data = await response.json();

                setSessions(data);
                setLoading(false);

            } catch (error) {
                console.error(error);
                setError("Unable to load your sessions");
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-gray-500">
                    Loading your sessions...
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
                    YOUR MELOPHILE JOURNEY
                </p>

                <h1 className="text-4xl font-bold text-gray-900">
                    My Sessions
                </h1>

                <p className="text-gray-500 mt-2">
                    View your complete practice and attendance history.
                </p>
            </div>

            {/* Sessions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {sessions.length > 0 ? (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>
                                <tr>
                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase text-gray-600">
                                        Date
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase text-gray-600">
                                        Type
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase text-gray-600">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {sessions.map((session) => (

                                    <tr
                                        key={session._id}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition"
                                    >

                                        <td className="px-6 py-4 border-b text-gray-700">
                                            {new Date(
                                                session.date
                                            ).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>

                                        <td className="px-6 py-4 border-b text-gray-700">
                                            {session.type}
                                        </td>

                                        <td className="px-6 py-4 border-b">

                                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                                                {session.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="p-10 text-center">

                        <div className="text-4xl mb-3">
                            🎵
                        </div>

                        <h2 className="font-semibold text-gray-900">
                            No sessions yet
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Your sessions will appear here once the academy
                            records your attendance.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Sessions;