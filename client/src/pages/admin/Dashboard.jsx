import { useEffect, useState } from "react";
import DashboardCard from "../../components/admin/DashboardCard";

function Dashboard() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/students`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }

                const data = await response.json();

                setStudents(data);
            } catch (error) {
                console.error("Dashboard error:", error);
                setError("Unable to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const totalStudents = students.length;

    const activeStudents = students.filter(
        (student) => student.status === "Active"
    ).length;

    const pendingStudents = students.filter(
        (student) => student.status === "Pending"
    ).length;

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-8">
                    Admin Dashboard
                </h1>

                <p className="text-gray-600">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-8">
                    Admin Dashboard
                </h1>

                <div className="bg-red-100 text-red-600 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <DashboardCard
                    title="Total Students"
                    value={totalStudents}
                />

                <DashboardCard
                    title="Active Students"
                    value={activeStudents}
                />

                <DashboardCard
                    title="Pending Approval"
                    value={pendingStudents}
                />

                <DashboardCard
                    title="Inactive Students"
                    value={
                        students.filter(
                            (student) => student.status === "Inactive"
                        ).length
                    }
                />

            </div>
        </div>
    );
}

export default Dashboard;