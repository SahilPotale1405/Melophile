import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import Register from "../pages/auth/Register";
import StudentDashboard from "../pages/student/Dashboard";
import ChangePassword from "../pages/auth/ChangePassword";
import Sessions from "../pages/admin/sessions";
import StudentSessions from "../pages/student/Sessions";
import AdminLogin from "../pages/admin/AdminLogin";

function AppRoutes() {
    return (
        <Routes>

            {/* Public pages */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
            </Route>

            {/* Login */}
            <Route path="/login" element={<Login />} />

            <Route
                path="/admin/login"
                element={<AdminLogin />}
            />

            <Route
                path="/student/change-password"
                element={<ChangePassword />}
            />

            {/* Admin pages */}
            <Route element={<AdminLayout />}>
                <Route
                    path="/admin/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin/students"
                    element={<Students />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/admin/sessions"
                    element={<Sessions />}
                />
            </Route>

            {/* Student pages */}
            <Route element={<StudentLayout />}>
                <Route
                    path="/student/dashboard"
                    element={<StudentDashboard />}
                />

                <Route
                    path="/student/sessions"
                    element={<StudentSessions />}
                />
            </Route>

        </Routes>
    );
}

export default AppRoutes;