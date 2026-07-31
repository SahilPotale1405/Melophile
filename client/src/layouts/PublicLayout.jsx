import {Outlet} from "react-router-dom";
import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";

function PublicLayout(){
    return(
        <div className = 'bg-black text-white min-h-screen overflow-x-hidden'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}
export default PublicLayout;