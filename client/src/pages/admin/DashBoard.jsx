import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Recent Orders",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 p-6">
        <div className="flex h-screen bg-gray-900">
          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                Add New
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-2">Total Sales</h2>
                <p className="text-2xl font-bold text-blue-400">$12,345</p>
              </div>
              <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-2">New Customers</h2>
                <p className="text-2xl font-bold text-blue-400">234</p>
              </div>
              <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-2">Active Users</h2>
                <p className="text-2xl font-bold text-blue-400">1,567</p>
              </div>
              <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-2">Pending Orders</h2>
                <p className="text-2xl font-bold text-blue-400">45</p>
              </div>
            </div>

            {/* Graph Section */}
            <div className="bg-gray-800 shadow-lg rounded-lg mt-6 p-6">
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">Recent Orders Graph</h2>
              <div className="overflow-x-auto">
                {/* Adjust the width and height of the graph */}
                <Line data={data} options={{ maintainAspectRatio: false }} height={200} width={300} />
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}
