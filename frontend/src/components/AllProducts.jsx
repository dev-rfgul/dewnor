
// import { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// // Removed unused axios import

// import ProductCard from './ProductCard';

// // AllProducts Component - Enhanced
// const AllProducts = () => {
//     const { category } = useParams();
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Filters and sorting
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const [sortBy, setSortBy] = useState("newest");
//     const [categories, setCategories] = useState([]);

//     const fetchProducts = useCallback(async () => {
//         setLoading(true);
//         try {
//             const endpoint = category ?
//                 `${import.meta.env.VITE_BACKEND_URL}/product/categories/${category.toLocaleLowerCase()}`
//                 : `${import.meta.env.VITE_BACKEND_URL}/product/get-products`;
//             const response = await fetch(endpoint);
//             // console.log(response)
//             // const data1 = await response.json();
//             // console.log(data1);

//             if (!response.ok) {
//                 throw new Error("Failed to fetch products");
//             }

//             const data = await response.json();
//             setProducts(data);
//             setFilteredProducts(data);

//             // Extract unique categories
//             const uniqueCategories = [...new Set(data.map(product => product.category).filter(Boolean))];
//             setCategories(uniqueCategories);

//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setError(error.message || "Failed to load products");
//         } finally {
//             setLoading(false);
//         }
//     }, [category]); // Added category as a dependency

//     useEffect(() => {
//         fetchProducts();
//     }, [fetchProducts]);

//     // Apply filters and sorting
//     useEffect(() => {
//         let result = [...products];

//         // Apply search filter
//         if (searchTerm) {
//             result = result.filter(product =>
//                 product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
//                 (product.tag && product.tag.toLowerCase().includes(searchTerm.toLowerCase()))
//             );
//         }

//         // Apply category filter
//         if (selectedCategory) {
//             result = result.filter(product => product.category === selectedCategory);
//         }

//         // Apply sorting
//         switch (sortBy) {
//             case "priceAsc":
//                 result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//                 break;
//             case "priceDesc":
//                 result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//                 break;
//             case "newest":
//                 // Assuming products have a createdAt field, otherwise this won't have an effect
//                 result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
//                 break;
//             case "discount":
//                 result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
//                 break;
//             default:
//                 break;
//         }

//         setFilteredProducts(result);
//     }, [products, searchTerm, selectedCategory, sortBy]);

//     const handleRefresh = () => {
//         fetchProducts();
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-semibold text-center mb-8">
//                 {category ? `${category} Products` : "All Products"}
//             </h1>

//             {/* Filters Section */}
//             <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                     {/* Search Bar */}
//                     <div className="relative">
//                         <input
//                             type="text"
//                             placeholder="Search products..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//                         />
//                         <span className="absolute right-3 top-2.5 text-gray-400">
//                             {/* Search icon */}
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>

//                     {/* Category Filter */}
//                     <div>
//                         <select
//                             value={selectedCategory}
//                             onChange={(e) => setSelectedCategory(e.target.value)}
//                             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//                         >
//                             <option value="">All Categories</option>
//                             {categories.map((cat) => (
//                                 <option key={cat} value={cat}>
//                                     {cat}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Sort By */}
//                     <div>
//                         <select
//                             value={sortBy}
//                             onChange={(e) => setSortBy(e.target.value)}
//                             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//                         >
//                             <option value="newest">Newest First</option>
//                             <option value="priceAsc">Price: Low to High</option>
//                             <option value="priceDesc">Price: High to Low</option>
//                             <option value="discount">Biggest Discounts</option>
//                         </select>
//                     </div>

//                     {/* Refresh Button */}
//                     <div>
//                         <button
//                             onClick={handleRefresh}
//                             className="w-full p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                         >
//                             Refresh Products
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Results count */}
//             <div className="mb-4 text-gray-600">
//                 Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
//                 {searchTerm && ` for "${searchTerm}"`}
//                 {selectedCategory && ` in ${selectedCategory}`}
//             </div>

//             {/* Error Message */}
//             {error && !loading && (
//                 <div className="text-center p-8 bg-red-100 rounded-lg mb-8">
//                     <p className="text-red-600 font-medium">{error}</p>
//                     <button
//                         onClick={handleRefresh}
//                         className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             )}

//             {/* Products Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
//                 {loading
//                     ? Array.from({ length: 8 }).map((_, index) => (
//                         <ProductCard key={`skeleton-${index}`} loading={true} />
//                     ))
//                     : filteredProducts.length > 0
//                         ? filteredProducts.map((product) => (
//                             <ProductCard key={product._id} product={product} />
//                         ))
//                         : (
//                             <div className="col-span-full text-center p-12">
//                                 <div className="flex flex-col items-center justify-center">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                     </svg>
//                                     <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
//                                     <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
//                                     <button
//                                         onClick={() => {
//                                             setSearchTerm("");
//                                             setSelectedCategory("");
//                                             setSortBy("newest");
//                                         }}
//                                         className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
//                                     >
//                                         Clear Filters
//                                     </button>
//                                 </div>
//                             </div>
//                         )
//                 }
//             </div>
//         </div>
//     );
// };

// export default AllProducts;


import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductCard from './ProductCard';

// AllProducts Component - Enhanced
const AllProducts = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [products,setProducts]

    // Filters and sorting
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [categories, setCategories] = useState([]);

    // Set the selectedCategory when the URL parameter changes
    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        } else {
            setSelectedCategory("");
        }
    }, [category]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            // Use a single endpoint for both scenarios with a query parameter
            const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/product`;
            const endpoint = category
                ? `${baseUrl}/categories/${category.toLowerCase()}`
                : `${baseUrl}/get-products`;

            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();
            console.log(data)

            setProducts(data.products);

            // Extract unique categories from all products
            const uniqueCategories = [...new Set(
                products
                    .map(product => product.category)
                    .filter(Boolean)
            )];

            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(error.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Apply filters and sorting
    useEffect(() => {
        let result = [...products];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(product =>
                product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.tag && typeof product.tag === 'string' && product.tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Apply category filter
        // Note: Your backend filters by tag, but frontend displays categories
        // So we need to keep this filter for consistency
        if (selectedCategory && !category) {
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
                result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                break;
            case "discount":
                result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
                break;
            default:
                break;
        }

        setFilteredProducts(result);
    }, [products, searchTerm, selectedCategory, sortBy, category]);

    const handleRefresh = () => {
        fetchProducts();
    };

    const clearFilters = () => {
        setSearchTerm("");
        if (!category) {
            // Only clear the selected category if it's not from the URL
            setSelectedCategory("");
        }
        setSortBy("newest");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-center mb-8">
                {category ? `${category} Products` : "All Products"}
            </h1>

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
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </div>

                    {/* Category Filter - Disabled when URL category is present */}
                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            disabled={!!category} // Disable when URL category is present
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
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
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <ProductCard key={`skeleton-${index}`} loading={true} />
                    ))
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center p-12">
                        <div className="flex flex-col items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-gray-400 mb-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProducts;