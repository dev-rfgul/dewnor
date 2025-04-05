// import React, { useEffect, useState, useMemo } from "react";
// import { FaShoppingCart, FaUserCircle, FaTrash, FaSpinner } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

// const UserProfile = () => {
//     const [userData, setUserData] = useState(null);
//     const [cartProducts, setCartProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//     const [error, setError] = useState(null);
//     const [userId, setUserId] = useState(null);

//     const navigate = useNavigate();

//     // Calculate cart total
//     const cartTotal = useMemo(() => {
//         return cartProducts.reduce((sum, product) => {
//             const quantity = product.quantity || 1;
//             return sum + (Number(product.price) * quantity);
//         }, 0).toFixed(2);
//     }, [cartProducts]);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const storedUser = localStorage.getItem("user");
//                 if (!storedUser) {
//                     throw new Error("No user found in localStorage");
//                 }

//                 const parsedUser = JSON.parse(storedUser);
//                 setUserId(parsedUser.user.id);

//                 const response = await fetch(
//                     `${import.meta.env.VITE_BACKEND_URL}/user/get-user/${parsedUser.user.id}`
//                 );

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch user data");
//                 }

//                 const data = await response.json();
//                 if (data.user.role === "admin") navigate("/admin")
//                 console.log(data.user)
//                 setUserData(data.user);

//                 if (data.user.cart && data.user.cart.length > 0) {
//                     await fetchCartProducts(data.user.cart);
//                 }
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 setError(error.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);

//     const fetchCartProducts = async (cartIds) => {
//         if (!Array.isArray(cartIds) || cartIds.length === 0) {
//             setCartProducts([]);
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/product/get-selected-products`,
//                 { ids: cartIds }
//             );

//             // Ensure each product has a quantity property
//             const productsWithQuantity = response.data.map(product => ({
//                 ...product,
//                 quantity: product.quantity || 1
//             }));

//             setCartProducts(productsWithQuantity);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setError("Failed to load cart products");
//         }
//     };

//     const makePayment = async () => {
//         if (cartProducts.length === 0) {
//             alert("Your cart is empty");
//             return;
//         }

//         setIsProcessingPayment(true);
//         const requestBody = {
//             userId: userId,
//             products: cartProducts.map(product => ({
//                 _id: product._id,
//                 name: product.name,
//                 price: product.price,
//                 quantity: product.quantity,
//                 images: product.images && product.images.length > 0
//                     ? [product.images[0]]
//                     : ["https://www.dewnor.com/wp-content/uploads/2021/01/cropped-cropped-logo.png"]
//             })),
//         };

//         // Log the request body
//         console.log("Request Body:", JSON.stringify(requestBody, null, 2));

//         try {

//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/payment/makepayment`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     userId: userId,
//                     products: cartProducts.map(product => ({
//                         _id: product._id,
//                         name: product.name,
//                         price: product.price,
//                         quantity: product.quantity || 1,
//                         images: product.images && product.images.length > 0
//                             ? [product.images[0]]
//                             : ["https://www.dewnor.com/wp-content/uploads/2021/01/cropped-cropped-logo.png"]
//                     })),
//                 }),
//             });

//             const data = await response.json();

//             if (!response.ok || !data.sessionId) {
//                 throw new Error(data.message || "Failed to create payment session");
//             }

//             // Redirect to Stripe Checkout
//             const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
//             const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

//             if (error) {
//                 throw new Error(error.message);
//             }
//         } catch (error) {
//             console.error("Payment Error:", error);
//             alert("Payment failed: " + error.message);
//         } finally {
//             setIsProcessingPayment(false);
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
//                 {},
//                 { withCredentials: true }
//             );
//             localStorage.clear();
//             navigate("/login");
//         } catch (error) {
//             console.error("Logout failed:", error.response?.data?.message || error.message);
//             alert("Logout failed: " + (error.response?.data?.message || error.message));
//         }
//     };

//     const removeFromCart = async (productId) => {
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/product/remove-from-cart`,
//                 { productId, userId }
//             );

//             // Update the cart products immediately for better UX
//             setCartProducts((prev) => prev.filter((product) => product._id !== productId));

//             // Also update the userData to reflect the current cart state
//             if (userData) {
//                 setUserData({
//                     ...userData,
//                     cart: userData.cart.filter(id => id !== productId)
//                 });
//             }
//         } catch (error) {
//             console.error("Error removing product:", error.response?.data?.message || error.message);
//             alert("Failed to remove product: " + (error.response?.data?.message || error.message));
//         }
//     };

//     // Fixed quantity management functions
//     const updateProductQuantity = (productId, change) => {
//         setCartProducts(prevProducts =>
//             prevProducts.map(product => {
//                 if (product._id === productId) {
//                     const newQuantity = Math.max(1, (product.quantity || 1) + change);
//                     return { ...product, quantity: newQuantity };
//                 }
//                 return product;
//             })
//         );
//     };

//     const handleIncrease = (productId) => {
//         updateProductQuantity(productId, 1); // Increase quantity by 1
//     };

//     const handleDecrease = (productId) => {
//         updateProductQuantity(productId, -1); // Decrease quantity by 1
//     };

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <FaSpinner className="animate-spin text-blue-600 text-4xl" />
//                 <p className="ml-2 text-lg">Loading profile...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="max-w-4xl mx-auto text-center mt-10 p-6 bg-red-50 rounded-lg border border-red-200">
//                 <h2 className="text-2xl font-bold text-red-700 mb-2">Error Loading Profile</h2>
//                 <p className="text-red-600">{error}</p>
//                 <button
//                     onClick={() => navigate("/login")}
//                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                     Return to Login
//                 </button>
//             </div>
//         );
//     }

//     if (!userData) {
//         return (
//             <div className="max-w-4xl mx-auto text-center mt-10 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
//                 <h2 className="text-2xl font-bold text-yellow-700 mb-2">Session Expired</h2>
//                 <p className="text-yellow-600">Please log in again to access your profile.</p>
//                 <button
//                     onClick={() => navigate("/login")}
//                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                     Go to Login
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 ease-in-out my-8">
//             {/* User Info Section */}

//             <div className="flex flex-col md:flex-row items-center md:space-x-8 border-b pb-6">
//                 <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg mb-4 md:mb-0">
//                     {userData?.name?.charAt(0)?.toUpperCase() || <FaUserCircle />}
//                 </div>
//                 <div className="text-center md:text-left flex-grow">
//                     <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{userData.name}</h2>
//                     <p className="text-lg text-gray-500 capitalize">{userData.role}</p>
//                     <p className="text-sm text-gray-400 mt-1">{userData.email}</p>
//                 </div>
//                 <button
//                     onClick={handleLogout}
//                     className="mt-4 md:mt-0 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition"
//                 >
//                     Logout
//                 </button>
//             </div>

//             {/* Cart Section */}
//             <div className="mt-8 space-y-6">
//                 <div className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//                     <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
//                         <FaShoppingCart className="mr-2 text-blue-600" />
//                         Your Cart
//                         <span className="ml-auto text-lg font-normal text-gray-600">
//                             {cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'}
//                         </span>
//                     </h3>

//                     {cartProducts.length > 0 ? (
//                         <>
//                             <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {cartProducts.map((product) => (
//                                     <div key={product._id} className="border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow overflow-hidden">
//                                         <div className="h-48 overflow-hidden relative">
//                                             <img
//                                                 src={product.images?.[0] || "https://www.dewnor.com/wp-content/uploads/2021/01/cropped-cropped-logo.png"}
//                                                 alt={product.name}
//                                                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                                             />
//                                         </div>

//                                         <div className="p-4">
//                                             <h3 className="text-base font-semibold text-gray-900 line-clamp-2 h-12">{product.name}</h3>
//                                             <span className="text-green-600 font-bold text-lg block mt-2">{product.price} د.إ</span>

//                                             {/* Quantity control buttons */}
//                                             <div className="mt-4 flex items-center justify-between">
//                                                 <button
//                                                     onClick={() => handleDecrease(product._id)}
//                                                     className="w-8 h-8 bg-gray-200 text-xl rounded-full flex items-center justify-center hover:bg-gray-300"
//                                                 >
//                                                     -
//                                                 </button>
//                                                 <span className="text-lg font-semibold">{product.quantity || 1}</span>
//                                                 <button
//                                                     onClick={() => handleIncrease(product._id)}
//                                                     className="w-8 h-8 bg-gray-200 text-xl rounded-full flex items-center justify-center hover:bg-gray-300"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>

//                                             {/* Remove button */}
//                                             <button
//                                                 onClick={() => removeFromCart(product._id)}
//                                                 className="mt-4 w-full bg-red-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
//                                             >
//                                                 <FaTrash className="mr-2" /> Remove
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="mt-8 border-t pt-6">
//                                 <div className="flex justify-between items-center mb-6">
//                                     <span className="text-xl font-semibold text-gray-800">Total:</span>
//                                     <span className="text-2xl font-bold text-green-600">{cartTotal} د.إ</span>
//                                 </div>

//                                 <button
//                                     onClick={makePayment}
//                                     disabled={isProcessingPayment}
//                                     className={`w-full ${isProcessingPayment ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} 
//                                     text-white font-medium text-lg px-5 py-3 rounded-lg transition-colors flex items-center justify-center`}
//                                 >
//                                     {isProcessingPayment ? (
//                                         <>
//                                             <FaSpinner className="animate-spin mr-2" />
//                                             Processing...
//                                         </>
//                                     ) : (
//                                         "Proceed to Checkout"
//                                     )}
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <div className="mt-6 text-center py-10 bg-gray-100 rounded-xl">
//                             <FaShoppingCart className="mx-auto text-gray-400 text-5xl mb-4" />
//                             <p className="text-gray-500 text-lg">Your cart is empty.</p>
//                             <button
//                                 onClick={() => navigate("/products")}
//                                 className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                             >
//                                 Browse Products
//                             </button>
//                         </div>
//                     )}

//                     {userData.orders && userData.orders.length > 0 ? (
//                         <>
//                             <h1>Orders available = {userData.orders.length}</h1>
//                             <ul>
//                                 {userData.orders.map((order, index) => (
//                                     <li key={order._id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
//                                         <p><strong>Order ID:</strong> {order._id}</p>
//                                         <p><strong>Customer Email:</strong> {order.customer_email}</p>
//                                         <p><strong>Status:</strong> {order.payment_status}</p>
//                                         <p><strong>Order Status:</strong> {order.orderStatus}</p>
//                                         <p><strong>Amount:</strong> AED {order.amount_total / 100}</p>
//                                         <p><strong>Payment Intent:</strong> {order.payment_intent}</p>
//                                         <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
//                                         <p><strong>Billing Name:</strong> {order.billing_details?.name}</p>
//                                         <p><strong>Billing Email:</strong> {order.billing_details?.email}</p>

//                                         <h4>Products:</h4>
//                                         <ul>
//                                             {order.line_items?.map((item, i) => (
//                                                 <li key={i}>
//                                                     <p>• <strong>{item.description}</strong></p>
//                                                     <p>Amount: AED {item.amount_total / 100}</p>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </>
//                     ) : (
//                         <div>No orders yet</div>
//                     )}


//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FaShoppingCart, FaUserCircle, FaTrash, FaSpinner, FaHistory, FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Component for the profile header
const ProfileHeader = ({ userData, handleLogout }) => (
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
);

// Component for product card in cart
const CartProductCard = ({ product, handleIncrease, handleDecrease, removeFromCart }) => (
    <div className="border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow overflow-hidden">
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

            {/* Quantity control buttons */}
            <div className="mt-4 flex items-center justify-between">
                <button
                    onClick={() => handleDecrease(product._id)}
                    className="w-8 h-8 bg-gray-200 text-xl rounded-full flex items-center justify-center hover:bg-gray-300"
                    aria-label="Decrease quantity"
                >
                    <FaMinus className="text-xs" />
                </button>
                <span className="text-lg font-semibold">{product.quantity || 1}</span>
                <button
                    onClick={() => handleIncrease(product._id)}
                    className="w-8 h-8 bg-gray-200 text-xl rounded-full flex items-center justify-center hover:bg-gray-300"
                    aria-label="Increase quantity"
                >
                    <FaPlus className="text-xs" />
                </button>
            </div>

            {/* Remove button */}
            <button
                onClick={() => removeFromCart(product._id)}
                className="mt-4 w-full bg-red-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
            >
                <FaTrash className="mr-2" /> Remove
            </button>
        </div>
    </div>
);

// Component for empty cart display
const EmptyCart = ({ navigate }) => (
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
);

// Component for checkout button
const CheckoutButton = ({ makePayment, isProcessingPayment, cartTotal }) => (
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
);

// Component for orders list
const OrdersList = ({ orders }) => (
    <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <FaHistory className="mr-2 text-blue-600" />
            Your Orders
            <span className="ml-auto text-lg font-normal text-gray-600">
                {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
        </h3>

        <div className="space-y-6">
            {orders.map((order) => (
                <div key={order._id} className="border rounded-xl shadow-md bg-white p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between flex-wrap gap-2 border-b pb-3 mb-3">
                        <div>
                            <p className="text-sm text-gray-500">Order ID: <span className="font-mono text-gray-700">{order._id.substring(0, 8)}...</span></p>
                            <p className="text-sm text-gray-500">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-green-600">AED {order.amount_total / 100}</p>
                            <span className={`inline-block rounded-full px-2 py-1 text-xs ${order.payment_status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                }`}>
                                {order.payment_status.toUpperCase()}
                            </span>
                            <span className="ml-2 inline-block rounded-full px-2 py-1 text-xs bg-blue-100 text-blue-800">
                                {order.orderStatus?.toUpperCase() || "PROCESSING"}
                            </span>
                        </div>
                    </div>

                    <details className="cursor-pointer">
                        <summary className="text-blue-600 font-semibold hover:text-blue-800">
                            View Order Details
                        </summary>
                        <div className="mt-4 pl-3 border-l-2 border-gray-200">
                            <p><strong>Billing Name:</strong> {order.billing_details?.name}</p>
                            <p><strong>Billing Email:</strong> {order.billing_details?.email}</p>

                            <h4 className="font-semibold mt-3 mb-2">Items:</h4>
                            <ul className="space-y-2">
                                {order.line_items?.map((item, i) => (
                                    <li key={i} className="bg-gray-50 p-2 rounded">
                                        <p className="font-medium">{item.description}</p>
                                        <p className="text-sm text-gray-600">Amount: AED {item.amount_total / 100}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>
                </div>
            ))}
        </div>
    </div>
);

// Loading and error state components
const LoadingState = () => (
    <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        <p className="ml-2 text-lg">Loading profile...</p>
    </div>
);

const ErrorState = ({ error, navigate }) => (
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

const NoUserState = ({ navigate }) => (
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

// Main UserProfile component
const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [activeTab, setActiveTab] = useState("cart"); // 'cart' or 'orders'

    const navigate = useNavigate();

    // Calculate cart total
    const cartTotal = useMemo(() => {
        return cartProducts.reduce((sum, product) => {
            const quantity = product.quantity || 1;
            return sum + (Number(product.price) * quantity);
        }, 0).toFixed(2);
    }, [cartProducts]);

    // Fetch user data
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
                if (data.user.role === "admin") {
                    navigate("/admin");
                    return;
                }

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
    }, [navigate]);

    // Fetch cart products
    const fetchCartProducts = useCallback(async (cartIds) => {
        if (!Array.isArray(cartIds) || cartIds.length === 0) {
            setCartProducts([]);
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/product/get-selected-products`,
                { ids: cartIds }
            );

            // Ensure each product has a quantity property
            const productsWithQuantity = response.data.map(product => ({
                ...product,
                quantity: product.quantity || 1
            }));

            setCartProducts(productsWithQuantity);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to load cart products");
        }
    }, []);

    // Handle payment checkout
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
                        quantity: product.quantity || 1,
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

    // Handle logout
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

    // Remove from cart
    const removeFromCart = useCallback(async (productId) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/product/remove-from-cart`,
                { productId, userId }
            );

            // Update the cart products immediately for better UX
            setCartProducts((prev) => prev.filter((product) => product._id !== productId));

            // Also update the userData to reflect the current cart state
            setUserData(prevUserData => {
                if (prevUserData) {
                    return {
                        ...prevUserData,
                        cart: prevUserData.cart.filter(id => id !== productId)
                    };
                }
                return prevUserData;
            });
        } catch (error) {
            console.error("Error removing product:", error.response?.data?.message || error.message);
            alert("Failed to remove product: " + (error.response?.data?.message || error.message));
        }
    }, [userId]);

    // Update product quantity
    const updateProductQuantity = useCallback((productId, change) => {
        setCartProducts(prevProducts =>
            prevProducts.map(product => {
                if (product._id === productId) {
                    const newQuantity = Math.max(1, (product.quantity || 1) + change);
                    return { ...product, quantity: newQuantity };
                }
                return product;
            })
        );
    }, []);

    const handleIncrease = useCallback((productId) => {
        updateProductQuantity(productId, 1);
    }, [updateProductQuantity]);

    const handleDecrease = useCallback((productId) => {
        updateProductQuantity(productId, -1);
    }, [updateProductQuantity]);

    // Loading state
    if (isLoading) {
        return <LoadingState />;
    }

    // Error state
    if (error) {
        return <ErrorState error={error} navigate={navigate} />;
    }

    // No user state
    if (!userData) {
        return <NoUserState navigate={navigate} />;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 ease-in-out my-8">
            {/* User Info Section */}
            <ProfileHeader userData={userData} handleLogout={handleLogout} />

            {/* Tabs for Cart and Orders */}
            <div className="mt-8 border-b">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveTab("cart")}
                        className={`pb-2 px-4 font-medium transition-colors ${activeTab === "cart"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        <FaShoppingCart className="inline mr-2" /> Cart
                    </button>
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`pb-2 px-4 font-medium transition-colors ${activeTab === "orders"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        <FaHistory className="inline mr-2" /> Orders
                    </button>
                </div>
            </div>

            {/* Content based on active tab */}
            <div className="mt-6">
                {activeTab === "cart" && (
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
                                        <CartProductCard
                                            key={product._id}
                                            product={product}
                                            handleIncrease={handleIncrease}
                                            handleDecrease={handleDecrease}
                                            removeFromCart={removeFromCart}
                                        />
                                    ))}
                                </div>
                                <CheckoutButton
                                    makePayment={makePayment}
                                    isProcessingPayment={isProcessingPayment}
                                    cartTotal={cartTotal}
                                />
                            </>
                        ) : (
                            <EmptyCart navigate={navigate} />
                        )}
                    </div>
                )}

                {activeTab === "orders" && (
                    <div className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        {userData.orders && userData.orders.length > 0 ? (
                            <OrdersList orders={userData.orders} />
                        ) : (
                            <div className="text-center py-10">
                                <FaHistory className="mx-auto text-gray-400 text-5xl mb-4" />
                                <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
                                <button
                                    onClick={() => setActiveTab("cart")}
                                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                                >
                                    Go to Cart <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;