
// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';

// const ProductDisplay = () => {
//     const { id } = useParams(); // Get product ID from URL  
//     const [product, setProduct] = useState(null);
//     const [mainImage, setMainImage] = useState("");
//     const [quantity, setQuantity] = useState('1')



//     const handleQuantityChange = (e) => {
//         const newQuantity = Number(e.target.value);
//         if (newQuantity <= product.stock) {
//             setQuantity(newQuantity);
//         }
//     };

//     useEffect(() => {
//         const fetchProduct = async () => {
//             if (!id) {
//                 console.error("No product ID found in URL");
//                 return;
//             }

//             console.log("Fetching product with ID:", id);

//             try {
//                 const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-product/${id}`);
//                 const data = await response.json();

//                 console.log("Fetched data:", data);

//                 if (data.product) {
//                     setProduct(data.product);
//                     if (data.product.images && data.product.images.length > 0) {
//                         setMainImage(data.product.images[0]);
//                     } else {
//                         console.warn("Product has no images");
//                     }
//                 } else {
//                     console.error("Product not found");
//                 }
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//             }
//         };

//         fetchProduct();
//     }, [id]);

//     const handleImageClick = (img) => {
//         setMainImage(img);
//     };

//     if (!product) return (
//         <div className="max-w-5xl mx-auto bg-gray-100 p-6 md:p-8 rounded-lg">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//                 {/* Product Image Skeleton */}
//                 <div className="flex flex-col items-center space-y-4">
//                     <div className="relative w-full max-w-[250px] sm:max-w-[300px] h-64 bg-gray-300 animate-pulse rounded-lg"></div>

//                     {/* Image Thumbnails */}
//                     <div className="flex flex-wrap justify-center gap-3 mt-4">
//                         {Array(4).fill("").map((_, index) => (
//                             <div
//                                 key={index}
//                                 className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 animate-pulse rounded-lg"
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Product Info Skeleton */}
//                 <div className="space-y-6">
//                     <div className="bg-gray-300 animate-pulse w-32 h-6 mb-4 rounded-lg"></div>
//                     <div className="bg-gray-300 animate-pulse w-40 h-6 mb-4 rounded-lg"></div>
//                     <div className="bg-gray-300 animate-pulse w-24 h-6 mb-4 rounded-lg"></div>
//                     <div className="bg-gray-300 animate-pulse w-full h-8 mb-6 rounded-lg"></div>

//                     {/* Price Skeleton */}
//                     <div className="bg-gray-300 animate-pulse w-24 h-8 rounded-lg"></div>

//                     {/* Add to Cart Button Skeleton */}
//                     <div className="bg-gray-300 animate-pulse w-36 h-10 mt-4 rounded-lg"></div>
//                 </div>
//             </div>
//         </div>

//     );

//     return (
//         <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Product Image Section */}
//                 <div className="relative group overflow-hidden">
//                     <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg">
//                         <img
//                             src={mainImage}
//                             alt={product.name}
//                             className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
//                         />
//                     </div>
//                     {/* Thumbnails */}
//                     <div className="flex gap-3 mt-4 justify-center">
//                         {product.images.map((img, index) => (
//                             <img
//                                 key={index}
//                                 src={img}
//                                 alt={`Thumbnail ${index + 1}`}
//                                 className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
//                                 onClick={() => handleImageClick(img)}
//                             />
//                         ))}

//                     </div>


//                 </div>

//                 {/* Product Details Section */}
//                 <div className="flex flex-col justify-center space-y-4">
//                     <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
//                     <p className="text-gray-600 text-md">Category: <span className="font-medium">{product.category}</span></p>
//                     <p className="text-gray-600 text-md">SKU: <span className="font-medium">{product.SKU}</span></p>
//                     <p className="text-green-600 text-lg">Price: <span className="font-medium">{product.price}</span></p>
//                     {/* <p className="text-gray-700">{product.description}</p> */}


//                     <p className={`text-lg font-medium ${product.stock > 0 ? "text-gray-600" : "text-red-500"}`}>
//                         {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
//                     </p>
//                     {/* Colors */}
//                     <div className="flex items-center gap-2">
//                         <span className="text-gray-600">Available Colors:</span>
//                         <div className="flex gap-2">
//                             {product.color.map((color, index) => (
//                                 <span
//                                     key={index}
//                                     className="block w-6 h-6 rounded-full border border-gray-300"
//                                     style={{ backgroundColor: color }}
//                                 ></span>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex items-center gap-3 mt-4">
//                         <span className="text-gray-600">Quantity:</span>
//                         <input
//                             type="number"
//                             min="1"
//                             value={quantity}
//                             onChange={handleQuantityChange}
//                             className="px-2 py-1 text-sm rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-20"
//                         />

//                         <span className="text-sm text-gray-600">Max: {product.stock}</span>
//                     </div>
//                     <div className="flex gap-4 mt-4">

//                         <button className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition-all duration-300">
//                             Add to Cart
//                         </button>
//                         <button className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition-all duration-300">
//                             Buy Now
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div className="text-gray-600 text-md mt-10">
//                 <p className="text-2xl font-bold text-gray-900 mb-4">Description:</p>

//                 <ul className="list-disc pl-5 space-y-3 text-gray-700">
//                     {product.description
//                         .split(".")
//                         .filter(sentence => sentence.trim() !== "") // Remove empty strings
//                         .map((sentence, index) => (
//                             <li
//                                 key={index}
//                                 className="text-lg transition-all duration-300 hover:text-blue-500 hover:underline"
//                             >
//                                 {sentence.trim()}.
//                             </li>
//                         ))}
//                 </ul>
//             </div>

//         </div>
//     );

// };

// export default ProductDisplay;

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

import AlertMessage from "./Alert";

const ProductDisplay = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [userId, setUserId] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [globalAlert, setGlobalAlert] = useState({ message: "", type: "" });

    // Get user ID from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserId(parsedUser.user.id);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    const handleQuantityChange = (e) => {
        const newQuantity = Number(e.target.value);
        if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
            setQuantity(newQuantity);
        }
    };

    // Increment and decrement quantity
    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError("No product ID found in URL");
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-product/${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data.product) {
                    setProduct(data.product);
                    if (data.product.images && data.product.images.length > 0) {
                        setMainImage(data.product.images[0]);
                    }
                    if (data.product.color && data.product.color.length > 0) {
                        setSelectedColor(data.product.color[0]);
                    }

                    // Fetch related products
                    // fetchRelatedProducts(data.product.category);
                } else {
                    setError("Product not found");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                setError("Failed to load product. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        console.log(product)

        fetchProduct();
    }, [id]);

    // Fetch related products
    // const fetchRelatedProducts = async (categoryId) => {
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/related-products?category=${categoryId}&exclude=${id}&limit=4`);
    //         if (response.ok) {
    //             const data = await response.json();
    //             setRelatedProducts(data);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching related products:", error);
    //     }
    // };

    const handleImageClick = useCallback((img) => {
        setMainImage(img);
    }, []);

    // Add to cart function
    const addToCart = async (productId) => {
        if (!userId) {
            setGlobalAlert({
                message: "Please log in to add items to your cart",
                type: "warning"
            });
            throw new Error("User not logged in");
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/add-to-cart`, {
                productId,
                userId,
            });

            setGlobalAlert({ message: response.data.message, type: "success" });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setGlobalAlert({
                message: "Error adding product to cart: " + errorMessage,
                type: "error",
            });
            throw error;
        }
    };

    // Buy now function
    const buyNow = async () => {
        try {
            await addToCart();
            navigate("/checkout");
        } catch (error) {
            toast.error("Error processing purchase");
        }
    };

    // Loading skeleton
    if (loading) return (
        <div className="max-w-5xl mx-auto bg-gray-100 p-6 md:p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Product Image Skeleton */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-full max-w-[250px] sm:max-w-[300px] h-64 bg-gray-300 animate-pulse rounded-lg"></div>

                    {/* Image Thumbnails */}
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {Array(4).fill("").map((_, index) => (
                            <div
                                key={index}
                                className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 animate-pulse rounded-lg"
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info Skeleton */}
                <div className="space-y-6">
                    <div className="bg-gray-300 animate-pulse w-32 h-6 mb-4 rounded-lg"></div>
                    <div className="bg-gray-300 animate-pulse w-40 h-6 mb-4 rounded-lg"></div>
                    <div className="bg-gray-300 animate-pulse w-24 h-6 mb-4 rounded-lg"></div>
                    <div className="bg-gray-300 animate-pulse w-full h-8 mb-6 rounded-lg"></div>

                    {/* Price Skeleton */}
                    <div className="bg-gray-300 animate-pulse w-24 h-8 rounded-lg"></div>

                    {/* Add to Cart Button Skeleton */}
                    <div className="bg-gray-300 animate-pulse w-36 h-10 mt-4 rounded-lg"></div>
                </div>
            </div>
        </div>
    );

    // Error state
    if (error) return (
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
            <div className="text-center py-10">
                <div className="text-red-500 text-5xl mb-4">
                    <i className="fas fa-exclamation-circle"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    Browse Products
                </button>
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
            {/* Breadcrumbs */}

            <div className="flex items-center text-sm text-gray-500 mb-6">
                <button onClick={() => navigate('/')} className="hover:text-blue-500">Home</button>
                <span className="mx-2">/</span>
                <button onClick={() => navigate('/products')} className="hover:text-blue-500">Products</button>
                <span className="mx-2">/</span>
                <span className="text-gray-800 font-medium">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Global Alert */}
                {globalAlert.message && (
                    <div className="mb-6">
                        <AlertMessage
                            message={globalAlert.message}
                            type={globalAlert.type}
                            onClose={() => setGlobalAlert({ message: "", type: "" })}
                        />
                    </div>
                )}
                {/* Product Image Section */}
                <div className="relative group overflow-hidden">
                    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-80 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Discount Badge */}
                        {product.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                -{product.discount}%
                            </div>
                        )}

                        {/* Out of Stock Badge */}
                        {product.stock <= 0 && (
                            <div className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                Out of Stock
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    <div className="flex flex-wrap gap-3 mt-4 justify-center">
                        {product.images.map((img, index) => (
                            <div
                                key={index}
                                className={`w-16 h-16 rounded-lg cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-gray-200'} overflow-hidden hover:border-blue-500 transition-all duration-300`}
                                onClick={() => handleImageClick(img)}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="flex flex-col justify-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>


                    <p className="text-gray-600 text-md">Category: <span className="font-medium">{product.category}</span></p>
                    <p className="text-gray-600 text-md">SKU: <span className="font-medium">{product.SKU}</span></p>

                    {/* Price with discount calculation */}

                    <div className="flex items-center gap-2">
                        {product.originalPrice > product.price && (
                            <span className="text-gray-400 line-through text-lg">{product.originalPrice} د.إ</span>
                        )}
                        <span className="text-green-600 font-bold text-xl">{product.price} د.إ</span>

                    </div>
        
                    {/* Stock Status */}
                    <p className={`text-lg font-medium ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-orange-500" : "text-red-500"}`}>
                        {product.stock > 10 ? `In Stock: ${product.stock} available` : product.stock > 0 ? `Low Stock: ${product.stock} left` : "Out of Stock"}
                    </p>
                    {/* <p>{product.stock}</p>
                    <p>{typeof(product.stock)}</p> */}


                    {/* Colors */}
                    {product.color && product.color.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-gray-600">Available Colors:</p>
                            <div className="flex gap-2">
                                {product.color.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : 'border border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                        title={color}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    {product.stock > 0 && (
                        <div className="space-y-2">
                            <p className="text-gray-600">Quantity:</p>
                            <div className="flex items-center">
                                <button
                                    onClick={decrementQuantity}
                                    disabled={quantity <= 1}
                                    className={`w-10 h-10 rounded-l-lg flex items-center justify-center border border-gray-300 ${quantity <= 1 ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'}`}
                                >
                                    <span className="text-xl">−</span>
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="w-16 h-10 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-0"
                                />
                                <button
                                    onClick={incrementQuantity}
                                    disabled={quantity >= product.stock}
                                    className={`w-10 h-10 rounded-r-lg flex items-center justify-center border border-gray-300 ${quantity >= product.stock ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'}`}
                                >
                                    <span className="text-xl">+</span>
                                </button>
                                <span className="ml-3 text-sm text-gray-500">
                                    ({product.stock} available)
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => addToCart(product._id)}
                            disabled={product.stock <= 0}
                            className={`flex-1 px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 ${product.stock <= 0
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-gray-800 text-white hover:bg-gray-700 active:scale-95'
                                }`}
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={buyNow}
                            disabled={product.stock <= 0}
                            className={`flex-1 px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 ${product.stock <= 0
                                ? 'bg-blue-300 cursor-not-allowed text-white'
                                : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
                                }`}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-12 border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>

                {product.description ? (
                    <div className="prose prose-blue max-w-none">
                        <ul className="list-disc pl-5 space-y-3 text-gray-700">
                            {product.description
                                .split(".")
                                .filter(sentence => sentence.trim() !== "")
                                .map((sentence, index) => (
                                    <li
                                        key={index}
                                        className="text-lg"
                                    >
                                        {sentence.trim()}.
                                    </li>
                                ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No description available for this product.</p>
                )}
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-12 border-t pt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedProducts.map(relatedProduct => (
                            <div
                                key={relatedProduct._id}
                                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                                onClick={() => navigate(`/product/${relatedProduct._id}`)}
                            >
                                <div className="h-40 overflow-hidden">
                                    <img
                                        src={relatedProduct.images[0]}
                                        alt={relatedProduct.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-medium text-gray-800 line-clamp-1">{relatedProduct.name}</h3>
                                    <p className="text-green-600 font-bold mt-1">{relatedProduct.price} د.إ</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDisplay;