// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";



// import React, { useEffect, useState } from "react";
// import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import StripeCheckout from 'react-stripe-checkout';

// const UserProfile = () => {
//     const [userData, setUserData] = useState(null);
//     const [cartProducts, setCartProducts] = useState([]);
//     const [userId, setUserId] = useState(null);
//     // const [cartTotal, setCartTotal] = useState(0);
//     const [product, setProduct] = useState()


//     const navigate = useNavigate();
//     const stripe = useStripe();
//     const elements = useElements();


//     const makePayment = async () => {
//         if (!stripe || !elements) return;

//         const cardElement = elements.getElement(CardElement);

//         // Create a payment method instead of a token
//         const { paymentMethod, error } = await stripe.createPaymentMethod({
//             type: "card",
//             card: cardElement,
//         });

//         if (error) {
//             console.error("Error creating payment method:", error);
//             return;
//         }

//         const body = {
//             paymentMethodId: paymentMethod.id,
//             product
//         };

//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/payment`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(body)
//             });

//             const data = await response.json();
//             console.log("Payment Response:", data);

//             if (!response.ok) {
//                 console.error("Payment Error:", data);
//             } else {
//                 alert("Payment Successful!");
//             }
//         } catch (error) {
//             console.error("Fetch Error:", error);
//         }
//     };




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
//     }, [userId]); // Trigger when `userId` is set

//     const fetchCartProducts = async (cartIds) => {
//         if (!Array.isArray(cartIds) || cartIds.length === 0) return;

//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/product/get-selected-products`,
//                 { ids: cartIds }
//             );
//             setCartProducts(response.data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
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
//                 {
//                     productId,
//                     userId
//                 }
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
//                             cartProducts.map((product) => (
//                                 <div className="border rounded-xl shadow-md overflow-hidden bg-white hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300">
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
//                                         <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
//                                         <div className="flex items-center gap-2 mt-2">
//                                             <span className="text-gray-400 line-through text-sm">
//                                                 {product.originalPrice} د.إ
//                                             </span>
//                                             <span className="text-green-600 font-bold text-lg">{product.price} د.إ</span>
//                                         </div>
//                                         <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
//                                             <span className="font-medium">{product.tag}</span>
//                                             <span className="font-medium">| SKU: {product.SKU}</span>
//                                         </div>
//                                         <button
//                                             onClick={() => removeFromCart(product._id)}
//                                             className="mt-4 w-full bg-red-600 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all"
//                                         >
//                                             Remove From Cart
//                                         </button>
//                                         <button
//                                             onClick={() => alert("Payment gateway not implemented yet.")}
//                                             className="mt-4 w-full bg-green-200 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
//                                         >
//                                             Pay Now
//                                         </button>
//                                         <StripeCheckout
//                                             stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
//                                             token={makePayment} // Pass function reference
//                                             name="Buy Now"
//                                             amount={product?.price * 100} // Convert to cents
//                                             currency="AED"
//                                             shippingAddress
//                                             billingAddress
//                                         >
//                                             <button className="mt-4 w-full bg-green-600 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all">
//                                                 Pay Now
//                                             </button>
//                                         </StripeCheckout>

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
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [product, setProduct] = useState(null);

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    // Fetch user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser?.user?.id || null);
        }
    }, []);

    // Fetch user profile and cart products
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
    }, [userId]);

    // Fetch cart products
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

    // Handle logout
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

    // Remove product from cart
    const removeFromCart = async (productId) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/product/remove-from-cart`,
                { productId, userId }
            );
            setCartProducts((prev) => prev.filter((product) => product._id !== productId));
        } catch (error) {
            console.error("Error:", error.response?.data?.message || error.message);
        }
    };

    // Stripe Payment
    const makePayment = async (token) => {
        console.log("make function called")
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/payment`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tokenId: token.id,
                        product,
                    }),
                }
            );
            const data = await response.json();
            if (data.success) {
                alert("Payment Successful!");
            } else {
                console.error("Payment failed:", data);
            }
        } catch (error) {
            console.error("Payment Error:", error);
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
                                <div
                                    key={product._id}
                                    className="border rounded-xl shadow-md overflow-hidden bg-white hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300"
                                >
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
                                        <button
                                            onClick={() => removeFromCart(product._id)}
                                            className="mt-4 w-full bg-red-600 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all"
                                        >
                                            Remove From Cart
                                        </button>
                                        <StripeCheckout 
                                            stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
                                            token={makePayment}
                                            name="Buy Now"
                                            amount={product.price * 100} 
                                            currency="AED"
                                            shippingAddress
                                            billingAddress
                                        >
                                            <button className="mt-4 w-full bg-green-600 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all">
                                                Pay Now
                                            </button>
                                        </StripeCheckout>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No items in cart.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
