import DashboardCard from "../../components/admin/DashboardCard";

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Students" value={45} />

        <DashboardCard title="Active Sessions" value={18} />

        <DashboardCard title="Today's Income" value="₹12,500" />

        <DashboardCard title="Demo Bookings" value={7} />
      </div>
    </div>
  );
}

export default Dashboard;