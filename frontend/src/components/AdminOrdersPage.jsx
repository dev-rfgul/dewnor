
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    // Replace global message with a map of order IDs to messages
    const [statusMessages, setStatusMessages] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/analytics/all-orders`);
                setOrders(response.data.orders);
                console.log(response.data)
                setLoading(false);
            } catch (err) {
                setError('Failed to load orders. Please try again later.');
                setLoading(false);
                console.error('Error fetching orders:', err);
            }
        };

        fetchOrders();
    }, []);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const closeOrderDetails = () => {
        setSelectedOrder(null);
    };

    // Filter orders based on search term and status
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.payment_intent?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.billing_details?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || order.payment_status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // Format currency
    const formatCurrency = (amount, currency = 'AED') => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: currency.toUpperCase(),
            minimumFractionDigits: 2
        }).format(amount / 100);
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
        } catch (e) {
            return dateString;
        }
    };

    // Updated to handle individual order status changes and messages
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/update-order-status`, {
                orderID: orderId,
                orderStatus: newStatus,
            });

            // Update message for this specific order only
            setStatusMessages(prev => ({
                ...prev,
                [orderId]: res.data.message || 'Status updated successfully!'
            }));

            // Update the orders state with the new status
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, order_status: newStatus } : order
            ));

            // Clear the message after 3 seconds
            setTimeout(() => {
                setStatusMessages(prev => {
                    const newMessages = { ...prev };
                    delete newMessages[orderId];
                    return newMessages;
                });
            }, 3000);

        } catch (error) {
            setStatusMessages(prev => ({
                ...prev,
                [orderId]: error.response?.data?.message || 'Error updating order'
            }));

            // Clear error message after 3 seconds
            setTimeout(() => {
                setStatusMessages(prev => {
                    const newMessages = { ...prev };
                    delete newMessages[orderId];
                    return newMessages;
                });
            }, 3000);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Order Management</h1>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search by email, name or order ID..."
                        className="w-full p-3 border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="p-3 border rounded-lg bg-white"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Items
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Payment Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr
                                    key={order._id || order.payment_intent}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatDate(order.created_at)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {order.billing_details?.name || 'N/A'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {order.customer_email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {order.line_items?.length || 0} items
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {formatCurrency(order.amount_total)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.payment_status === 'paid'
                                                ? 'bg-green-100 text-green-800'
                                                : order.payment_status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                            {order.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() => handleOrderClick(order)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {/* Display current order status with different colors */}

                                        <select
                                            name="orderStatus"
                                            value={order.orderStatus}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="dispatched">Dispatched</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        {/* Show message only for this specific order */}
                                        {statusMessages[order._id] && (
                                            <p className="text-xs text-green-500 mt-1">{statusMessages[order._id]}</p>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                    No orders found matching your criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
                        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Order Details</h2>
                            <button
                                onClick={closeOrderDetails}
                                className="p-1 rounded-full hover:bg-gray-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Order Summary Section */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-500">Order Date</p>
                                        <p className="font-medium">{formatDate(selectedOrder.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Payment ID</p>
                                        <p className="font-medium truncate">{selectedOrder.payment_intent}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Payment Status</p>
                                        <p className={`font-medium ${selectedOrder.payment_status === 'paid'
                                                ? 'text-green-600'
                                                : selectedOrder.payment_status === 'pending'
                                                    ? 'text-yellow-600'
                                                    : 'text-red-600'
                                            }`}>
                                            {selectedOrder.payment_status}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Order Status</p>
                                        <p className={`font-medium ${selectedOrder.order_status === 'completed'
                                                ? 'text-green-600'
                                                : selectedOrder.order_status === 'dispatched'
                                                    ? 'text-blue-600'
                                                    : 'text-yellow-600'
                                            }`}>
                                            {selectedOrder.order_status || 'Pending'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <p className="font-medium">{formatCurrency(selectedOrder.amount_total)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">{selectedOrder.billing_details?.name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{selectedOrder.customer_email || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium">{selectedOrder.billing_details?.phone || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Billing Address */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>{selectedOrder.billing_details?.address?.line1 || 'N/A'}</p>
                                    {selectedOrder.billing_details?.address?.line2 && (
                                        <p>{selectedOrder.billing_details.address.line2}</p>
                                    )}
                                    <p>
                                        {[
                                            selectedOrder.billing_details?.address?.city,
                                            selectedOrder.billing_details?.address?.state,
                                            selectedOrder.billing_details?.address?.postal_code
                                        ].filter(Boolean).join(', ')}
                                    </p>
                                    <p>{selectedOrder.billing_details?.address?.country}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                                <div className="bg-gray-50 rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {selectedOrder.line_items?.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-4 py-3">
                                                        <div className="text-sm font-medium text-gray-900">{item.description}</div>
                                                        <div className="text-xs text-gray-500">ID: {item.id}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        {formatCurrency(item.price?.unit_amount || 0, item.currency)}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-sm font-medium">
                                                        {formatCurrency(item.amount_total, item.currency)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-50">
                                            <tr>
                                                <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                                    Total
                                                </td>
                                                <td className="px-4 py-3 text-sm font-bold">
                                                    {formatCurrency(selectedOrder.amount_total)}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    onClick={closeOrderDetails}
                                >
                                    Close
                                </button>
                                <button
                                    className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
                                    onClick={() => {
                                        window.print();
                                    }}
                                >
                                    Print Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;