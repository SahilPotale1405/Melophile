import {NavLink} from "react-router-dom";

function SideBar(){
    const menuItems =[
        {name:"Dashboard", path:"/admin/dashboard"},
        {name:"Students", path:"/admin/students"},
        {name:"Sessions", path:"/admin/sessions"},
        {name:"Fees", path:"/admin/fees"},
        {name:"Demo Booking", path:"/admin/demo-bookings"},
        {name:"Settings", path:"/admin/settings"},
    ];1
    return(
        <aside className="w-64 min-h-screen bg-zinc-900 text-white p-5">
            <h1 className="text-2xl font-bold mb-8">🎸 Melophile</h1>

            <nav className="space-y-3">
                {menuItems.map((item) =>(
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className ={({ isActive})=>
                        `block px-4 py-2 rounded-lg transition ${
                            isActive
                            ? "bg-purple-600"
                            :"hover:bg-zinc-800"
                        }`
                        }
                    >
                        {item.name}
                    </NavLink>    
                ))}
            </nav>

            <button className="mt-10 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg">
                Logout
            </button>
        </aside>
    );
}
export default SideBar;