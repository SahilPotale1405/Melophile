import { useEffect, useState } from "react";

function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/sessions")
            .then((res) => res.json())
            .then((data) => {
                setSessions(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch sessions:", error);
                setLoading(false);
            });
    }, []);

    const filteredSessions = sessions.filter((session) =>
        session.student?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) {
        return <p>Loading sessions...</p>;
    }

    return (
        <>
            {/* PAGE HEADER */}
            <div className="flex items-center justify-between mb-6">

                <div>
                    <h1 className="text-3xl font-bold">
                        Sessions
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Track student attendance and practice sessions
                    </p>
                </div>

                {/* TOTAL SESSIONS */}
                <div className="bg-purple-100 text-purple-700 px-5 py-3 rounded-xl">
                    <p className="text-sm">
                        Total Sessions
                    </p>

                    <p className="text-2xl font-bold">
                        {sessions.length}
                    </p>
                </div>

            </div>


            {/* SEARCH */}
            <input
                type="text"
                placeholder="🔍 Search Student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-72 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />


            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">

                <table className="w-full">

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
                                            {session.student?.name || "Unknown"}
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
        </>
    );
}

export default Sessions;