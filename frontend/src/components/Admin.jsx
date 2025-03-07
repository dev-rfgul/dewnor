// import { Link } from "react-router-dom";

// const Admin = () => {
//     return (
//         <div className="flex h-screen">
//             {/* Sidebar */}
//             <nav className="bg-blue-500 w-64 p-4 text-white flex flex-col space-y-4">
//                 <h1 className="font-bold text-2xl">Admin Panel</h1>
//                 <Link to="/" className="hover:bg-blue-600 px-4 py-2 rounded">
//                     Home
//                 </Link>
//                 <Link to="/add-product" className="hover:bg-blue-600 px-4 py-2 rounded">
//                     Product
//                 </Link>
//                 <Link to="/add-users" className="hover:bg-blue-600 px-4 py-2 rounded">
//                     Users
//                 </Link>

//             </nav>

//             {/* Main Content */}
//             <main className="flex-1 bg-gray-100 p-6">
//                 <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
//                 <p className="mt-4 text-gray-600">
//                     Welcome to the admin panel. Use the sidebar to navigate through the
//                     sections.
//                 </p>
//                 {/* Add your admin panel content here */}
//             </main>
//         </div>
//     );
// };

// export default Admin;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Import icons - assume using a library like Lucide React
// If using actual Lucide, you would import like this:
// import { Home, Package, Users, BarChart2, Settings, LogOut, Menu, X } from 'lucide-react';

const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    
    // Mock data for dashboard stats
    const stats = [
        { title: "Total Users", value: "2,451", change: "+12%", isPositive: true },
        { title: "Total Products", value: "834", change: "+7.2%", isPositive: true },
        { title: "Revenue", value: "$12,435", change: "+22%", isPositive: true },
        { title: "Pending Orders", value: "23", change: "-5%", isPositive: false },
    ];
    
    const isActive = (path) => {
        return location.pathname === path ? "bg-blue-600" : "";
    };
    
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile sidebar toggle */}
            <button 
                className="fixed z-20 bottom-4 right-4 lg:hidden bg-blue-600 text-white p-2 rounded-full shadow-lg"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? 'X' : '☰'}
            </button>
            
            {/* Sidebar */}
            <nav className={`bg-blue-700 text-white ${sidebarOpen ? 'w-64' : 'w-0 -ml-64'} lg:w-64 p-0 fixed h-full z-10 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0`}>
                <div className="p-4 flex flex-col h-full">
                    <div className="pb-6 mb-6 border-b border-blue-600">
                        <h1 className="font-bold text-2xl flex items-center">
                            <span className="bg-white text-blue-700 p-1 rounded mr-2">AP</span>
                            Admin Panel
                        </h1>
                    </div>
                    
                    <div className="flex-1">
                        <div className="space-y-1">
                            <Link to="/" className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive('/')}`}>
                                <span className="mr-3">🏠</span>
                                Dashboard
                            </Link>
                            <Link to="/add-product" className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive('/add-product')}`}>
                                <span className="mr-3">📦</span>
                                Products
                            </Link>
                            <Link to="/add-users" className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive('/add-users')}`}>
                                <span className="mr-3">👥</span>
                                Users
                            </Link>
                            <Link to="/analytics" className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive('/analytics')}`}>
                                <span className="mr-3">📊</span>
                                Analytics
                            </Link>
                            <Link to="/settings" className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive('/settings')}`}>
                                <span className="mr-3">⚙️</span>
                                Settings
                            </Link>
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-blue-600">
                        <button className="w-full flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors">
                            <span className="mr-3">🚪</span>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                            <p className="text-gray-600">Welcome back, Admin</p>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex space-x-3">
                            <button className="bg-white shadow-sm px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                                Export Data
                            </button>
                            <button className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700">
                                Create New
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activity & Tasks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Recent Activity</h3>
                                <button className="text-blue-600 text-sm hover:underline">View All</button>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                                                {item % 2 === 0 ? '👤' : '📦'}
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {item % 2 === 0 
                                                        ? 'New user registered' 
                                                        : 'Product updated'}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date().toLocaleTimeString()} - Today
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tasks */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Tasks</h3>
                                <button className="text-blue-600 text-sm hover:underline">+ Add Task</button>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {['Review new products', 'Approve user accounts', 'Update pricing strategy', 'Check inventory levels'].map((task, index) => (
                                    <div key={index} className="px-6 py-4 flex items-center">
                                        <input type="checkbox" className="mr-4" />
                                        <span className="flex-1">{task}</span>
                                        <div className="text-sm text-gray-500">Today</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>  
    );
};

export default Admin;