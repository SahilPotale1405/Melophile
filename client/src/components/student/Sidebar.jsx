import { Link,useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem("studenId");
        navigate("/login");
    };
    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">

            <h1 className="text-2xl font-bold mb-10">
                🎸 Melophile
            </h1>

            <nav className="space-y-4">

                <Link
                    to="/student/dashboard"
                    className="block p-3 rounded-lg hover:bg-purple-600"
                >
                    Dashboard
                </Link>

                <Link
                    to="/student/profile"
                    className="block p-3 rounded-lg hover:bg-purple-600"
                >
                    My Profile
                </Link>

                <Link
                    to="/student/sessions"
                    className="block p-3 rounded-lg hover:bg-purple-600"
                >
                    My Sessions
                </Link>

                <Link
                    to="/student/fees"
                    className="block p-3 rounded-lg hover:bg-purple-600"
                >
                    Fees
                </Link>

                <button
                onClick={handleLogout}
                    className="w-full text-left p-3 rounded-lg bg-red-600 hover:bg-red-700 mt-8"
                >
                    Logout
                </button>

            </nav>

        </aside>
    );
}

export default Sidebar;