import { useEffect, useState } from "react";

function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [markingId, setMarkingId] = useState(null);

    // =========================
    // FETCH DATA
    // =========================

    const fetchData = async () => {
    try {
        console.log("API URL:", import.meta.env.VITE_API_URL);

        const [sessionsResponse, studentsResponse] = await Promise.all([
            fetch(`${import.meta.env.VITE_API_URL}/api/sessions`),
            fetch(`${import.meta.env.VITE_API_URL}/api/students`),
        ]);

            const sessionsData = await sessionsResponse.json();
            const studentsData = await studentsResponse.json();

            setSessions(sessionsData);
            setStudents(studentsData);
            setLoading(false);

        } catch (error) {
            console.error("Failed to fetch data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // =========================
    // CHECK TODAY'S ATTENDANCE
    // =========================

    const isPresentToday = (studentId) => {
        const today = new Date();

        return sessions.some((session) => {
            if (!session.student?._id) {
                return false;
            }

            const sessionDate = new Date(session.date);

            return (
                session.student._id === studentId &&
                sessionDate.getDate() === today.getDate() &&
                sessionDate.getMonth() === today.getMonth() &&
                sessionDate.getFullYear() === today.getFullYear()
            );
        });
    };

    // =========================
    // MARK STUDENT PRESENT
    // =========================

    const handleMarkPresent = async (studentId) => {
        try {
            setMarkingId(studentId);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/sessions/mark-present`,
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
                alert(data.message);
                return;
            }

            alert(
                `Attendance marked successfully!\n\nSessions remaining: ${data.sessionsLeft}`
            );

            // Refresh students and sessions
            await fetchData();

        } catch (error) {
            console.error("Failed to mark attendance:", error);
            alert("Failed to mark attendance");

        } finally {
            setMarkingId(null);
        }
    };

    // =========================
    // SEARCH STUDENTS
    // =========================

    const filteredStudents = students.filter((student) =>
        student.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    // =========================
    // FILTER SESSION HISTORY
    // =========================

    const filteredSessions = sessions.filter((session) =>
        session.student?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) {
        return <p>Loading sessions...</p>;
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
                        Track student attendance and practice sessions
                    </p>
                </div>

                <div className="bg-purple-100 text-purple-700 px-5 py-3 rounded-xl shadow-sm">
                    <p className="text-sm">
                        Total Sessions
                    </p>

                    <p className="text-2xl font-bold">
                        {sessions.length}
                    </p>
                </div>

            </div>


            {/* =========================
                TODAY'S ATTENDANCE
            ========================= */}

            <div>

                <div className="mb-4">

                    <h2 className="text-2xl font-bold">
                        Today's Attendance
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Mark students present for today's practice session.
                    </p>

                </div>


                {/* SEARCH */}

                <input
                    type="text"
                    placeholder="🔍 Search Student..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />


                {/* ATTENDANCE TABLE */}

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px]">

                        <thead>

                            <tr>

                                <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                    Student
                                </th>

                                <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                    Fees
                                </th>

                                <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                    Sessions Left
                                </th>

                                <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                    Status
                                </th>

                                <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredStudents.map((student) => {

                                const alreadyPresent = isPresentToday(
                                    student._id
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


                                        {/* FEES */}

                                        <td className="px-6 py-4 border-b">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                    student.fees === "Paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {student.fees}
                                            </span>

                                        </td>


                                        {/* SESSIONS */}

                                        <td className="px-6 py-4 border-b">

                                            <span className="font-semibold">
                                                {student.sessionsLeft}
                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td className="px-6 py-4 border-b">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                    student.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : student.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                            >
                                                {student.status}
                                            </span>

                                        </td>


                                        {/* ACTION */}

                                        <td className="px-6 py-4 border-b">

                                            {alreadyPresent ? (

                                                <span className="px-3 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-semibold">
                                                    ✓ Present Today
                                                </span>

                                            ) : student.sessionsLeft <= 0 ? (

                                                <span className="px-3 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-semibold">
                                                    No Sessions
                                                </span>

                                            ) : student.status !== "Active" ? (

                                                <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 text-sm font-semibold">
                                                    Not Active
                                                </span>

                                            ) : (

                                                <button
                                                    onClick={() =>
                                                        handleMarkPresent(
                                                            student._id
                                                        )
                                                    }
                                                    disabled={
                                                        markingId ===
                                                        student._id
                                                    }
                                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-semibold transition"
                                                >
                                                    {markingId === student._id
                                                        ? "Marking..."
                                                        : "Mark Present"}
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
                        View all recorded practice sessions.
                    </p>

                </div>


                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[750px]">

                        <thead>

                            <tr>

                                <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                    Student
                                </th>

                                <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                    Date
                                </th>

                                <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                    Time
                                </th>

                                <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                    Type
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
                                                {session.student?.email || ""}
                                            </div>

                                        </td>


                                        {/* DATE */}

                                        <td className="px-6 py-4 border-b">

                                            {new Date(
                                                session.date
                                            ).toLocaleDateString("en-IN")}

                                        </td>


                                        {/* TIME */}

                                        <td className="px-6 py-4 border-b">

                                            {new Date(
                                                session.date
                                            ).toLocaleTimeString("en-IN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}

                                        </td>


                                        {/* TYPE */}

                                        <td className="px-6 py-4 border-b">

                                            <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                                                {session.type}
                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td className="px-6 py-4 border-b">

                                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                                                {session.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
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