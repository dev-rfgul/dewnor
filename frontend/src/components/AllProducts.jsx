// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";


// const ProductCard = ({ product, loading }) => {
//     const dispatch = useDispatch()

//     const [userId, setUserId] = useState()

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             console.log(storedUser)
//             const parsedUser = JSON.parse(storedUser);
//             setUserId(parsedUser.user.id);
//         } else {
//             console.error("No user found in localStorage");
//         }

//     }, [])
//     const addToCart = async (productId, userId) => {

//         try {
//             const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/add-to-cart`, {
//                 productId,
//                 userId
//             });

//             alert(response.data.message);
//         } catch (error) {
//             console.error("Error:", error.response?.data?.message || error.message);
//             alert("Error adding product to cart: " + (error.response?.data?.message || error.message));
//         }
//     };
//     if (loading) {
//         return (
//             <div className="border rounded-xl shadow-lg overflow-hidden bg-white">
//                 <div className="relative">
//                     <div className="w-full h-48 bg-gray-300 animate-pulse" />
//                     <div className="absolute top-2 left-2 bg-gray-400 text-transparent px-3 py-1 text-xs font-semibold rounded-full shadow-md">
//                         <span className="w-12 h-4 bg-gray-300"></span>
//                     </div>
//                 </div>
//                 <div className="p-4">
//                     <div className="w-full h-6 bg-gray-300 animate-pulse mb-2"></div>
//                     <div className="flex items-center gap-2 mt-2">
//                         <div className="w-16 h-4 bg-gray-300 animate-pulse" />
//                         <div className="w-24 h-4 bg-gray-300 animate-pulse" />
//                     </div>
//                     <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
//                         <div className="w-16 h-4 bg-gray-300 animate-pulse" />
//                         <div className="w-16 h-4 bg-gray-300 animate-pulse" />
//                     </div>
//                     <button className="mt-4 w-full bg-gray-300 text-transparent text-sm px-5 py-2 rounded-lg shadow-md animate-pulse">
//                         <span className="w-24 h-6 bg-gray-300 animate-pulse"></span>
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (

//         <div className="border rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
//             <Link to={`/product/${product._id}`} className="block">
//                 <div className="relative">
//                     <img
//                         src={product.images[0]}
//                         alt={product.title}
//                         className="w-full h-52 object-cover"
//                     />
//                     {product.discount > 0 && (
//                         <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
//                             -{product.discount}%
//                         </div>
//                     )}
//                 </div>
//                 <div className="p-4">
//                     <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
//                     <div className="flex items-center gap-2 mt-2">
//                         <span className="text-gray-400 line-through text-sm">{product.originalPrice} د.إ</span>
//                         <span className="text-green-600 font-bold text-lg">{product.price} د.إ</span>
//                     </div>
//                     <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
//                         <span className="font-medium">{product.tag}</span>
//                         <span className="font-medium">| SKU: {product.SKU}</span>
//                     </div>
//                 </div>
//             </Link>
//             <div className="p-4 flex flex-col gap-2">
//                 <button
//                     onClick={() => addToCart(product._id, userId)}
//                     className="w-full bg-gray-800 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all active:scale-95"
//                 >
//                     ADD TO CART
//                 </button>
//                 <button
//                     onClick={() => addToCart(product._id, userId)}
//                     className="w-full bg-blue-500 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all active:scale-95"
//                 >
//                     Buy Now
//                 </button>
//             </div>
//         </div>



//     );
// };

// const AllProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
//                 const data = await response.json();
//                 setProducts(data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//                 setLoading(true); // Set loading to true in case of error
//             } finally {
//                 setLoading(false)
//             }
//         };
//         fetchProducts();
//     }, []);

//     return (
//         <div className="container mx-auto px-6 py-12">
//             <h1 className="text-3xl font-semibold text-center mb-8">All Products</h1>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
//                 {loading
//                     ? Array.from({ length: 10 }).map((_, index) => (
//                         <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
//                     ))
//                     : products.map((product) => (
//                         <ProductCard key={product._id} product={product} />
//                     ))}
//             </div>
//         </div>

//     );

// };

// export default AllProducts;

import { useState, useEffect, useCallback } from "react";

import ProductCard from './ProductCard'


// AllProducts Component - Enhanced
const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filters and sorting
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [categories, setCategories] = useState([]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data);
            
            // Extract unique categories
            const uniqueCategories = [...new Set(data.map(product => product.category).filter(Boolean))];
            setCategories(uniqueCategories);
            
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(error.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Apply filters and sorting
    useEffect(() => {
        let result = [...products];
        
        // Apply search filter
        if (searchTerm) {
            result = result.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (product.tag && product.tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        
        // Apply category filter
        if (selectedCategory) {
            result = result.filter(product => product.category === selectedCategory);
        }
        
        // Apply sorting
        switch (sortBy) {
            case "priceAsc":
                result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "priceDesc":
                result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case "newest":
                // Assuming products have a createdAt field, otherwise this won't have an effect
                result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                break;
            case "discount":
                result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
                break;
            default:
                break;
        }
        
        setFilteredProducts(result);
    }, [products, searchTerm, selectedCategory, sortBy]);

    const handleRefresh = () => {
        fetchProducts();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-center mb-8">All Products</h1>
            
            {/* Filters Section */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">
                            {/* Search icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                    
                    {/* Category Filter */}
                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Sort By */}
                    <div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option value="newest">Newest First</option>
                            <option value="priceAsc">Price: Low to High</option>
                            <option value="priceDesc">Price: High to Low</option>
                            <option value="discount">Biggest Discounts</option>
                        </select>
                    </div>
                    
                    {/* Refresh Button */}
                    <div>
                        <button
                            onClick={handleRefresh}
                            className="w-full p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Refresh Products
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Results count */}
            <div className="mb-4 text-gray-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory && ` in ${selectedCategory}`}
            </div>
            
            {/* Error Message */}
            {error && !loading && (
                <div className="text-center p-8 bg-red-100 rounded-lg mb-8">
                    <p className="text-red-600 font-medium">{error}</p>
                    <button
                        onClick={handleRefresh}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            )}
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <ProductCard key={index} loading={true} />
                    ))
                    : filteredProducts.length > 0 
                        ? filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                        : (
                            <div className="col-span-full text-center p-12">
                                <div className="flex flex-col items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                                    <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setSelectedCategory("");
                                            setSortBy("newest");
                                        }}
                                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    );  
};

export default AllProducts;