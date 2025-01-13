import React from "react";

const Dashboard = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="flex-1 ml-0 md:ml-64 p-6">
                <div className="flex h-screen bg-gray-100">
    
                 

                    {/* Main Content */}
                    <main className="flex-1 p-6 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Dashboard
                            </h1>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                                Add New
                            </button>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Total Sales
                                </h2>
                                <p className="text-2xl font-bold text-blue-600">
                                    $12,345
                                </p>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    New Customers
                                </h2>
                                <p className="text-2xl font-bold text-blue-600">
                                    234
                                </p>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Active Users
                                </h2>
                                <p className="text-2xl font-bold text-blue-600">
                                    1,567
                                </p>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Pending Orders
                                </h2>
                                <p className="text-2xl font-bold text-blue-600">
                                    45
                                </p>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="bg-white shadow-lg rounded-lg mt-6 p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Recent Orders
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border p-4">
                                                Order ID
                                            </th>
                                            <th className="border p-4">
                                                Customer
                                            </th>
                                            <th className="border p-4">
                                                Total
                                            </th>
                                            <th className="border p-4">
                                                Status
                                            </th>
                                            <th className="border p-4">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4].map((order, index) => (
                                            <tr
                                                key={index}
                                                className={`${
                                                    index % 2 === 0
                                                        ? "bg-white"
                                                        : "bg-gray-50"
                                                } hover:bg-gray-100`}
                                            >
                                                <td className="border p-4">
                                                    #{1000 + index}
                                                </td>
                                                <td className="border p-4">
                                                    John Doe
                                                </td>
                                                <td className="border p-4">
                                                    $200.00
                                                </td>
                                                <td className="border p-4">
                                                    <span
                                                        className={`px-2 py-1 rounded text-sm ${
                                                            index % 2 === 0
                                                                ? "bg-green-200 text-green-800"
                                                                : "bg-yellow-200 text-yellow-800"
                                                        }`}
                                                    >
                                                        {index % 2 === 0
                                                            ? "Completed"
                                                            : "Pending"}
                                                    </span>
                                                </td>
                                                <td className="border p-4">
                                                    <button className="text-blue-500 hover:underline">
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
