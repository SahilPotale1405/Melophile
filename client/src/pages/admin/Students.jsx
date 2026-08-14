import { useEffect, useState } from "react";
import StudentTable from "../../components/admin/StudentTable";

function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    if (loading) {
        return <p>Loading students...</p>;
    }

    return (
        <>
            <h1>Students</h1>

            <StudentTable students={students} />
        </>
    );
}

export default Students;