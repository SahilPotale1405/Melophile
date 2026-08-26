import { Navigate, Outlet } from "react-router-dom";

function StudentProtectedRoute() {
    const studentId = localStorage.getItem("studentId");

    console.log("Student ID:", studentId);

    if (!studentId) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default StudentProtectedRoute;