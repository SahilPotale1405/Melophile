import { useEffect, useState } from "react";

function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    const studentId = localStorage.getItem("studentId");

    useEffect(() => {
        if (!studentId) {
            setError("Student is not logged in");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const [studentResponse, sessionsResponse] =
                    await Promise.all([
                        fetch(
                            `${import.meta.env.VITE_API_URL}/api/students/${studentId}`
                        ),
                        fetch(
                            `${import.meta.env.VITE_API_URL}/api/sessions/student/${studentId}`
                        ),
                    ]);

                const studentData = await studentResponse.json();
                const sessionsData = await sessionsResponse.json();

                if (!studentResponse.ok) {
                    throw new Error(
                        studentData.message ||
                            "Failed to fetch student details"
                    );
                }

                if (!sessionsResponse.ok) {
                    throw new Error(
                        sessionsData.message ||
                            "Failed to fetch sessions"
                    );
                }

                setStudent(studentData);
                setSessions(sessionsData);
            } catch (error) {
                console.error("Failed to fetch session data:", error);
                setError(
                    error.message || "Unable to load your sessions"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [studentId]);

    useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
}, []);
    // =========================
    // FORMAT MINUTES
    // =========================

    // =========================
// FORMAT MINUTES
// =========================

const formatMinutes = (minutes = 0) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes
        .toString()
        .padStart(2, "0")}m`;
};

// =========================
// FORMAT SECONDS
// =========================

const formatSeconds = (seconds = 0) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}h ${minutes
        .toString()
        .padStart(2, "0")}m ${remainingSeconds
        .toString()
        .padStart(2, "0")}s`;
};

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-gray-500">
                    Loading your sessions...
                </p>
            </div>
        );
    }

    // =========================
    // ERROR
    // =========================

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    if (!student) {
        return null;
    }

    const totalMinutes = student.planTotalMinutes || 0;
    const usedMinutes = student.planUsedMinutes || 0;
    const remainingMinutes = Math.max(
        0,
        totalMinutes - usedMinutes
    );

    const activeSession = sessions.find(
        (session) => session.status === "Active"
    );

    const liveElapsedSeconds = activeSession?.checkIn
        ? Math.max(
            0,
            Math.floor(
                (currentTime.getTime() -
                    new Date(activeSession.checkIn).getTime()) /
                    1000
            )
        )
        : 0;

    const liveRemainingSeconds = Math.max(
        0,
        remainingMinutes * 60 - liveElapsedSeconds
    );
    // =========================
    // PAGE
    // =========================

    return (
        <div className="space-y-8">

            {/* =========================
                HEADER
            ========================= */}

            <div>
                <p className="text-sm font-medium text-purple-600 mb-2">
                    YOUR MELOPHILE JOURNEY
                </p>

                <h1 className="text-4xl font-bold text-gray-900">
                    My Practice Plan
                </h1>

                <p className="text-gray-500 mt-2">
                    Track your 30-hour practice plan and
                    session history.
                </p>
            </div>


            {/* =========================
                PLAN SUMMARY
            ========================= */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                {/* TOTAL PLAN */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-500">
                        Total Plan
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-2">
                        {formatMinutes(totalMinutes)}
                    </h2>
                </div>


                {/* USED */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-500">
                        Time Used
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-2">
                        {formatMinutes(usedMinutes)}
                    </h2>
                </div>


                {/* REMAINING */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-500">
                        Time Remaining
                    </p>

                    <h2
                        className={`text-3xl font-bold mt-2 ${
                            remainingMinutes <= 0
                                ? "text-red-600"
                                : "text-green-600"
                        }`}
                    >
                        {activeSession
                            ? formatSeconds(liveRemainingSeconds)
                            : formatMinutes(remainingMinutes)}
                    </h2>
                </div>


                {/* STATUS */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-500">
                        Plan Status
                    </p>

                    <div className="mt-3">
                        <span
                            className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                                student.planStatus === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {student.planStatus}
                        </span>
                    </div>
                </div>

            </div>


            {/* =========================
                CURRENT SESSION
            ========================= */}

            {activeSession && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>

                                <h2 className="text-xl font-bold text-blue-900">
                                    Currently Practicing
                                </h2>
                            </div>

                            <p className="text-blue-700 mt-1">
                                Your practice time is being tracked.
                            </p>
                        </div>

                        <div className="text-left sm:text-right">
                            <p className="text-sm text-blue-600">
                                Session Time
                            </p>

                            <p className="text-3xl font-bold text-blue-900">
                                {formatSeconds(liveElapsedSeconds)}
                            </p>
                        </div>

                    </div>

                    <div className="mt-4 pt-4 border-t border-blue-200">

                        <p className="text-sm text-blue-600">
                            Time Remaining
                        </p>

                        <p className="text-2xl font-bold text-green-600">
                            {formatSeconds(liveRemainingSeconds)}
                        </p>

                    </div>

                </div>
            )}


            {/* =========================
                SESSION HISTORY
            ========================= */}

            <div>

                <div className="mb-4">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Practice History
                    </h2>

                    <p className="text-gray-500 mt-1">
                        View your check-in, check-out and
                        practice duration.
                    </p>

                </div>


                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {sessions.length > 0 ? (

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[850px]">

                                <thead>

                                    <tr>

                                        <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase text-gray-600">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase text-gray-600">
                                            Check In
                                        </th>

                                        <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase text-gray-600">
                                            Check Out
                                        </th>

                                        <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase text-gray-600">
                                            Duration
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

                                            {/* DATE */}

                                            <td className="px-6 py-4 border-b text-gray-700">

                                                {new Date(
                                                    session.checkIn
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}

                                            </td>


                                            {/* CHECK IN */}

                                            <td className="px-6 py-4 border-b text-gray-700">

                                                {new Date(
                                                    session.checkIn
                                                ).toLocaleTimeString(
                                                    "en-IN",
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )}

                                            </td>


                                            {/* CHECK OUT */}

                                            <td className="px-6 py-4 border-b text-gray-700">

                                                {session.checkOut
                                                    ? new Date(
                                                          session.checkOut
                                                      ).toLocaleTimeString(
                                                          "en-IN",
                                                          {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                          }
                                                      )
                                                    : "-"}

                                            </td>


                                            {/* DURATION */}

                                            <td className="px-6 py-4 border-b font-semibold text-gray-900">

                                                {session.status ===
                                                "Completed"
                                                    ? formatMinutes(
                                                          session.durationMinutes
                                                      )
                                                    : "In Progress"}

                                            </td>


                                            {/* STATUS */}

                                            <td className="px-6 py-4 border-b">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        session.status ===
                                                        "Completed"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-blue-100 text-blue-700"
                                                    }`}
                                                >
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
                                No practice sessions yet
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Your practice sessions will
                                appear here once you check in
                                at the academy.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Sessions;