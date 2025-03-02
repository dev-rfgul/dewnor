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
//             const response = await fetch("http://localhost:3000/makePayment", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     products: cartProducts.map(product => ({
//                         _id: product.id,
//                         name: product.name,
//                         price: product.price,
//                         quantity: product.quantity,
//                         image: (product.images?.length > 0 && isValidUrl(product.images[0])) 
//                             ? product.images[0] 
//                             : "https://rfgul.live/images/banner2.jpeg",
//                     }))
//                 }),
//             });
    
//             const data = await response.json();
    
//             if (!data.sessionId) {
//                 throw new Error("No sessionId received from backend");
//             }
    
//             const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
//             await stripe.redirectToCheckout({ sessionId: data.sessionId });
//         } catch (error) {
//             console.error("Payment Error:", error);
//         }
//     };
    
//     // Function to check if a URL is valid
//     const isValidUrl = (url) => {
//         try {
//             new URL(url);
//             return true;
//         } catch (_) {
//             return false;
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


import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";


const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [product, setProduct] = useState(null); // Ensure product is defined

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
    }, [userId]);

    const fetchCartProducts = async (cartIds) => {
        if (!Array.isArray(cartIds) || cartIds.length === 0) return;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/product/get-selected-products`,
                { ids: cartIds }
            );
            setCartProducts(response.data);
            setProduct(response.data[0]); // Set first product as default for payment
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    console.log(cartProducts)

    const makePayment = async () => {
        try {
            const response = await fetch("http://localhost:3000/makePayment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    products: cartProducts.map(product => ({
                        _id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images.length > 0 ? product.images[0] : "" // Use the first image
                    }))
                }),
            });

            const data = await response.json();

            if (!data.sessionId) {
                throw new Error("No sessionId received from backend");
            }

            // Redirect to Stripe Checkout
            const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`);
            await stripe.redirectToCheckout({ sessionId: data.sessionId });
        } catch (error) {
            console.error("Payment Error:", error);
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
                { productId, userId }
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
            <div className="flex items-center space-x-8 border-b pb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                    {userData?.name?.charAt(0)}
                </div>
                <div>
                    <h2 className="text-4xl font-bold text-gray-800">{userData.name}</h2>
                    <p className="text-lg text-gray-500 capitalize">{userData.role}</p>
                    <p className="text-sm text-gray-400 mt-1">{userData.email}</p>
                </div>
                <button onClick={handleLogout} className="text-red-500 font-semibold hover:text-red-600 transition">
                    Logout
                </button>
            </div>

            <div className="mt-8 space-y-8">
                <div className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <FaShoppingCart className="mr-2 text-blue-600" />
                        Your Cart
                    </h3>
                    <div className="mt-6 space-y-6">
                        {cartProducts.length > 0 ? (
                            cartProducts.map((product) => (
                                <div key={product._id} className="border rounded-xl shadow-md bg-white">
                                    <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
                                        <span className="text-green-600 font-bold text-lg">{product.price} د.إ</span>
                                        <button onClick={() => removeFromCart(product._id)} className="mt-4 w-full bg-red-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-red-700">
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

                <button
                    onClick={makePayment}
                    className="w-full bg-green-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-green-700"
                >
                    Pay Now
                </button>

            </div>
        </div>
    );
};

export default UserProfile;
