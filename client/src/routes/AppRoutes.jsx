import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/public/Home"
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
function AppRoutes() {
  return (
    <Routes>
        <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        </Route>
        
        <Route path="/login" element={<Login/>}/>

        <Route element={<AdminLayout/>}>
        <Route path="/admin/dashboard" element={<Dashboard/>} />

        <Route path="/admin/students" element={<Students />} />
      </Route>

    </Routes>

    
  );
}

export default AppRoutes;