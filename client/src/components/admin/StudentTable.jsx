import { useState } from "react";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "fees", label: "Fees" },
  { key: "status", label: "Status" },
  { key: "sessionsLeft", label: "Sessions Left" },
  { key: "actions", label: "Actions" }
];

function StudentTable({ students }) {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="🔍 Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              key={student.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 border-b">

                  {column.key === "actions" ? (
                    <div className="flex gap-3">
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