import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import TopNavbar from "../components/admin/TopNavbar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopNavbar/>
      

        {/* Main Content */}
        <main className="flex-1 p-6">
            <Outlet />
        </main>
        </div>
    </div>
  );
}

export default AdminLayout;