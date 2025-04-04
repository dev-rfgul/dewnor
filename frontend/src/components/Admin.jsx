
// import React, { useEffect, useState, useCallback } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Admin = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
//     const location = useLocation();
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Dashboard data states
//     const [dashboardData, setDashboardData] = useState({
//         usersCount: 0,
//         productCount: 0,
//         revenue: 0,
//         pendingOrders: 0,
//         completedOrders: 0,
//         dispatchedOrders: 0,
//         productsData: []
//     });

//     // Format currency
//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//             minimumFractionDigits: 2
//         }).format(amount);
//     };

//     // Format date
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return new Intl.DateTimeFormat('en-US', {
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         }).format(date);
//     };

//     // API calls using useCallback to prevent unnecessary recreations
//     const fetchData = useCallback(async () => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             // Use Promise.all for parallel API requests
//             const [usersResponse, productsResponse, revenueResponse, ordersResponse] = await Promise.all([
//                 fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get-users`),
//                 fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`),
//                 fetch(`${import.meta.env.VITE_BACKEND_URL}/analytics/total-revenue`),
//                 fetch(`${import.meta.env.VITE_BACKEND_URL}/analytics/all-orders`)
//             ]);

//             // Check if any responses failed
//             if (!usersResponse.ok || !productsResponse.ok || !revenueResponse.ok || !ordersResponse.ok) {
//                 throw new Error('One or more API requests failed');
//             }

//             // Parse JSON responses in parallel
//             const [usersData, productsData, revenueData, ordersData] = await Promise.all([
//                 usersResponse.json(),
//                 productsResponse.json(),
//                 revenueResponse.json(),
//                 ordersResponse.json()
//             ]);

//             // Process orders data
//             const orders = ordersData.orders || [];
//             let pending = 0, dispatched = 0, completed = 0;

//             orders.forEach(order => {
//                 if (order.orderStatus === "pending") pending++;
//                 else if (order.orderStatus === "dispatched") dispatched++;
//                 else if (order.orderStatus === "completed") completed++;
//             });

//             // Update state with all data
//             setDashboardData({
//                 usersCount: usersData.length || 0,
//                 productCount: productsData.products?.length || 0,
//                 revenue: revenueData.totalRevenue || 0,
//                 pendingOrders: pending || 0,
//                 completedOrders: completed || 0,
//                 dispatchedOrders: dispatched || 0,
//                 productsData: orders ||0
//             });

//         } catch (error) {
//             console.error("Error fetching dashboard data:", error);
//             setError("Failed to load dashboard data. Please try again later.");
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     // Responsive sidebar handler
//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 1024) {
//                 setSidebarOpen(true);
//             } else if (window.innerWidth < 768) {
//                 setSidebarOpen(false);
//             }
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Fetch data on component mount
//     useEffect(() => {
//         fetchData();

//         // Optional: Set up polling for real-time updates
//         const intervalId = setInterval(fetchData, 300000); // Refresh every 5 minutes

//         return () => clearInterval(intervalId);
//     }, [fetchData]);

//     // Dashboard stats with actual data
//     const stats = [
//         { title: "Total Users", value: dashboardData.usersCount, change: "+12%", isPositive: true, icon: "👥" },
//         { title: "Total Products", value: dashboardData.productCount, change: "+7.2%", isPositive: true, icon: "📦" },
//         { title: "Revenue", value: formatCurrency(dashboardData.revenue), change: "+22%", isPositive: true, icon: "💰" },
//         { title: "Pending Orders", value: dashboardData.pendingOrders, change: "+8%", isPositive: true, icon: "⏳" },
//         { title: "Dispatched Orders", value: dashboardData.dispatchedOrders, change: "+15%", isPositive: true, icon: "🚚" },
//         { title: "Completed Orders", value: dashboardData.completedOrders, change: "+10%", isPositive: true, icon: "✅" }
//     ];

//     // Navigation items
//     const navItems = [
//         { path: "/", label: "Dashboard", icon: "🏠" },
//         { path: "/add-product", label: "Products", icon: "📦" },
//         { path: "/add-users", label: "Users", icon: "👥" },
//         { path: "/analytics", label: "Analytics", icon: "📊" },
//         { path: "/orders", label: "Orders", icon: "🛒" },
//         { path: "/settings", label: "Settings", icon: "⚙️" }
//     ];

//     const isActive = (path) => {
//         return location.pathname === path ? "bg-blue-600" : "";
//     };

//     if (error) {
//         return (
//             <div className="flex h-screen items-center justify-center bg-gray-100">
//                 <div className="text-center p-8 bg-white rounded-lg shadow-md">
//                     <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
//                     <p className="text-gray-700 mb-4">{error}</p>
//                     <button
//                         onClick={fetchData}
//                         className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex h-screen bg-gray-50">
//             {/* Mobile sidebar toggle */}
//             <button
//                 className="fixed z-20 bottom-4 right-4 lg:hidden bg-blue-600 text-white p-2 rounded-full shadow-lg"
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//                 {sidebarOpen ? '✕' : '☰'}
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
//                             {navItems.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center hover:bg-blue-600 px-4 py-3 rounded transition-colors ${isActive(item.path)}`}
//                                 >
//                                     <span className="mr-3">{item.icon}</span>
//                                     {item.label}
//                                 </Link>
//                             ))}
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
//                             <button className="bg-white shadow-sm px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
//                                 <span className="mr-2">📥</span> Export Data
//                             </button>
//                             <button className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-colors">
//                                 <span className="mr-2">➕</span> Create New
//                             </button>
//                         </div>
//                     </div>

//                     {/* Stats Cards */}
//                     {isLoading ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                             {[1, 2, 3, 4, 5, 6].map((item) => (
//                                 <div key={item} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
//                                     <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//                                     <div className="h-8 bg-gray-200 rounded w-1/2 mt-2"></div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                             {stats.map((stat, index) => (
//                                 <div key={index} className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center">
//                                             <span className="text-xl mr-2">{stat.icon}</span>
//                                             <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
//                                         </div>
//                                         <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                                             {stat.change}
//                                         </span>
//                                     </div>
//                                     <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {/* Recent Activity & Tasks */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         {/* Recent Activity */}
//                         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                             <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                                 <h3 className="text-lg font-medium">Recent Activity</h3>
//                                 <button className="text-blue-600 text-sm hover:underline">View All</button>
//                             </div>

//                             {isLoading ? (
//                                 <div className="divide-y divide-gray-100">
//                                     {[1, 2, 3, 4].map((item) => (
//                                         <div key={item} className="px-6 py-4 animate-pulse">
//                                             <div className="flex items-center">
//                                                 <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
//                                                 <div className="flex-1">
//                                                     <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                                                     <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="divide-y divide-gray-100">
//                                     {dashboardData.productsData.slice(0, 4).map((item, index) => (
//                                         <div key={item._id || index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                                             <div className="flex items-center">
//                                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-4 ${item.orderStatus === 'pending' ? 'bg-yellow-500' :
//                                                     item.orderStatus === 'dispatched' ? 'bg-blue-500' : 'bg-green-500'
//                                                     }`}>
//                                                     {item.orderStatus === 'pending' ? '⏳' :
//                                                         item.orderStatus === 'dispatched' ? '🚚' : '✅'}
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-medium">
//                                                         New order from {item.customer_email}
//                                                     </p>
//                                                     <p className="text-sm text-gray-500">
//                                                         {formatDate(item.created_at || new Date())} - {item.orderStatus}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Tasks */}
//                         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                             <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                                 <h3 className="text-lg font-medium">Pending Orders</h3>
//                                 <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                                     {dashboardData.pendingOrders} orders
//                                 </span>
//                             </div>

//                             {isLoading ? (
//                                 <div className="divide-y divide-gray-100">
//                                     {[1, 2, 3].map((item) => (
//                                         <div key={item} className="px-6 py-4 animate-pulse">
//                                             <div className="flex items-center">
//                                                 <div className="h-4 w-4 bg-gray-200 rounded mr-4"></div>
//                                                 <div className="flex-1">
//                                                     <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="divide-y divide-gray-100">
//                                     {dashboardData.productsData
//                                         .filter(task => task.orderStatus === 'pending')
//                                         .slice(0, 5)
//                                         .map((task, index) => (
//                                             <div key={task._id || index} className="px-6 py-4 flex items-center hover:bg-gray-50 transition-colors">
//                                                 <input type="checkbox" className="mr-4 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
//                                                 <div className="flex-1">
//                                                     <p className="font-medium">Order from: {task.customer_email}</p>
//                                                     <div className="flex text-sm text-gray-500 space-x-4">
//                                                         <span>Ordered: {formatDate(task.created_at || new Date())}</span>
//                                                         <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
//                                                             {task.orderStatus}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                                 <button className="ml-2 text-blue-600 hover:text-blue-800">
//                                                     Process
//                                                 </button>
//                                             </div>
//                                         ))}

//                                     {dashboardData.productsData.filter(task => task.orderStatus === 'pending').length === 0 && (
//                                         <div className="px-6 py-8 text-center text-gray-500">
//                                             <p>No pending orders at the moment</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
//                                 <Link to='/orders' className="text-blue-600 text-sm hover:underline w-full text-center" >
//                                     view all
//                                 </Link>

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

    // Dashboard data states with proper default values
    const [dashboardData, setDashboardData] = useState({
        usersCount: 0,
        productCount: 0,
        revenue: 0,
        pendingOrders: 0,
        completedOrders: 0,
        dispatchedOrders: 0,
        productsData: []
    });

    // Format currency with error handling
    const formatCurrency = (amount) => {
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            }).format(amount || 0);
        } catch (error) {
            console.error("Error formatting currency:", error);
            return "$0.00";
        }
    };

    // Format date with error handling
    const formatDate = (dateString) => {
        try {
            if (!dateString) return "N/A";
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Invalid Date";
            
            return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        } catch (error) {
            console.error("Error formatting date:", error);
            return "N/A";
        }
    };

    // API calls using useCallback with robust error handling
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
            if (!backendUrl) {
                console.warn("Backend URL not defined in environment variables");
            }

            // Use Promise.all with individual try/catch for each request
            const requests = [
                fetchWithTimeout(`${backendUrl}/user/get-users`),
                fetchWithTimeout(`${backendUrl}/product/get-products`),
                fetchWithTimeout(`${backendUrl}/analytics/total-revenue`),
                fetchWithTimeout(`${backendUrl}/analytics/all-orders`)
            ];

            const [usersResponse, productsResponse, revenueResponse, ordersResponse] = await Promise.all(
                requests.map(p => p.catch(error => {
                    console.error("API request failed:", error);
                    return { ok: false, error };
                }))
            );

            // Process responses safely
            const usersData = usersResponse.ok ? await usersResponse.json() : [];
            const productsData = productsResponse.ok ? await productsResponse.json() : { products: [] };
            const revenueData = revenueResponse.ok ? await revenueResponse.json() : { totalRevenue: 0 };
            const ordersData = ordersResponse.ok ? await ordersResponse.json() : { orders: [] };

            // Process orders data safely
            const orders = ordersData.orders || [];
            let pending = 0, dispatched = 0, completed = 0;

            orders.forEach(order => {
                if (order && order.orderStatus === "pending") pending++;
                else if (order && order.orderStatus === "dispatched") dispatched++;
                else if (order && order.orderStatus === "completed") completed++;
            });

            // Update state with all data
            setDashboardData({
                usersCount: Array.isArray(usersData) ? usersData.length : 0,
                productCount: productsData.products?.length || 0,
                revenue: revenueData.totalRevenue || 0,
                pendingOrders: pending,
                completedOrders: completed,
                dispatchedOrders: dispatched,
                productsData: orders || []
            });

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setError("Failed to load dashboard data. Please try again later.");
            // Keep existing data if there's an error
        } finally {
            setIsLoading(false);
        }
    }, []);
    

    // Helper function for fetch with timeout
    const fetchWithTimeout = (url, options = {}, timeout = 10000) => {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error(`Request timed out for ${url}`)), timeout)
            )
        ]);
    };

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

    // Fetch data on component mount with error handling
    useEffect(() => {
        fetchData().catch(err => {
            console.error("Error in initial data fetch:", err);
            setError("Could not load dashboard data. Please check your connection and try again.");
            setIsLoading(false);
        });

        // Optional: Set up polling for real-time updates with error handling
        const intervalId = setInterval(() => {
            fetchData().catch(err => {
                console.error("Error in polling data fetch:", err);
                // Don't update error state for polling failures
            });
        }, 300000); // Refresh every 5 minutes

        return () => clearInterval(intervalId);
    }, [fetchData]);

    // Dashboard stats with actual data and percentage changes
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

    // Safe access to order data with default values
    const getRecentActivities = () => {
        if (!dashboardData.productsData || !Array.isArray(dashboardData.productsData) || dashboardData.productsData.length === 0) {
            return (
                <div className="px-6 py-8 text-center text-gray-500">
                    <p>No recent activities available</p>
                </div>
            );
        }

        return dashboardData.productsData.slice(0, 4).map((item, index) => (
            <div key={item?._id || `activity-${index}`} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-4 ${
                        item?.orderStatus === 'pending' ? 'bg-yellow-500' :
                        item?.orderStatus === 'dispatched' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                        {item?.orderStatus === 'pending' ? '⏳' :
                         item?.orderStatus === 'dispatched' ? '🚚' : '✅'}
                    </div>
                    <div>
                        <p className="font-medium">
                            New order from {item?.customer_email || 'Unknown Customer'}
                        </p>
                        <p className="text-sm text-gray-500">
                            {formatDate(item?.created_at)} - {item?.orderStatus || 'Unknown Status'}
                        </p>
                    </div>
                </div>
            </div>
        ));
    };

    // Safe access to pending orders
    const getPendingOrders = () => {
        const pendingOrders = dashboardData.productsData
            .filter(task => task && task.orderStatus === 'pending')
            .slice(0, 5);

        if (!pendingOrders.length) {
            return (
                <div className="px-6 py-8 text-center text-gray-500">
                    <p>No pending orders at the moment</p>
                </div>
            );
        }

        return pendingOrders.map((task, index) => (
            <div key={task?._id || `pending-${index}`} className="px-6 py-4 flex items-center hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="mr-4 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <div className="flex-1">
                    <p className="font-medium">Order from: {task?.customer_email || 'Unknown Customer'}</p>
                    <div className="flex text-sm text-gray-500 space-x-4">
                        <span>Ordered: {formatDate(task?.created_at)}</span>
                        <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                            {task?.orderStatus || 'pending'}
                        </span>
                    </div>
                </div>
                <button className="ml-2 text-blue-600 hover:text-blue-800">
                    Process
                </button>
            </div>
        ));
    };

    // Error message component
    if (error) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={() => fetchData().catch(err => console.error("Retry failed:", err))}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {isLoading ? (
                            // Skeleton loaders for stats
                            Array(6).fill(0).map((_, index) => (
                                <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                    <div className="h-8 bg-gray-200 rounded w-1/2 mt-2"></div>
                                </div>
                            ))
                        ) : (
                            // Actual stats cards
                            stats.map((stat, index) => (
                                <div key={`stat-${index}`} className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
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
                            ))
                        )}
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
                                {isLoading ? (
                                    // Skeleton loaders for activities
                                    Array(4).fill(0).map((_, index) => (
                                        <div key={`skeleton-activity-${index}`} className="px-6 py-4 animate-pulse">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
                                                <div className="flex-1">
                                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    getRecentActivities()
                                )}
                            </div>
                        </div>

                        {/* Pending Orders */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Pending Orders</h3>
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    {dashboardData.pendingOrders || 0} orders
                                </span>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {isLoading ? (
                                    // Skeleton loaders for tasks
                                    Array(3).fill(0).map((_, index) => (
                                        <div key={`skeleton-task-${index}`} className="px-6 py-4 animate-pulse">
                                            <div className="flex items-center">
                                                <div className="h-4 w-4 bg-gray-200 rounded mr-4"></div>
                                                <div className="flex-1">
                                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    getPendingOrders()
                                )}
                            </div>

                            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                                <Link to='/orders' className="text-blue-600 text-sm hover:underline w-full text-center block" >
                                    View All
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