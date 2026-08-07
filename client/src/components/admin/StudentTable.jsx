const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "fees", label: "Fees" },
  { key: "status", label: "Status" },
  { key: "sessionsLeft", label: "Sessions Left" },
];

function StudentTable({ students }) {
  return (
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
        {students.map((student) => (
          <tr
            key={student.id}
            className="hover:bg-gray-50 transition"
            >
            {columns.map((column) => (
            <td
                key={column.key}
                className="px-6 py-4 border-b"
                >
                {student[column.key]}
            </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;