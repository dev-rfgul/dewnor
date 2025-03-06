
// import React, { useState, useEffect, useCallback, memo } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AlertMessage from "./Alert";

// // Memoized ProductCard component to prevent unnecessary re-renders
// const ProductCard = memo(({ product, loading, onAddToCart }) => {
//     const [alert, setAlert] = useState({ message: "", type: "" });
//     const navigate = useNavigate();
    
//     const handleBuyNow = async (productId) => {
//         try {
//             await onAddToCart(productId);
//             navigate("/checkout");
//         } catch (error) {
//             setAlert({
//                 message: "Error processing purchase: " + (error.response?.data?.message || error.message),
//                 type: "error",
//             });
//         }
//     };

//     if (loading) {
//         return (
//             <div className="border rounded-xl shadow-lg overflow-hidden bg-white">
//                 <div className="relative">
//                     <div className="w-full h-48 bg-gray-300 animate-pulse" />
//                 </div>
//                 <div className="p-4">
//                     <div className="w-full h-6 bg-gray-300 animate-pulse mb-2"></div>
//                     <div className="w-3/4 h-4 bg-gray-300 animate-pulse mb-4"></div>
//                     <div className="flex items-center gap-2">
//                         <div className="w-16 h-5 bg-gray-300 animate-pulse"></div>
//                         <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
//                     </div>
//                     <div className="mt-4 space-y-2">
//                         <div className="w-full h-10 bg-gray-300 animate-pulse"></div>
//                         <div className="w-full h-10 bg-gray-300 animate-pulse"></div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Prevent click on out of stock items
//     const isOutOfStock = product.stock <= 0;

//     return (
//         <div className={`border rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-transform duration-300 ${!isOutOfStock && 'hover:scale-[1.03]'} ${isOutOfStock ? 'opacity-70' : ''}`}>
//             <Link to={`/product/${product._id}`} className="block">
//                 <div className="relative">
//                     <img 
//                         src={product.images[0]} 
//                         alt={product.name} 
//                         className="w-full h-52 object-cover"
//                         loading="lazy" // Lazy loading for images
//                     />
//                     <div className="absolute top-2 left-2 flex flex-col gap-1">
//                         {product.discount > 0 && (
//                             <div className="bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
//                                 -{product.discount}%
//                             </div>
//                         )}
//                         {isOutOfStock && (
//                             <div className="bg-gray-800 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
//                                 Out of Stock
//                             </div>
//                         )}
//                         {product.isNew && (
//                             <div className="bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
//                                 New
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <div className="p-4">
//                     <h3 className="text-base font-semibold text-gray-900 line-clamp-2 h-12">{product.name}</h3>
//                     <div className="flex items-center gap-2 mt-2">
//                         {product.originalPrice > product.price && (
//                             <span className="text-gray-400 line-through text-sm">{product.originalPrice} د.إ</span>
//                         )}
//                         <span className="text-green-600 font-bold text-lg">{product.price} د.إ</span>
//                     </div>
//                     {product.rating && (
//                         <div className="flex items-center mt-2">
//                             <div className="flex">
//                                 {[...Array(5)].map((_, i) => (
//                                     <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//                                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                                     </svg>
//                                 ))}
//                             </div>
//                             <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
//                         </div>
//                     )}
//                 </div>
//             </Link>
//             <div className="p-4 pt-0 flex flex-col gap-2">
//                 <button
//                     onClick={() => onAddToCart(product._id)}
//                     disabled={isOutOfStock}
//                     className={`w-full text-white text-sm px-5 py-2 rounded-lg shadow-md transition-all active:scale-95 ${
//                         isOutOfStock 
//                             ? 'bg-gray-400 cursor-not-allowed' 
//                             : 'bg-gray-800 hover:bg-gray-700'
//                     }`}
//                 >
//                     ADD TO CART
//                 </button>
//                 <button
//                     onClick={() => handleBuyNow(product._id)}
//                     disabled={isOutOfStock}
//                     className={`w-full text-white text-sm px-5 py-2 rounded-lg shadow-md transition-all active:scale-95 ${
//                         isOutOfStock 
//                             ? 'bg-blue-300 cursor-not-allowed' 
//                             : 'bg-blue-500 hover:bg-blue-600'
//                     }`}
//                 >
//                     BUY NOW
//                 </button>
//             </div>

//             {/* Alert Message Component */}
//             {alert.message && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />}
//         </div>
//     );
// });

// const ProductGrid = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const [globalAlert, setGlobalAlert] = useState({ message: "", type: "" });
//     const [filters, setFilters] = useState({
//         sort: "newest",
//         category: "all",
//         priceRange: [0, 10000]
//     });

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             try {
//                 const parsedUser = JSON.parse(storedUser);
//                 setUserId(parsedUser.user.id);
//             } catch (error) {
//                 console.error("Error parsing user data:", error);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             setLoading(true);
//             try {
//                 // You could add query params for filtering based on your filters state
//                 const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
                
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
                
//                 const data = await response.json();
//                 setProducts(data);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//                 setError("Failed to load products. Please try again later.");
//                 setProducts([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         fetchProducts();
//     }, [filters]);

//     const addToCart = useCallback(async (productId) => {
//         if (!userId) {
//             setGlobalAlert({ 
//                 message: "Please log in to add items to your cart", 
//                 type: "warning" 
//             });
//             return Promise.reject(new Error("User not logged in"));
//         }

//         try {
//             const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/add-to-cart`, {
//                 productId,
//                 userId,
//             });

//             setGlobalAlert({ message: response.data.message, type: "success" });
//             return Promise.resolve(response.data);
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || error.message;
//             setGlobalAlert({
//                 message: "Error adding product to cart: " + errorMessage,
//                 type: "error",
//             });
//             return Promise.reject(error);
//         }
//     }, [userId]);

//     // Filter products function
//     const filteredProducts = React.useMemo(() => {
//         // Apply filters here based on your filter state
//         return products;
//     }, [products, filters]);

//     return (
//         <div className="container mx-auto px-6 py-10">
//             {/* Global Alert */}
//             {globalAlert.message && (
//                 <div className="mb-6">
//                     <AlertMessage 
//                         message={globalAlert.message} 
//                         type={globalAlert.type} 
//                         onClose={() => setGlobalAlert({ message: "", type: "" })} 
//                     />
//                 </div>
//             )}
            
//             {/* Filter Controls - Can be expanded */}
//             <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
//                 <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                
//                 <div className="flex flex-wrap gap-4">
//                     <select 
//                         className="border rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={filters.sort}
//                         onChange={(e) => setFilters({...filters, sort: e.target.value})}
//                     >
//                         <option value="newest">Newest</option>
//                         <option value="price-low">Price: Low to High</option>
//                         <option value="price-high">Price: High to Low</option>
//                         <option value="popular">Most Popular</option>
//                     </select>
//                 </div>
//             </div>
            
//             {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//                     <p>{error}</p>
//                 </div>
//             )}
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {loading
//                     ? Array.from({ length: 8 }).map((_, index) => (
//                         <ProductCard key={`skeleton-${index}`} loading={true} />
//                     ))
//                     : filteredProducts.length > 0 
//                         ? filteredProducts.map((product) => (
//                             <ProductCard 
//                                 key={product._id} 
//                                 product={product} 
//                                 loading={false}
//                                 onAddToCart={addToCart}
//                             />
//                         ))
//                         : (
//                             <div className="col-span-full text-center py-10">
//                                 <p className="text-gray-500 text-lg">No products found</p>
//                             </div>
//                         )
//                 }
//             </div>
//         </div>
//     );
// };

// export default ProductGrid;

import React, { useState, useEffect, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertMessage from "./Alert";

// Memoized ProductCard component to prevent unnecessary re-renders
const ProductCard = memo(({ product, loading, onAddToCart }) => {
    const [alert, setAlert] = useState({ message: "", type: "" });
    const navigate = useNavigate();
    
    const handleBuyNow = async (productId) => {
        try {
            await onAddToCart(productId);
            navigate("/checkout");
        } catch (error) {
            setAlert({
                message: "Error processing purchase: " + (error.response?.data?.message || error.message),
                type: "error",
            });
        }
    };

    // loading skeleton
    if (loading) {
        return (
            <div className="border rounded-xl shadow-lg overflow-hidden bg-white">
                <div className="relative">
                    <div className="w-full h-48 bg-gray-300 animate-pulse" />
                </div>
                <div className="p-4">
                    <div className="w-full h-6 bg-gray-300 animate-pulse mb-2"></div>
                    <div className="w-3/4 h-4 bg-gray-300 animate-pulse mb-4"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-5 bg-gray-300 animate-pulse"></div>
                        <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="w-full h-10 bg-gray-300 animate-pulse"></div>
                        <div className="w-full h-10 bg-gray-300 animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Prevent click on out of stock items
    const isOutOfStock = product.stock <= 0;

    return (
        <div className={`border rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-transform duration-300 ${!isOutOfStock && 'hover:scale-[1.03]'} ${isOutOfStock ? 'opacity-70' : ''}`}>
            <Link to={`/product/${product._id}`} className="block">
                <div className="relative">
                    <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-52 object-cover"
                        loading="lazy" // Lazy loading for images
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.discount > 0 && (
                            <div className="bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                -{product.discount}%
                            </div>
                        )}
                        {isOutOfStock && (
                            <div className="bg-gray-800 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                Out of Stock
                            </div>
                        )}
                        {product.isNew && (
                            <div className="bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                New
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2 h-12">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        {product.originalPrice > product.price && (
                            <span className="text-gray-400 line-through text-sm">{product.originalPrice} د.إ</span>
                        )}
                        <span className="text-green-600 font-bold text-lg">{product.price} د.إ</span>
                    </div>
                    {product.rating && (
                        <div className="flex items-center mt-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
                        </div>
                    )}
                </div>
            </Link>
            <div className="p-4 pt-0 flex flex-col gap-2">
                <button
                    onClick={() => onAddToCart(product._id)}
                    disabled={isOutOfStock}
                    className={`w-full text-white text-sm px-5 py-2 rounded-lg shadow-md transition-all active:scale-95 ${
                        isOutOfStock 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                >
                    ADD TO CART
                </button>
                <button
                    onClick={() => handleBuyNow(product._id)}
                    disabled={isOutOfStock}
                    className={`w-full text-white text-sm px-5 py-2 rounded-lg shadow-md transition-all active:scale-95 ${
                        isOutOfStock 
                            ? 'bg-blue-300 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    BUY NOW
                </button>
            </div>

            {/* Alert Message Component */}
            {alert.message && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />}
        </div>
    );
});

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [globalAlert, setGlobalAlert] = useState({ message: "", type: "" });
    const [filters, setFilters] = useState({
        sort: "newest",
        category: "all",
        priceRange: [0, 10000]
    });
    const [categories, setCategories] = useState([]);

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

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // You could add query params for filtering based on your filters state
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                setProducts(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products. Please try again later.");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, [filters.category]);

    const addToCart = useCallback(async (productId) => {
        if (!userId) {
            setGlobalAlert({ 
                message: "Please log in to add items to your cart", 
                type: "warning" 
            });
            return Promise.reject(new Error("User not logged in"));
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/add-to-cart`, {
                productId,
                userId,
            });

            setGlobalAlert({ message: response.data.message, type: "success" });
            return Promise.resolve(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setGlobalAlert({
                message: "Error adding product to cart: " + errorMessage,
                type: "error",
            });
            return Promise.reject(error);
        }
    }, [userId]);

    // Filter and sort products function
    const filteredProducts = React.useMemo(() => {
        let result = [...products];
        
        // Apply category filter
        if (filters.category !== "all") {
            result = result.filter(product => product.category === filters.category);
        }
        
        // Apply price range filter
        result = result.filter(product => 
            product.price >= filters.priceRange[0] && 
            product.price <= filters.priceRange[1]
        );
        
        // Apply sorting
        switch (filters.sort) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "popular":
                result.sort((a, b) => (b.reviewCount || 0) * (b.rating || 0) - (a.reviewCount || 0) * (a.rating || 0));
                break;
            case "newest":
            default:
                // Assuming products have a createdAt field or similar
                result.sort((a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id));
                break;
        }
        
        return result;
    }, [products, filters]);

    // Handle price range change
    const handlePriceRangeChange = (min, max) => {
        setFilters(prev => ({
            ...prev,
            priceRange: [parseInt(min), parseInt(max)]
        }));
    };

    return (
        <div className="container mx-auto px-6 py-10">
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
            
            {/* Filter Controls */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
                
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Filters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Sort By Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                            <select 
                                className="w-full border rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.sort}
                                onChange={(e) => setFilters({...filters, sort: e.target.value})}
                            >
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select 
                                className="w-full border rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.category}
                                onChange={(e) => setFilters({...filters, category: e.target.value})}
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                            <div className="flex items-center">
                                <input 
                                    type="number" 
                                    className="w-full border rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Min"
                                    value={filters.priceRange[0]}
                                    onChange={(e) => handlePriceRangeChange(e.target.value, filters.priceRange[1])}
                                    min="0"
                                />
                                <span className="mx-2">-</span>
                                <input 
                                    type="number" 
                                    className="w-full border rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Max"
                                    value={filters.priceRange[1]}
                                    onChange={(e) => handlePriceRangeChange(filters.priceRange[0], e.target.value)}
                                    min={filters.priceRange[0]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <p>{error}</p>
                </div>
            )}
            
            {/* Results Summary */}
            <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
                
                {/* Mobile Sort Option */}
                <div className="md:hidden">
                    <select 
                        className="border rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.sort}
                        onChange={(e) => setFilters({...filters, sort: e.target.value})}
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="popular">Most Popular</option>
                    </select>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <ProductCard key={`skeleton-${index}`} loading={true} />
                    ))
                    : filteredProducts.length > 0 
                        ? filteredProducts.map((product) => (
                            <ProductCard 
                                key={product._id} 
                                product={product} 
                                loading={false}
                                onAddToCart={addToCart}
                            />
                        ))
                        : (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-500 text-lg">No products found matching your filters</p>
                                <button 
                                    className="mt-4 text-blue-500 hover:text-blue-700"
                                    onClick={() => setFilters({
                                        sort: "newest",
                                        category: "all",
                                        priceRange: [0, 10000]
                                    })}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default ProductGrid;