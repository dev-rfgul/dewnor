import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaCheckCircle, FaHistory } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const user = {
    name: 'UserName',
    role: 'User',
    email: 'user@dewnor.com',
    cart: [
        { id: '67aa528a90a29191be61ad5c', name: 'Product 1', price: '$199' },
        { id: '84f8b927e28b298f283a1a67d', name: 'Product 2', price: '$299' },
    ],
    recentlyPurchased: [
        { id: '123', name: 'Product A', price: '$99' },
        { id: '124', name: 'Product B', price: '$149' },
    ],
    createdAt: '2025-02-06T18:06:21.946Z',
};


const UserProfile = () => {
    const [userData, setUserData] = useState('')


    useEffect(() => {
        const getUser = async () => {
            const user = localStorage.getItem("user"); // Retrieve the user data
            if (user) {
                const parsedData = JSON.parse(user); // Parse JSON string
                const id = parsedData.user.id; // Correctly access the user ID
                setUserData(parsedData.user)
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get-user/${id}`);
                    const data = await response.json();
                    // setUsers(data);
                    console.log(data)
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            } else {
                console.error("No user found in localStorage");
            }
        };

        getUser();

    }, []);
    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {}, { withCredentials: true });
            alert("User logged out successfully");
            localStorage.clear()
            navigate("/login"); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || error.message);
        }
    };
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            {/* User Info Section */}
            <div className="flex items-center space-x-8">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-5xl font-semibold shadow-lg">
                    {user.name[0]}
                </div>
                <div>
                    <h2 className="text-4xl font-semibold text-gray-800">{userData.name}</h2>
                    <p className="text-lg text-gray-500">{userData.role}</p>
                    <p className="text-sm text-gray-400 mt-1">{userData.email}</p>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {/* User Details Section */}
            <div className="mt-12 space-y-8">
                {/* Cart Section */}
                <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <FaShoppingCart className="mr-2 text-blue-600" />
                        Your Cart
                    </h3>
                    <div className="mt-4 space-y-6">
                        {user.cart.length > 0 ? (
                            user.cart.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center text-xl font-semibold text-gray-600">
                                            {item.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.price}</p>
                                        </div>
                                    </div>
                                    <button className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200">Remove</button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No items in cart.</p>
                        )}
                    </div>
                </div>

                {/* Recently Purchased Section */}
                <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <FaCheckCircle className="mr-2 text-green-500" />
                        Recently Purchased
                    </h3>
                    <div className="mt-4 space-y-6">
                        {user.recentlyPurchased.length > 0 ? (
                            user.recentlyPurchased.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center text-xl font-semibold text-gray-600">
                                            {item.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No recent purchases.</p>
                        )}
                    </div>
                </div>

                {/* Order History Section */}
                <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <FaHistory className="mr-2 text-yellow-600" />
                        Order History
                    </h3>
                    <div className="mt-4">
                        <p className="text-gray-500">View your past orders and more.</p>
                    </div>
                </div>

                {/* Joined Date Section */}
                <div className="text-gray-700">
                    <span className="font-semibold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex space-x-4">
                <button className="px-8 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all duration-300">
                    Edit Profile
                </button>
                <button className="px-8 py-3 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md transition-all duration-300">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
