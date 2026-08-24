import { useState } from "react";

const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "fees", label: "Fees" },
    { key: "status", label: "Status" },
    { key: "sessionsLeft", label: "Sessions Left" },
    { key: "actions", label: "Actions" }
];

function StudentTable({
    students,
    onStudentApproved,
    onStudentUpdated
}) {
    const [search, setSearch] = useState("");
    const [approvingId, setApprovingId] = useState(null);
    const [editingStudent, setEditingStudent] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deactivatingId, setDeactivatingId] = useState(null);
    const [markingPresentId, setMarkingPresentId] = useState(null);

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    // =========================
    // APPROVE STUDENT
    // =========================

    const handleApprove = async (studentId) => {
        try {
            setApprovingId(studentId);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/students/approve/${studentId}`,
                {
                    method: "PUT",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            onStudentApproved(data.student);

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

    // =========================
    // OPEN EDIT MODAL
    // =========================

    const handleEdit = (student) => {
        setEditingStudent({
            ...student
        });
    };

    // =========================
    // SAVE EDITED STUDENT
    // =========================

    const handleSave = async () => {
        try {
            setSaving(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/students/${editingStudent._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: editingStudent.name,
                        email: editingStudent.email,
                        phone: editingStudent.phone,
                        instrument: editingStudent.instrument,
                        fees: editingStudent.fees,
                        status: editingStudent.status,
                        sessionsLeft: editingStudent.sessionsLeft,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            onStudentUpdated(data.student);

            setEditingStudent(null);

            alert("Student updated successfully!");

        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update student");

        } finally {
            setSaving(false);
        }
    };

    // =========================
    // DEACTIVATE STUDENT
    // =========================

    const handleDeactivate = async (student) => {
        const confirmed = window.confirm(
            `Are you sure you want to deactivate ${student.name}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeactivatingId(student._id);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/students/deactivate/${student._id}`,
                {
                    method: "PUT",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            onStudentUpdated(data.student);

            alert("Student deactivated successfully!");

        } catch (error) {
            console.error("Deactivation failed:", error);
            alert("Failed to deactivate student");

        } finally {
            setDeactivatingId(null);
        }
    };

    // =========================
// MARK STUDENT PRESENT
// =========================

const handleMarkPresent = async (student) => {
    const confirmed = window.confirm(
        `Mark ${student.name} as present for today's session?`
    );

    if (!confirmed) {
        return;
    }

    try {
        setMarkingPresentId(student._id);

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/sessions/mark-present`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    studentId: student._id,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        // Update sessionsLeft in Students table
        onStudentUpdated({
            ...student,
            sessionsLeft: data.sessionsLeft,
        });

        alert(
            `Attendance marked successfully!\n\n` +
            `Student: ${student.name}\n` +
            `Sessions Left: ${data.sessionsLeft}`
        );

    } catch (error) {
        console.error("Attendance failed:", error);
        alert("Failed to mark student present");

    } finally {
        setMarkingPresentId(null);
    }
};

    return (
        <>
            {/* =========================
                SEARCH
            ========================= */}

            <input
                type="text"
                placeholder="🔍 Search Student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-72 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* =========================
                STUDENT TABLE
            ========================= */}

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

                                    {/* ID */}

                                    {column.key === "id" ? (

                                        <span className="text-xs text-gray-500">
                                            {student._id.slice(-6)}
                                        </span>

                                    ) : column.key === "actions" ? (

                                        /* ACTIONS */

                                        <div className="flex gap-3">

                                            {/* APPROVE */}

                                            {student.status === "Pending" && (

                                                <button
                                                    onClick={() =>
                                                        handleApprove(
                                                            student._id
                                                        )
                                                    }
                                                    disabled={
                                                        approvingId ===
                                                        student._id
                                                    }
                                                    className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-semibold transition"
                                                >
                                                    {approvingId ===
                                                    student._id
                                                        ? "Approving..."
                                                        : "Approve"}
                                                </button>

                                            )}

                                            {/*MARK PRESENT*/}

                                            {student.status === "Active" && student.sessionsLeft > 0 && (
                                                <button
                                                    onClick={() => handleMarkPresent(student)}
                                                    disabled={markingPresentId === student._id}
                                                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-semibold transition"
                                                    title="Mark Present"
                                                >
                                                    {markingPresentId === student._id
                                                        ? "Marking..."
                                                        : "Present"}
                                                </button>
                                            )}

                                            {/* EDIT */}

                                            <button
                                                onClick={() =>
                                                    handleEdit(student)
                                                }
                                                className="p-2 rounded-lg hover:bg-blue-100 hover:scale-110 transition"
                                                title="Edit Student"
                                            >
                                                ✏️
                                            </button>

                                            {/* DEACTIVATE */}

                                            <button
                                                onClick={() =>
                                                    handleDeactivate(student)
                                                }
                                                disabled={
                                                    deactivatingId ===
                                                        student._id ||
                                                    student.status ===
                                                        "Inactive"
                                                }
                                                className="p-2 rounded-lg hover:bg-red-100 hover:scale-110 transition disabled:opacity-40"
                                                title={
                                                    student.status ===
                                                    "Inactive"
                                                        ? "Student already inactive"
                                                        : "Deactivate Student"
                                                }
                                            >
                                                🗑️
                                            </button>

                                        </div>

                                    ) : column.key === "fees" ? (

                                        /* FEES */

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

                                        /* STATUS */

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                student.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : student.status ===
                                                      "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : student.status ===
                                                      "Renew Soon"
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

            {/* =========================
                EDIT STUDENT MODAL
            ========================= */}

            {editingStudent && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">

                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-2xl font-bold text-gray-900">
                                    Edit Student
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Update student information
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setEditingStudent(null)
                                }
                                className="text-gray-500 hover:text-gray-900 text-2xl"
                            >
                                ×
                            </button>

                        </div>

                        {/* FORM */}

                        <div className="space-y-4">

                            {/* NAME */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    value={editingStudent.name}
                                    onChange={(e) =>
                                        setEditingStudent({
                                            ...editingStudent,
                                            name: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                />

                            </div>

                            {/* EMAIL */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={editingStudent.email}
                                    onChange={(e) =>
                                        setEditingStudent({
                                            ...editingStudent,
                                            email: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                />

                            </div>

                            {/* PHONE */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    value={editingStudent.phone}
                                    onChange={(e) =>
                                        setEditingStudent({
                                            ...editingStudent,
                                            phone: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                />

                            </div>

                            {/* FEES */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fees
                                </label>

                                <select
                                    value={editingStudent.fees}
                                    onChange={(e) =>
                                        setEditingStudent({
                                            ...editingStudent,
                                            fees: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="Paid">
                                        Paid
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                </select>

                            </div>

                            {/* STATUS */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>

                                <select
                                    value={editingStudent.status}
                                    onChange={(e) =>
                                        setEditingStudent({
                                            ...editingStudent,
                                            status: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Renew Soon">
                                        Renew Soon
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                </select>

                            </div>

                            {/* SESSIONS */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sessions Left
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={
                                        editingStudent.sessionsLeft
                                    }
                                    onChange={(e) =>
                                        setEditingStudent({
                                            ...editingStudent,
                                            sessionsLeft:
                                                Number(e.target.value)
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                />

                            </div>

                        </div>

                        {/* BUTTONS */}

                        <div className="flex justify-end gap-3 mt-8">

                            <button
                                onClick={() =>
                                    setEditingStudent(null)
                                }
                                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold"
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}

export default StudentTable;