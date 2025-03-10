// import React, { useEffect, useState } from "react";
// import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";


// const UserProfile = () => {
//     const [userData, setUserData] = useState(null);
//     const [cartProducts, setCartProducts] = useState([]);
//     const [userId, setUserId] = useState(null);
//     const [product, setProduct] = useState(null); // Ensure product is defined

//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             const parsedUser = JSON.parse(storedUser);
//             setUserId(parsedUser.user.id);
//         } else {
//             console.error("No user found in localStorage");
//         }
//     }, []);

//     useEffect(() => {
//         const getUser = async () => {
//             if (!userId) return;

//             try {
//                 const response = await fetch(
//                     `${import.meta.env.VITE_BACKEND_URL}/user/get-user/${userId}`
//                 );
//                 const data = await response.json();
//                 setUserData(data.user);

//                 if (data.user.cart.length > 0) {
//                     fetchCartProducts(data.user.cart);
//                 }
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         };

//         getUser();
//     }, [userId]);

//     const fetchCartProducts = async (cartIds) => {
//         if (!Array.isArray(cartIds) || cartIds.length === 0) return;

//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/product/get-selected-products`,
//                 { ids: cartIds }
//             );
//             setCartProducts(response.data);
//             setProduct(response.data[0]); // Set first product as default for payment
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };
//     console.log(cartProducts)

//     const makePayment = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/makepayment`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     products: cartProducts.map(product => ({
//                         _id: product.id,
//                         name: product.name,
//                         price: product.price,
//                         image: product.images.length > 0 ? product.images[0] : "https://www.dewnor.com/wp-content/uploads/2021/01/cropped-cropped-logo.png" // Use the first image
//                     }))
//                 }),
//             });

//             const data = await response.json();

//             if (!data.sessionId) {
//                 throw new Error("No sessionId received from backend");
//             }

//             // Redirect to Stripe Checkout
//             const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`);
//             await stripe.redirectToCheckout({ sessionId: data.sessionId });
//         } catch (error) {
//             console.error("Payment Error:", error);
//         }
//     };



//     const handleLogout = async () => {
//         try {
//             await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
//                 {},
//                 { withCredentials: true }
//             );
//             alert("User logged out successfully");
//             localStorage.clear();
//             navigate("/login");
//         } catch (error) {
//             console.error("Logout failed:", error.response?.data?.message || error.message);
//         }
//     };

//     const removeFromCart = async (productId) => {
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/product/remove-from-cart`,
//                 { productId, userId }
//             );
//             alert(response.data.message);
//             setCartProducts((prev) => prev.filter((product) => product._id !== productId));
//         } catch (error) {
//             console.error("Error:", error.response?.data?.message || error.message);
//         }
//     };

//     if (!userData) {
//         return <p className="text-center mt-10 text-lg">Loading user data...</p>;
//     }

//     return (
//         <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 ease-in-out">
//             <div className="flex items-center space-x-8 border-b pb-6">
//                 <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg">
//                     {userData?.name?.charAt(0)}
//                 </div>
//                 <div>
//                     <h2 className="text-4xl font-bold text-gray-800">{userData.name}</h2>
//                     <p className="text-lg text-gray-500 capitalize">{userData.role}</p>
//                     <p className="text-sm text-gray-400 mt-1">{userData.email}</p>
//                 </div>
//                 <button onClick={handleLogout} className="text-red-500 font-semibold hover:text-red-600 transition">
//                     Logout
//                 </button>
//             </div>

//             <div className="mt-8 space-y-8">
//                 <div className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//                     <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
//                         <FaShoppingCart className="mr-2 text-blue-600" />
//                         Your Cart
//                     </h3>
//                     <div className="mt-6 space-y-6">
//                         {cartProducts.length > 0 ? (
//                             cartProducts.map((product) => (
//                                 <div key={product._id} className="border rounded-xl shadow-md bg-white">
//                                     <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
//                                     <div className="p-4">
//                                         <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
//                                         <span className="text-green-600 font-bold text-lg">{product.price} د.إ</span>
//                                         <button onClick={() => removeFromCart(product._id)} className="mt-4 w-full bg-red-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-red-700">
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

//                 <button
//                     onClick={makePayment}
//                     className="w-full bg-green-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-green-700"
//                 >
//                     Pay Now
//                 </button>

//             </div>
//         </div>
//     );
// };

// export default UserProfile;

import React, { useEffect, useState, useMemo } from "react";
import { FaShoppingCart, FaUserCircle, FaTrash, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [error, setError] = useState(null);
    const [showAdminBtn, setShowAdminBtn] = useState(false)

    const navigate = useNavigate();

    // Calculate cart total
    const cartTotal = useMemo(() => {
        return cartProducts.reduce((sum, product) => sum + Number(product.price), 0).toFixed(2);
    }, [cartProducts]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (!storedUser) {
                    throw new Error("No user found in localStorage");
                }

                const parsedUser = JSON.parse(storedUser);
                setUserId(parsedUser.user.id);

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/user/get-user/${parsedUser.user.id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                if (data.user.role === "admin") navigate("/admin")




                setUserData(data.user);

                if (data.user.cart && data.user.cart.length > 0) {
                    await fetchCartProducts(data.user.cart);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const fetchCartProducts = async (cartIds) => {
        if (!Array.isArray(cartIds) || cartIds.length === 0) {
            setCartProducts([]);
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/product/get-selected-products`,
                { ids: cartIds }
            );
            setCartProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to load cart products");
        }
    };

    const makePayment = async () => {
        if (cartProducts.length === 0) {
            alert("Your cart is empty");
            return;
        }

        setIsProcessingPayment(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/payment/makepayment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userId,
                    products: cartProducts.map(product => ({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        images: product.images && product.images.length > 0
                            ? [product.images[0]]
                            : ["https://www.dewnor.com/wp-content/uploads/2021/01/cropped-cropped-logo.png"]
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.sessionId) {
                throw new Error(data.message || "Failed to create payment session");
            }

            // Redirect to Stripe Checkout
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
            const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment failed: " + error.message);
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
                {},
                { withCredentials: true }
            );
            localStorage.clear();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || error.message);
            alert("Logout failed: " + (error.response?.data?.message || error.message));
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/product/remove-from-cart`,
                { productId, userId }
            );

            // Update the cart products immediately for better UX
            setCartProducts((prev) => prev.filter((product) => product._id !== productId));

            // Also update the userData to reflect the current cart state
            if (userData) {
                setUserData({
                    ...userData,
                    cart: userData.cart.filter(id => id !== productId)
                });
            }
        } catch (error) {
            console.error("Error removing product:", error.response?.data?.message || error.message);
            alert("Failed to remove product: " + (error.response?.data?.message || error.message));
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FaSpinner className="animate-spin text-blue-600 text-4xl" />
                <p className="ml-2 text-lg">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto text-center mt-10 p-6 bg-red-50 rounded-lg border border-red-200">
                <h2 className="text-2xl font-bold text-red-700 mb-2">Error Loading Profile</h2>
                <p className="text-red-600">{error}</p>
                <button
                    onClick={() => navigate("/login")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Return to Login
                </button>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="max-w-4xl mx-auto text-center mt-10 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h2 className="text-2xl font-bold text-yellow-700 mb-2">Session Expired</h2>
                <p className="text-yellow-600">Please log in again to access your profile.</p>
                <button
                    onClick={() => navigate("/login")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 ease-in-out my-8">
            {/* User Info Section */}

            <div className="flex flex-col md:flex-row items-center md:space-x-8 border-b pb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg mb-4 md:mb-0">
                    {userData?.name?.charAt(0)?.toUpperCase() || <FaUserCircle />}
                </div>
                <div className="text-center md:text-left flex-grow">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{userData.name}</h2>
                    <p className="text-lg text-gray-500 capitalize">{userData.role}</p>
                    <p className="text-sm text-gray-400 mt-1">{userData.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-4 md:mt-0 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition"
                >
                    Logout
                </button>
            </div>

            {/* Cart Section */}
            <div className="mt-8 space-y-6">
                <div className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <FaShoppingCart className="mr-2 text-blue-600" />
                        Your Cart
                        <span className="ml-auto text-lg font-normal text-gray-600">
                            {cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'}
                        </span>
                    </h3>

                    {cartProducts.length > 0 ? (
                        <>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cartProducts.map((product) => (
                                    <div key={product._id} className="border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow overflow-hidden">
                                        <div className="h-48 overflow-hidden relative">
                                            <img
                                                src={product.images?.[0] || "https://www.dewnor.com/wp-content/uploads/2021/01/cropped-cropped-logo.png"}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 h-12">{product.name}</h3>
                                            <span className="text-green-600 font-bold text-lg block mt-2">{product.price} د.إ</span>
                                            <button
                                                onClick={() => removeFromCart(product._id)}
                                                className="mt-4 w-full bg-red-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                                            >
                                                <FaTrash className="mr-2" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 border-t pt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xl font-semibold text-gray-800">Total:</span>
                                    <span className="text-2xl font-bold text-green-600">{cartTotal} د.إ</span>
                                </div>

                                <button
                                    onClick={makePayment}
                                    disabled={isProcessingPayment}
                                    className={`w-full ${isProcessingPayment ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} 
                                    text-white font-medium text-lg px-5 py-3 rounded-lg transition-colors flex items-center justify-center`}
                                >
                                    {isProcessingPayment ? (
                                        <>
                                            <FaSpinner className="animate-spin mr-2" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Proceed to Checkout"
                                    )}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="mt-6 text-center py-10 bg-gray-100 rounded-xl">
                            <FaShoppingCart className="mx-auto text-gray-400 text-5xl mb-4" />
                            <p className="text-gray-500 text-lg">Your cart is empty.</p>
                            <button
                                onClick={() => navigate("/products")}
                                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Browse Products
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;