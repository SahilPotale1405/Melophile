import { useEffect, useState } from "react";
import StudentTable from "../../components/admin/StudentTable";

function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/students`
        );

        const data = await response.json();

        setStudents(data);
        setLoading(false);

    } catch (error) {
        console.error("Failed to fetch students:", error);
        setLoading(false);
    }
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

    const handleStudentUpdated = async (updatedStudent) => {
    setStudents((currentStudents) =>
        currentStudents.map((student) =>
            student._id === updatedStudent._id
                ? updatedStudent
                : student
        )
    );

    // Get the latest data from MongoDB
    await fetchStudents();
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