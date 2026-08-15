import { Outlet } from "react-router-dom";
import Sidebar from "../components/student/Sidebar";
import TopNavbar from "../components/student/TopNavbar";

function StudentLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1">

                <TopNavbar />

                <main className="p-8">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default StudentLayout;