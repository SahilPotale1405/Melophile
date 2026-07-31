function TopNavbar() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <button className="text-2xl">🔔</button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
            A
          </div>

          <span className="font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;