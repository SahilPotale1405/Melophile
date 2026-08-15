function TopNavbar() {
    return (
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">

            <h2 className="text-2xl font-bold text-gray-900">
                Student Dashboard
            </h2>

            <div className="flex items-center gap-4">

                <button className="text-2xl">
                    🔔
                </button>

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                        S
                    </div>

                    <span className="font-semibold text-gray-800">
                        Student
                    </span>

                </div>

            </div>

        </header>
    );
}

export default TopNavbar;