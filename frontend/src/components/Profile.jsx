
// import React, { useEffect, useState } from 'react';
// import { FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UserProfile = () => {

//     const [userData, setUserData] = useState(null);
//     const [cartProducts, setCartProducts] = useState([])
//     const [userId, setUserId] = useState()

//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             console.log(storedUser)
//             const parsedUser = JSON.parse(storedUser);
//             // console.log(parsedUser.user.id)
//             setUserId(parsedUser.user.id);
//         }
//         else {
//             console.error("No user found in localStorage");
//         }
//         console.log(userId)
//     }, [])
//     useEffect(() => {

//         const getUser = async () => {
//             if (userId) {
//                 try {
//                     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get-user/${userId}`);
//                     const data = await response.json();
//                     // console.log(data.user)
//                     setUserData(data.user);
//                     const userCart = data.user.cart // Array of product IDs
//                     // console.log(userCart)
//                     if (userCart.length > 0) {
//                         fetchCartProducts(userCart);
//                     }
//                 } catch (error) {
//                     console.error("Error fetching user data:", error);
//                 }
//             } else {
//                 console.error("No user found in localStorage");
//             }
//         };

//         getUser();
//     }, []);

//     const fetchCartProducts = async (cartIds) => {
//         console.log("Cart IDs:", cartIds); // Debugging

//         if (!Array.isArray(cartIds) || cartIds.length === 0) {
//             console.error("Cart IDs must be an array and cannot be empty.");
//             return;
//         }

//         try {
//             const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/get-selected-products`, { ids: cartIds });

//             console.log("Fetched Products:", response.data); // Debugging
//             setCartProducts(response.data); // Set fetched product details
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     console.log(cartProducts)

//     const handleLogout = async () => {
//         try {
//             await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {}, { withCredentials: true });
//             alert("User logged out successfully");
//             localStorage.clear();
//             navigate("/login");
//         } catch (error) {
//             console.error("Logout failed:", error.response?.data?.message || error.message);
//         }
//     };
//     const removeFromCart = async (productId, userId) => {
//         try {
//             const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/remove-from-cart`, {
//                 productId,
//                 userId
//             });

//             alert(response.data.message);
//             window.location.reload();
//         } catch (error) {
//             console.error("Error:", error.response?.data?.message || error.message);
//             alert("Error adding product to cart: " + (error.response?.data?.message || error.message));
//         }
//     };

//     if (!userData) {
//         return <p className="text-center mt-10 text-lg">Loading user data...</p>;
//     }


//     return (
//         <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 ease-in-out">
//             {/* User Info Section */}
//             <div className="flex items-center space-x-8 border-b pb-6">
//                 <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg">
//                     {userData?.name?.charAt(0)}
//                 </div>
//                 <div>
//                     <h2 className="text-4xl font-bold text-gray-800">{userData.name}</h2>
//                     <p className="text-lg text-gray-500 capitalize">{userData.role}</p>
//                     <p className="text-sm text-gray-400 mt-1">{userData.email}</p>
//                 </div>
//                 <button
//                     onClick={handleLogout}
//                     className="text-red-500 font-semibold hover:text-red-600 transition"
//                 >
//                     Logout
//                 </button>
//             </div>

//             {/* User Details Section */}
//             <div className="mt-8 space-y-8">
//                 {/* Cart Section */}
//                 <div className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//                     <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
//                         <FaShoppingCart className="mr-2 text-blue-600" />
//                         Your Cart
//                     </h3>
//                     <div className="mt-6 space-y-6">
//                         {cartProducts.length > 0 ? (
//                             cartProducts.map((product, index) => (
//                                 <div
//                                     key={index}
//                                     className="border rounded-xl shadow-md overflow-hidden bg-white hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300"
//                                 >
//                                     <div className="relative">
//                                         <img
//                                             src={product.images[0]}
//                                             alt={product.title}
//                                             className="w-full h-48 object-cover"
//                                         />
//                                         {product.discount > 0 && (
//                                             <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
//                                                 -{product.discount}%
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="p-4">
//                                         <h3 className="text-base font-semibold text-gray-900">
//                                             {product.name}
//                                             {/* {product._id} */}
//                                         </h3>
//                                         <div className="flex items-center gap-2 mt-2">
//                                             <span className="text-gray-400 line-through text-sm">
//                                                 {product.originalPrice} د.إ
//                                             </span>
//                                             <span className="text-green-600 font-bold text-lg">
//                                                 {product.price} د.إ
//                                             </span>
//                                         </div>
//                                         <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
//                                             <span className="font-medium">{product.tag}</span>
//                                             <span className="font-medium">| SKU: {product.SKU}</span>
//                                         </div>
//                                         <button className="mt-4 w-full bg-blue-600 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all">
//                                             ADD TO CART
//                                         </button>
//                                         <button onClick={() => { removeFromCart(product._id, userId) }} className="mt-4 w-full bg-blue-600 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all">
//                                             Remove From Cart
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-gray-500">No items in cart.</p>
//                         )}
//                     </div>
//                 </div>

//                 {/* Recently Purchased Section */}
//                 <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow">
//                     <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
//                         <FaCheckCircle className="mr-2 text-green-500" />
//                         Recently Purchased
//                     </h3>
//                     <p className="text-gray-500">No recent purchases.</p>
//                 </div>

//                 {/* Joined Date Section */}
//                 <div className="text-gray-700">
//                     <span className="font-semibold">Joined:</span>{" "}
//                     {new Date(userData.createdAt).toLocaleDateString()}
//                 </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-8 flex space-x-4">
//                 <button className="px-8 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
//                     Edit Profile
//                 </button>
//             </div>
//         </div>
//     );

// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser.user.id);
        } else {
            console.error("No user found in localStorage");
        }
    }, []);

    useEffect(() => {
        const getUser = async () => {
            if (!userId) return;

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/user/get-user/${userId}`
                );
                const data = await response.json();
                setUserData(data.user);

                if (data.user.cart.length > 0) {
                    fetchCartProducts(data.user.cart);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getUser();
    }, [userId]); // Trigger when `userId` is set

    const fetchCartProducts = async (cartIds) => {
        if (!Array.isArray(cartIds) || cartIds.length === 0) return;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/product/get-selected-products`,
                { ids: cartIds }
            );
            setCartProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
                {},
                { withCredentials: true }
            );
            alert("User logged out successfully");
            localStorage.clear();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || error.message);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/product/remove-from-cart`,
                {
                    productId,
                    userId
                }
            );
            alert(response.data.message);
            setCartProducts((prev) => prev.filter((product) => product._id !== productId));
        } catch (error) {
            console.error("Error:", error.response?.data?.message || error.message);
        }
    };

    if (!userData) {
        return <p className="text-center mt-10 text-lg">Loading user data...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 ease-in-out">
            {/* User Info Section */}
            <div className="flex items-center space-x-8 border-b pb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                    {userData?.name?.charAt(0)}
                </div>
                <div>
                    <h2 className="text-4xl font-bold text-gray-800">{userData.name}</h2>
                    <p className="text-lg text-gray-500 capitalize">{userData.role}</p>
                    <p className="text-sm text-gray-400 mt-1">{userData.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-red-500 font-semibold hover:text-red-600 transition"
                >
                    Logout
                </button>
            </div>

            {/* User Details Section */}
            <div className="mt-8 space-y-8">
                {/* Cart Section */}
                <div className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <FaShoppingCart className="mr-2 text-blue-600" />
                        Your Cart
                    </h3>
                    <div className="mt-6 space-y-6">
                        {cartProducts.length > 0 ? (
                            cartProducts.map((product) => (
                                <div className="border rounded-xl shadow-md overflow-hidden bg-white hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                                    <div className="relative">
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        {product.discount > 0 && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                                -{product.discount}%
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-gray-400 line-through text-sm">
                                                {product.originalPrice} د.إ
                                            </span>
                                            <span className="text-green-600 font-bold text-lg">{product.price} د.إ</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                                            <span className="font-medium">{product.tag}</span>
                                            <span className="font-medium">| SKU: {product.SKU}</span>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(product._id)}
                                            className="mt-4 w-full bg-red-600 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all"
                                        >
                                            Remove From Cart
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No items in cart.</p>
                        )}
                    </div>
                </div>

                {/* Recently Purchased Section */}
                <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <FaCheckCircle className="mr-2 text-green-500" />
                        Recently Purchased
                    </h3>
                    <p className="text-gray-500">No recent purchases.</p>
                </div>

                {/* Joined Date Section */}
                <div className="text-gray-700">
                    <span className="font-semibold">Joined:</span>{" "}
                    {new Date(userData.createdAt).toLocaleDateString()}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex space-x-4">
                <button className="px-8 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
