
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Admin = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(true);
//     const location = useLocation();

//     const [usersCount, setUsersCount] = useState(0)
//     const [productCount, setProductCount] = useState(0)
//     const [revenue, setRevenue] = useState(0)
//     const [pendingOrders, setPendingOrders] = useState(0)
//     const [completedOrders, setCompletedOrders] = useState(0)
//     const [dispatchedOrders, setDispatchedOrders] = useState(0)
//     const [productsData, setProductsData] = useState([]) // saving the product data to show the new orders in recent activity or tasks

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get-users`);
//             const data = await response.json();
//             setUsersCount(data.length);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };
//     const fetchProducts = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
//             const data = await response.json();
//             console.log(data)
//             setProductCount(data.products.length);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };
//     const fetchRevenue = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analytics/total-revenue`);
//             const data = await response.json();
//             console.log(data.totalRevenue)
//             setRevenue(data.totalRevenue);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };
//     const productStatus = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analytics/all-orders`);
//             const data = await response.json();
//             // console.log("product status", data.orders)
//             const products = data.orders
//             setProductsData(products)
//             console.log(products)
//             let pending = 0;
//             let dispatched = 0;
//             let completed = 0;

//             products.forEach((order) => {
//                 console.log(order.orderStatus);
//                 if (order.orderStatus === "pending") pending++;
//                 else if (order.orderStatus === "dispatched") dispatched++;
//                 else if (order.orderStatus === "completed") completed++;
//             });

//             setPendingOrders(pending);
//             setDispatchedOrders(dispatched);
//             setCompletedOrders(completed);


//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }

//     };
//     console.log("products data", productsData)

//     useEffect(() => {
//         fetchUsers()
//         fetchProducts()
//         fetchRevenue()
//         productStatus()
//     }, [])

//     // Mock data for dashboard stats
//     const stats = [
//         { title: "Total Users", value: `${usersCount}`, change: "+12%", isPositive: true },
//         { title: "Total Products", value: `${productCount}`, change: "+7.2%", isPositive: true },
//         { title: "Revenue", value: `$${revenue}`, change: "+22%", isPositive: true },
//         { title: "Pending Orders", value: `${pendingOrders}`, change: "-5%", isPositive: false },
//         { title: "Dispatched Orders", value: `${dispatchedOrders}`, change: "-5%", isPositive: false },
//         { title: "Completed Orders", value: `${completedOrders}`, change: "-5%", isPositive: false },
//     ];

//     const isActive = (path) => {
//         return location.pathname === path ? "bg-blue-600" : "";
//     };

//     return (
//         <div className="flex h-screen bg-gray-50">
//             {/* Mobile sidebar toggle */}
//             <button
//                 className="fixed z-20 bottom-4 right-4 lg:hidden bg-blue-600 text-white p-2 rounded-full shadow-lg"
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//                 {sidebarOpen ? 'X' : '☰'}
//             </button>

//             {/* Sidebar */}
//             <nav className={`bg-blue-700 text-white ${sidebarOpen ? 'w-64' : 'w-0 -ml-64'} lg:w-64 p-0 fixed h-full z-10 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0`}>
//                 <div className="p-4 flex flex-col h-full">
//                     <div className="pb-6 mb-6 border-b border-blue-600">
//                         <h1 className="font-bold text-2xl flex items-center">
//                             <span className="bg-white text-blue-700 p-1 rounded mr-2">AP</span>
//                             Admin Panel
//                         </h1>
//                     </div>

//                     <div className="flex-1">
//                         <div className="space-y-1">
//                             <Link to="/" className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive('/')}`}>
//                                 <span className="mr-3">🏠</span>
//                                 Dashboard
//                             </Link>
//                             <Link to="/add-product" className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive('/add-product')}`}>
//                                 <span className="mr-3">📦</span>
//                                 Products
//                             </Link>
//                             <Link to="/add-users" className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive('/add-users')}`}>
//                                 <span className="mr-3">👥</span>
//                                 Users
//                             </Link>
//                             <Link to="/analytics" className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive('/analytics')}`}>
//                                 <span className="mr-3">📊</span>
//                                 Analytics
//                             </Link>
//                             <Link to="/orders" className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive('/settings')}`}>
//                                 <span className="mr-3">⚙️</span>
//                                 Orders
//                             </Link>
//                         </div>
//                     </div>

//                     <div className="pt-6 border-t border-blue-600">
//                         <button className="w-full flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors">
//                             <span className="mr-3">🚪</span>
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </nav>

//             {/* Main Content */}
//             <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
//                 <div className="container mx-auto px-6 py-8">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//                         <div>
//                             <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
//                             <p className="text-gray-600">Welcome back, Admin</p>
//                         </div>

//                         <div className="mt-4 md:mt-0 flex space-x-3">
//                             <button className="bg-white shadow-sm px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
//                                 Export Data
//                             </button>
//                             <button className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700">
//                                 Create New
//                             </button>
//                         </div>
//                     </div>

//                     {/* Stats Cards */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                         {stats.map((stat, index) => (
//                             <div key={index} className="bg-white rounded-lg shadow-sm p-6">
//                                 <div className="flex items-center justify-between">
//                                     <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
//                                     <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                                         {stat.change}
//                                     </span>
//                                 </div>
//                                 <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Recent Activity & Tasks */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         {/* Recent Activity */}
//                         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                             <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                                 <h3 className="text-lg font-medium">Recent Activity</h3>
//                                 <button className="text-blue-600 text-sm hover:underline">View All</button>
//                             </div>
//                             <div className="divide-y divide-gray-100">
//                                 {[1, 2, 3, 4].map((item) => (
//                                     <div key={item} className="px-6 py-4">
//                                         <div className="flex items-center">
//                                             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
//                                                 {item % 2 === 0 ? '👤' : '📦'}
//                                             </div>
//                                             <div>
//                                                 <p className="font-medium">
//                                                     {item % 2 === 0
//                                                         ? 'New user registered'
//                                                         : 'Product updated'}
//                                                 </p>
//                                                 <p className="text-sm text-gray-500">
//                                                     {new Date().toLocaleTimeString()} - Today
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Tasks */}
//                         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                             <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                                 <h3 className="text-lg font-medium">Tasks</h3>
//                                 <button className="text-blue-600 text-sm hover:underline">+ Add Task</button>
//                             </div>
//                             <div className="divide-y divide-gray-100">
//                                 {productsData
//                                     .filter((task) => task.orderStatus === 'pending')
//                                     .map((task) => (
//                                         <div key={task._id} className="px-6 py-4 flex items-center border-b hover:bg-gray-50">
//                                             <input type="checkbox" className="mr-4" />
//                                             <span className="flex-1">Order from : {task.customer_email}</span>
//                                             <span className="flex-1">Orderd at : {task.created_at}</span>
//                                             <span className="flex-1">{task.orderStatus}</span>
//                                             <span className="flex-1">Products ordered: {}</span>
//                                             <div className="text-sm text-gray-500">Today</div>
//                                         </div>
//                                     ))}

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Admin;

import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dashboard data states
    const [dashboardData, setDashboardData] = useState({
        usersCount: 0,
        productCount: 0,
        revenue: 0,
        pendingOrders: 0,
        completedOrders: 0,
        dispatchedOrders: 0,
        productsData: []
    });

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // API calls using useCallback to prevent unnecessary recreations
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Use Promise.all for parallel API requests
            const [usersResponse, productsResponse, revenueResponse, ordersResponse] = await Promise.all([
                fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get-users`),
                fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`),
                fetch(`${import.meta.env.VITE_BACKEND_URL}/analytics/total-revenue`),
                fetch(`${import.meta.env.VITE_BACKEND_URL}/analytics/all-orders`)
            ]);

            // Check if any responses failed
            if (!usersResponse.ok || !productsResponse.ok || !revenueResponse.ok || !ordersResponse.ok) {
                throw new Error('One or more API requests failed');
            }

            // Parse JSON responses in parallel
            const [usersData, productsData, revenueData, ordersData] = await Promise.all([
                usersResponse.json(),
                productsResponse.json(),
                revenueResponse.json(),
                ordersResponse.json()
            ]);

            // Process orders data
            const orders = ordersData.orders || [];
            let pending = 0, dispatched = 0, completed = 0;

            orders.forEach(order => {
                if (order.orderStatus === "pending") pending++;
                else if (order.orderStatus === "dispatched") dispatched++;
                else if (order.orderStatus === "completed") completed++;
            });

            // Update state with all data
            setDashboardData({
                usersCount: usersData.length || 0,
                productCount: productsData.products?.length || 0,
                revenue: revenueData.totalRevenue || 0,
                pendingOrders: pending,
                completedOrders: completed,
                dispatchedOrders: dispatched,
                productsData: orders
            });

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setError("Failed to load dashboard data. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Responsive sidebar handler
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch data on component mount
    useEffect(() => {
        fetchData();

        // Optional: Set up polling for real-time updates
        const intervalId = setInterval(fetchData, 300000); // Refresh every 5 minutes

        return () => clearInterval(intervalId);
    }, [fetchData]);

    // Dashboard stats with actual data
    const stats = [
        { title: "Total Users", value: dashboardData.usersCount, change: "+12%", isPositive: true, icon: "👥" },
        { title: "Total Products", value: dashboardData.productCount, change: "+7.2%", isPositive: true, icon: "📦" },
        { title: "Revenue", value: formatCurrency(dashboardData.revenue), change: "+22%", isPositive: true, icon: "💰" },
        { title: "Pending Orders", value: dashboardData.pendingOrders, change: "+8%", isPositive: true, icon: "⏳" },
        { title: "Dispatched Orders", value: dashboardData.dispatchedOrders, change: "+15%", isPositive: true, icon: "🚚" },
        { title: "Completed Orders", value: dashboardData.completedOrders, change: "+10%", isPositive: true, icon: "✅" }
    ];

    // Navigation items
    const navItems = [
        { path: "/", label: "Dashboard", icon: "🏠" },
        { path: "/add-product", label: "Products", icon: "📦" },
        { path: "/add-users", label: "Users", icon: "👥" },
        { path: "/analytics", label: "Analytics", icon: "📊" },
        { path: "/orders", label: "Orders", icon: "🛒" },
        { path: "/settings", label: "Settings", icon: "⚙️" }
    ];

    const isActive = (path) => {
        return location.pathname === path ? "bg-blue-600" : "";
    };

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={fetchData}
                        className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile sidebar toggle */}
            <button
                className="fixed z-20 bottom-4 right-4 lg:hidden bg-blue-600 text-white p-2 rounded-full shadow-lg"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? '✕' : '☰'}
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
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive(item.path)}`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
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
                            <button className="bg-white shadow-sm px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                                <span className="mr-2">📥</span> Export Data
                            </button>
                            <button className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-colors">
                                <span className="mr-2">➕</span> Create New
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                    <div className="h-8 bg-gray-200 rounded w-1/2 mt-2"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="text-xl mr-2">{stat.icon}</span>
                                            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                                        </div>
                                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Recent Activity & Tasks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Recent Activity</h3>
                                <button className="text-blue-600 text-sm hover:underline">View All</button>
                            </div>

                            {isLoading ? (
                                <div className="divide-y divide-gray-100">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="px-6 py-4 animate-pulse">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
                                                <div className="flex-1">
                                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {dashboardData.productsData.slice(0, 4).map((item, index) => (
                                        <div key={item._id || index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-4 ${item.orderStatus === 'pending' ? 'bg-yellow-500' :
                                                        item.orderStatus === 'dispatched' ? 'bg-blue-500' : 'bg-green-500'
                                                    }`}>
                                                    {item.orderStatus === 'pending' ? '⏳' :
                                                        item.orderStatus === 'dispatched' ? '🚚' : '✅'}
                                                </div>
                                                <div>
                                                    <p className="font-medium">
                                                        New order from {item.customer_email}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDate(item.created_at || new Date())} - {item.orderStatus}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Tasks */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Pending Orders</h3>
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    {dashboardData.pendingOrders} orders
                                </span>
                            </div>

                            {isLoading ? (
                                <div className="divide-y divide-gray-100">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="px-6 py-4 animate-pulse">
                                            <div className="flex items-center">
                                                <div className="h-4 w-4 bg-gray-200 rounded mr-4"></div>
                                                <div className="flex-1">
                                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {dashboardData.productsData
                                        .filter(task => task.orderStatus === 'pending')
                                        .slice(0, 5)
                                        .map((task, index) => (
                                            <div key={task._id || index} className="px-6 py-4 flex items-center hover:bg-gray-50 transition-colors">
                                                <input type="checkbox" className="mr-4 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                                                <div className="flex-1">
                                                    <p className="font-medium">Order from: {task.customer_email}</p>
                                                    <div className="flex text-sm text-gray-500 space-x-4">
                                                        <span>Ordered: {formatDate(task.created_at || new Date())}</span>
                                                        <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                                                            {task.orderStatus}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="ml-2 text-blue-600 hover:text-blue-800">
                                                    Process
                                                </button>
                                            </div>
                                        ))}

                                    {dashboardData.productsData.filter(task => task.orderStatus === 'pending').length === 0 && (
                                        <div className="px-6 py-8 text-center text-gray-500">
                                            <p>No pending orders at the moment</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                                <Link to='/orders' className="text-blue-600 text-sm hover:underline w-full text-center" >
                                    view all
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin;