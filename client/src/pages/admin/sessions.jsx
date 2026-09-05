import { useEffect, useState } from "react";

function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [actionId, setActionId] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // =========================
    // FETCH DATA
    // =========================

    const fetchData = async () => {
        try {
            const [sessionsResponse, studentsResponse] =
                await Promise.all([
                    fetch(
                        `${import.meta.env.VITE_API_URL}/api/sessions`
                    ),
                    fetch(
                        `${import.meta.env.VITE_API_URL}/api/students`
                    ),
                ]);

            const sessionsData = await sessionsResponse.json();
            const studentsData = await studentsResponse.json();

            setSessions(sessionsData);
            setStudents(studentsData);
        } catch (error) {
            console.error("Failed to fetch session data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
    fetchData();
}, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
    // GET REMAINING MINUTES
    // =========================

    const getRemainingMinutes = (student) => {
    return Math.max(
        0,
        (student.planTotalMinutes || 0) -
            (student.planUsedMinutes || 0)
    );
};

const getLiveElapsedSeconds = (session) => {
    if (!session?.checkIn) {
        return 0;
    }

    const checkInTime = new Date(session.checkIn).getTime();
    const now = currentTime.getTime();

    return Math.max(0, Math.floor((now - checkInTime) / 1000));
};

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

const getLiveRemainingSeconds = (student, activeSession) => {
    const totalSeconds = (student.planTotalMinutes || 0) * 60;
    const usedSeconds = (student.planUsedMinutes || 0) * 60;

    const storedRemainingSeconds = Math.max(
        0,
        totalSeconds - usedSeconds
    );

    if (!activeSession) {
        return storedRemainingSeconds;
    }

    const elapsedSeconds = getLiveElapsedSeconds(activeSession);

    return Math.max(
        0,
        storedRemainingSeconds - elapsedSeconds
    );
};

    // =========================
    // CHECK ACTIVE SESSION
    // =========================

    const getActiveSession = (studentId) => {
        return sessions.find(
            (session) =>
                session.student?._id === studentId &&
                session.status === "Active"
        );
    };

    // =========================
    // CHECK IN
    // =========================

    const handleCheckIn = async (studentId) => {
        try {
            setActionId(studentId);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/sessions/check-in`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        studentId,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Check-in failed.");
                return;
            }

            alert(
                `Student checked in successfully!\n\nRemaining plan time: ${formatMinutes(
                    data.remainingMinutes
                )}`
            );

            await fetchData();
        } catch (error) {
            console.error("Check-in error:", error);
            alert("Failed to check in student.");
        } finally {
            setActionId(null);
        }
    };

    // =========================
    // CHECK OUT
    // =========================

    const handleCheckOut = async (studentId) => {
        try {
            setActionId(studentId);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/sessions/check-out`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        studentId,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Check-out failed.");
                return;
            }

            alert(
                `Student checked out successfully!\n\nSession duration: ${formatMinutes(
                    data.session.durationMinutes
                )}\nRemaining plan time: ${formatMinutes(
                    data.remainingMinutes
                )}`
            );

            await fetchData();
        } catch (error) {
            console.error("Check-out error:", error);
            alert("Failed to check out student.");
        } finally {
            setActionId(null);
        }
    };
// =========================
// RENEW STUDENT PLAN
// =========================

const handleRenewPlan = async (studentId) => {
    try {
        setActionId(studentId);

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/sessions/renew-plan`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    studentId,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Plan renewal failed.");
            return;
        }

        alert(
            `Student plan renewed successfully!\n\nNew plan: ${formatMinutes(
                data.planTotalMinutes
            )}\nRemaining time: ${formatMinutes(
                data.remainingMinutes
            )}`
        );

        await fetchData();
    } catch (error) {
        console.error("Plan renewal error:", error);
        alert("Failed to renew student plan.");
    } finally {
        setActionId(null);
    }
};

    // =========================
    // SEARCH
    // =========================

    const filteredStudents = students.filter((student) =>
        student.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    // =========================
    // FILTER HISTORY
    // =========================

    const filteredSessions = sessions.filter((session) =>
        session.student?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="p-6">
                <p>Loading sessions...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 bg-gray-100 min-h-screen p-6">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold">
                        Sessions
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage student check-in, check-out and
                        30-hour practice plans.
                    </p>
                </div>

                <div className="bg-purple-100 text-purple-700 px-5 py-3 rounded-xl shadow-sm">
                    <p className="text-sm">
                        Total Visits
                    </p>

                    <p className="text-2xl font-bold">
                        {sessions.length}
                    </p>
                </div>

            </div>


            {/* =========================
                STUDENT PLAN & CHECK-IN
            ========================= */}

            <div>

                <div className="mb-4">

                    <h2 className="text-2xl font-bold">
                        Student Practice Plans
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Manage 30-hour student plans and
                        academy entry.
                    </p>

                </div>


                {/* SEARCH */}

                <input
                    type="text"
                    placeholder="🔍 Search Student..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />


                {/* TABLE */}

                <div className="bg-white rounded-xl shadow-md overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1100px]">

                            <thead>

                                <tr>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Student
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Plan
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Used
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Remaining
                                    </th>
                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Live Time
                                    </th>
                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Plan Status
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredStudents.map((student) => {

                                    const remainingMinutes =
                                        getRemainingMinutes(student);

                                    const activeSession =
                                        getActiveSession(
                                            student._id
                                        );
                                    const liveElapsedSeconds = activeSession
                                        ? getLiveElapsedSeconds(activeSession)
                                        : 0;

                                    const liveRemainingSeconds = getLiveRemainingSeconds(
                                        student,
                                        activeSession
                                    );

                                    return (
                                        <tr
                                            key={student._id}
                                            className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition"
                                        >

                                            {/* STUDENT */}

                                            <td className="px-6 py-4 border-b">

                                                <div className="font-medium">
                                                    {student.name}
                                                </div>

                                                <div className="text-sm text-gray-500">
                                                    {student.email}
                                                </div>

                                            </td>


                                            {/* PLAN */}

                                            <td className="px-6 py-4 border-b">

                                                <span className="font-semibold">
                                                    {formatMinutes(
                                                        student.planTotalMinutes
                                                    )}
                                                </span>

                                            </td>


                                            {/* USED */}

                                            <td className="px-6 py-4 border-b">

                                                <span className="font-semibold">
                                                    {formatMinutes(
                                                        student.planUsedMinutes
                                                    )}
                                                </span>

                                            </td>


                                            {/* REMAINING */}

                                            <td className="px-6 py-4 border-b">

                                                <span
                                                    className={`font-bold ${
                                                        remainingMinutes <= 0
                                                            ? "text-red-600"
                                                            : "text-green-600"
                                                    }`}
                                                >
                                                    {activeSession
                                                        ? formatSeconds(liveRemainingSeconds)
                                                        : formatMinutes(remainingMinutes)}
                                                </span>

                                            </td>

                                            <td className="px-6 py-4 border-b">
                                                {activeSession ? (
                                                    <span className="font-bold text-blue-600">
                                                        {formatSeconds(liveElapsedSeconds)}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">
                                                        —
                                                    </span>
                                                )}
                                            </td>


                                            {/* PLAN STATUS */}

                                            <td className="px-6 py-4 border-b">

                                                {activeSession ? (

                                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                                                        Checked In
                                                    </span>

                                                ) : remainingMinutes <= 0 ? (

                                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                                                        Expired
                                                    </span>

                                                ) : (

                                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                                                        Active
                                                    </span>

                                                )}

                                            </td>


                                            {/* ACTION */}

                                            <td className="px-6 py-4 border-b">

                                                {activeSession ? (

                                                    <button
                                                        onClick={() =>
                                                            handleCheckOut(
                                                                student._id
                                                            )
                                                        }
                                                        disabled={
                                                            actionId ===
                                                            student._id
                                                        }
                                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-semibold transition"
                                                    >
                                                        {actionId ===
                                                        student._id
                                                            ? "Processing..."
                                                            : "Check Out"}
                                                    </button>

                                                ) : remainingMinutes <= 0 ? (

                                                    <button
                                                        onClick={() =>
                                                            handleRenewPlan(student._id)
                                                        }
                                                        disabled={
                                                            actionId === student._id
                                                        }
                                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-semibold transition"
                                                    >
                                                        {actionId === student._id
                                                            ? "Renewing..."
                                                            : "Renew Plan"}
                                                    </button>

                                                ) : student.status !==
                                                  "Active" ? (

                                                    <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 text-sm font-semibold">
                                                        Not Active
                                                    </span>

                                                ) : (

                                                    <button
                                                        onClick={() =>
                                                            handleCheckIn(
                                                                student._id
                                                            )
                                                        }
                                                        disabled={
                                                            actionId ===
                                                            student._id
                                                        }
                                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-semibold transition"
                                                    >
                                                        {actionId ===
                                                        student._id
                                                            ? "Processing..."
                                                            : "Check In"}
                                                    </button>

                                                )}

                                            </td>

                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* =========================
                SESSION HISTORY
            ========================= */}

            <div>

                <div className="mb-4">

                    <h2 className="text-2xl font-bold">
                        Session History
                    </h2>

                    <p className="text-gray-500 mt-1">
                        View student check-in, check-out and
                        practice duration.
                    </p>

                </div>


                <div className="bg-white rounded-xl shadow-md overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[950px]">

                            <thead>

                                <tr>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Student
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Date
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Check In
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Check Out
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Duration
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredSessions.length > 0 ? (

                                    filteredSessions.map((session) => (

                                        <tr
                                            key={session._id}
                                            className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition"
                                        >

                                            {/* STUDENT */}

                                            <td className="px-6 py-4 border-b">

                                                <div className="font-medium">
                                                    {session.student?.name ||
                                                        "Unknown"}
                                                </div>

                                                <div className="text-sm text-gray-500">
                                                    {session.student?.email ||
                                                        ""}
                                                </div>

                                            </td>


                                            {/* DATE */}

                                            <td className="px-6 py-4 border-b">

                                                {new Date(
                                                    session.checkIn
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )}

                                            </td>


                                            {/* CHECK IN */}

                                            <td className="px-6 py-4 border-b">

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

                                            <td className="px-6 py-4 border-b">

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

                                            <td className="px-6 py-4 border-b">

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

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            No sessions found.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Sessions;