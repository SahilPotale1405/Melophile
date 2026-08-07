import StudentTable from "../../components/admin/StudentTable";

function Students() {
  const students = [
    {
      id: 1,
      name: "Rahul",
      fees: "Paid",
      status: "Active",
      sessionsLeft: 8,
    },
    {
      id: 2,
      name: "Priya",
      fees: "Pending",
      status: "Renew Soon",
      sessionsLeft: 2,
    },
  ];

  return (
    <>
      <h1>Students</h1>
      <StudentTable students={students} />
    </>
  );
}

export default Students;