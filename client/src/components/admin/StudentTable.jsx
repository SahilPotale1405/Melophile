import { useState } from "react";

const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "fees", label: "Fees" },
    { key: "status", label: "Status" },
    { key: "sessionsLeft", label: "Sessions Left" },
    { key: "actions", label: "Actions" }
];

function StudentTable({ students, onStudentApproved }) {
    const [search, setSearch] = useState("");
    const [approvingId, setApprovingId] = useState(null);

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleApprove = async (studentId) => {
        try {
            setApprovingId(studentId);

            const response = await fetch(
                `http://localhost:5000/api/students/approve/${studentId}`,
                {
                    method: "PUT",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            // Update table
            onStudentApproved(data.student);

            // Show temporary credentials
            alert(
                `Student approved successfully!\n\n` +
                `Email: ${data.student.email}\n` +
                `Temporary Password: ${data.temporaryPassword}`
            );

        } catch (error) {
            console.error("Approval failed:", error);
            alert("Failed to approve student");

        } finally {
            setApprovingId(null);
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder="🔍 Search Student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-72 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">

                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>

                    {filteredStudents.map((student) => (

                        <tr
                            key={student._id}
                            className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition"
                        >

                            {columns.map((column) => (

                                <td
                                    key={column.key}
                                    className="px-6 py-4 border-b"
                                >

                                    {column.key === "id" ? (

                                        <span className="text-xs text-gray-500">
                                            {student._id.slice(-6)}
                                        </span>

                                    ) : column.key === "actions" ? (

                                        <div className="flex gap-3">

                                            {student.status === "Pending" && (

                                                <button
                                                    onClick={() =>
                                                        handleApprove(student._id)
                                                    }
                                                    disabled={
                                                        approvingId === student._id
                                                    }
                                                    className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-semibold transition"
                                                >
                                                    {approvingId === student._id
                                                        ? "Approving..."
                                                        : "Approve"}
                                                </button>

                                            )}

                                            <button
                                                className="p-2 rounded-lg hover:bg-blue-100 hover:scale-110 transition"
                                                title="Edit Student"
                                            >
                                                ✏️
                                            </button>

                                            <button
                                                className="p-2 rounded-lg hover:bg-red-100 hover:scale-110 transition"
                                                title="Delete Student"
                                            >
                                                🗑️
                                            </button>

                                        </div>

                                    ) : column.key === "fees" ? (

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                student.fees === "Paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {student.fees}
                                        </span>

                                    ) : column.key === "status" ? (

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                student.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : student.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : student.status === "Renew Soon"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {student.status}
                                        </span>

                                    ) : (

                                        student[column.key]

                                    )}

                                </td>

                            ))}

                        </tr>

                    ))}

                </tbody>

            </table>
        </>
    );
}

export default StudentTable;