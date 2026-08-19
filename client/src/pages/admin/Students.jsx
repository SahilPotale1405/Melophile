import { useEffect, useState } from "react";
import StudentTable from "../../components/admin/StudentTable";

function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = () => {
        fetch("http://localhost:5000/api/students")
            .then((res) => res.json())
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch students:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleStudentApproved = (updatedStudent) => {
        setStudents((currentStudents) =>
            currentStudents.map((student) =>
                student._id === updatedStudent._id
                    ? {
                          ...student,
                          ...updatedStudent,
                      }
                    : student
            )
        );
    };

    const handleStudentUpdated = (updatedStudent) => {
        setStudents((currentStudents) =>
            currentStudents.map((student) =>
                student._id === updatedStudent._id
                    ? {
                          ...student,
                          ...updatedStudent,
                      }
                    : student
            )
        );
    };

    if (loading) {
        return <p>Loading students...</p>;
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">
                Students
            </h1>

            <StudentTable
                students={students}
                onStudentApproved={handleStudentApproved}
                onStudentUpdated={handleStudentUpdated}
            />
        </>
    );
}

export default Students;