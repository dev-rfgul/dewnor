import React from 'react';

const user = {
    name: 'Muhammad Fahad',
    role: 'Admin',
    email: 'raofahadgul785@gmail.com',
    cart: [
        { id: '67aa528a90a29191be61ad5c', name: 'Product 1', price: '$199' },
        { id: '84f8b927e28b298f283a1a67d', name: 'Product 2', price: '$299' },
    ],
    createdAt: '2025-02-06T18:06:21.946Z',
};

const UserProfile = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            {/* User Info Section */}
            <div className="flex items-center space-x-8">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-5xl font-semibold shadow-lg">
                    {user.name[0]}
                </div>
                <div>
                    <h2 className="text-4xl font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-lg text-gray-500">{user.role}</p>
                    <p className="text-sm text-gray-400 mt-1">{user.email}</p>
                </div>
            </div>

            {/* User Details Section */}
            <div className="mt-12 space-y-8">
                {/* Cart Section */}
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Your Cart</h3>
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
