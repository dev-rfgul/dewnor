
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// const ImageUploader = () => {
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [product, setProduct] = useState({ // being used to upload a new product
//         name: '', description: '', price: '', stock: '',
//         size: '', SKU: '', category: '', tag: '',
//     });
//     const [products, setProducts] = useState([]);       // being used to display the fetched products from DB

//     useEffect(() => { fetchProducts(); }, [products]);

//     const fetchProducts = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
//             const data = await response.json();
//             setProducts(data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };
//     // console.log(products)



//     const handleChange = (e) => {
//         setProduct({ ...product, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (event) => {
//         const files = Array.from(event.target.files);
//         setSelectedFiles((prevState) => [...prevState, ...files]);
//     };


//     const handleRemoveImage = (index) => {
//         setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);
//         const formData = new FormData();
//         Object.entries(product).forEach(([key, value]) => {
//             formData.append(key, value);

//         });
//         selectedFiles.forEach((file) => formData.append('image', file));


//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/admin/add-product`,
//                 formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 withCredentials: "include"

//             }
//             );
//             // setProducts((prevProducts) => [...prevProducts, response.data]);
//             if (response.data.message === 'Product created successfully') {
//                 alert('Product added successfully!');
//                 setProduct({ name: '', description: '', price: '', stock: '', size: '', SKU: '', category: '', tag: '' });
//                 setSelectedFiles([]);
//             }
//         } catch (error) {
//             console.error('Error submitting product:', error);
//         } finally {
//             setLoading(false);
//             console.log(formData)
//         }

//     };

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm("Do you want to delete this product?");
//         if (!confirmDelete) return; // Stop execution if user cancels

//         try {
//             const response = await axios.delete(
//                 `${import.meta.env.VITE_BACKEND_URL}/admin/delete-product/${id}`,
//                 { withCredentials: true } // ✅ Correct
//             );

//             console.log(response)

//             if (response.status === 200) {
//                 alert("Product deleted successfully");
//             } else {
//                 alert("Failed to delete product");
//             }
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             alert("An error occurred while deleting the product");
//         }
//     };


//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             {/* Add Product Form */}
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//                 <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Product</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {["name", "description", "price", "stock", , "size", "SKU", "category"].map((field) => (
//                         <div key={field}>
//                             <label className="block text-lg font-medium text-gray-700">
//                                 {field.charAt(0).toUpperCase() + field.slice(1)}
//                             </label>
//                             <input
//                                 type={field === "price" || field === "stock" ? "number" : "text"}
//                                 name={field}
//                                 value={product[field]}
//                                 onChange={handleChange}
//                                 placeholder={`Enter ${field}`}
//                                 className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                     ))}


//                     {/* Tag Dropdown */}
//                     <div>
//                         <label className="block text-lg font-medium text-gray-700">Tag</label>
//                         <select
//                             name="tag"
//                             value={product.tag}
//                             onChange={handleChange}
//                             className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="wallet">Wallet</option>
//                             <option value="gadgets">Gadgets</option>
//                             <option value="bags">Bags</option>
//                         </select>
//                     </div>

//                     {/* Image Upload Section */}
//                     <div>
//                         <label className="block text-lg font-medium text-gray-700">Images</label>
//                         <input
//                             type="file"
//                             multiple
//                             onChange={handleFileChange}
//                             className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//                         />
//                         {selectedFiles.length > 0 && (
//                             <div className="grid grid-cols-3 gap-4 mt-4">
//                                 {selectedFiles.map((file, index) => (
//                                     <div key={index} className="relative group">
//                                         <img
//                                             src={URL.createObjectURL(file)}
//                                             alt={`Image ${index + 1}`}
//                                             className="w-full h-32 object-cover rounded-lg shadow"
//                                         />
//                                         <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                             <FaEdit className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2" />
//                                             <FaTrash
//                                                 onClick={() => handleRemoveImage(index)}
//                                                 className="cursor-pointer text-red-500 hover:text-red-700"
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     {/* Submit Button */}
//                     <div className="mt-6 text-center">
//                         <button
//                             type="submit"
//                             className="w-full px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
//                         >
//                             {loading ? "Adding..." : "Add Product"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//             <div className="mt-12">
//                 <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {products.length ? (
//                         products.map((product) => (
//                             <div
//                                 key={product._id}
//                                 className="border rounded-xl shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-transform duration-300"
//                             >
//                                 <div className="relative">
//                                     <img
//                                         src={product.images[0]}
//                                         alt={product.name}
//                                         className="w-full h-48 object-cover rounded-lg"
//                                     />
//                                     {product.discount > 0 && (
//                                         <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
//                                             -{product.discount}%
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="p-4">
//                                     <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
//                                     <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
//                                         <span>{product.tag}</span>
//                                         <span>SKU: {product.SKU}</span>
//                                     </div>
//                                     <div className="flex justify-between items-center mt-4">
//                                         <Link to={`/edit-product/${product._id}`} className="w-1/2">
//                                             <button className="w-full bg-yellow-600 text-white py-2 rounded-lg shadow-md hover:bg-yellow-500 transition-all">
//                                                 EDIT
//                                             </button>
//                                         </Link>
//                                         <button
//                                             onClick={() => { handleDelete(product._id) }}

//                                             className="w-1/2 bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition-all">
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-lg">No products available.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ImageUploader;



import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaSpinner } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Add react-toastify for better notifications

const INITIAL_PRODUCT_STATE = {
    name: '',
    description: '',
    price: '',
    stock: '',
    size: '',
    SKU: '',
    category: '',
    tag: 'wallet', // Default value
};

const TAGS = [
    { value: 'wallet', label: 'Wallet' },
    { value: 'gadgets', label: 'Gadgets' },
    { value: 'bags', label: 'Bags' },
];

const ImageUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(INITIAL_PRODUCT_STATE);
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    // Fetch products only when component mounts, not on every product change
    const fetchProducts = useCallback(async () => {
        setIsLoadingProducts(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products. Please try again later.");
        } finally {
            setIsLoadingProducts(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        // Convert number inputs to numbers
        const processedValue = type === 'number' ? parseFloat(value) : value;
        setProduct({ ...product, [name]: processedValue });
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevState) => [...prevState, ...files]);
    };

    const handleRemoveImage = (index) => {
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedFiles.length === 0) {
            toast.warning("Please add at least one product image");
            return;
        }

        setLoading(true);
        const formData = new FormData();

        // Add all product fields to formData
        Object.entries(product).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Add all image files
        selectedFiles.forEach((file) => formData.append('image', file));

        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token; // Extract token safely
            console.log(token)
            if (!token) {
                console.error("🚨 No token found in localStorage!");
                toast.error("Authentication failed. Please log in again.");
                return;
            }

            console.log("🛠️ Token being sent:", token); // Debugging

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/admin/add-product`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}` // Send token here
                    },
                    withCredentials: true
                }
            );

            if (response.data.message === "Product created successfully") {
                toast.success("Product added successfully!");
                setProduct(INITIAL_PRODUCT_STATE);
                setSelectedFiles([]);
                fetchProducts();
            }
        } catch (error) {
            console.error("❌ Error submitting product:", error);
            toast.error(error.response?.data?.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you want to delete this product?");
        if (!confirmDelete) return;
    
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token; // Extract token safely
    
            if (!token) {
                console.error("🚨 No token found in localStorage!");
                toast.error("Authentication failed. Please log in again.");
                return;
            }
    
            console.log("🛠️ Token being sent:", token); // Debugging
    
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/admin/delete-product/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                    },
                    withCredentials: true,
                }
            );
    
            if (response.status === 200) {
                toast.success("Product deleted successfully");
                setProducts(products.filter(product => product._id !== id));
            } else {
                toast.error("Failed to delete product");
            }
        } catch (error) {
            console.error("❌ Error deleting product:", error);
            toast.error(error.response?.data?.message || "An error occurred while deleting the product");
        }
    };
    

    // Form input field component to reduce repetition
    const FormField = ({ name, type = "text", required = true }) => (
        <div>
            <label className="block text-lg font-medium text-gray-700">
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <input
                type={type}
                name={name}
                value={product[name]}
                onChange={handleChange}
                placeholder={`Enter ${name}`}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                required={required}
            />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Add Product Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField name="name" />
                        <FormField name="price" type="number" />
                        <FormField name="stock" type="number" />
                        <FormField name="size" />
                        <FormField name="SKU" />
                        <FormField name="category" />

                        {/* Tag Dropdown */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Tag</label>
                            <select
                                name="tag"
                                value={product.tag}
                                onChange={handleChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                {TAGS.map(tag => (
                                    <option key={tag.value} value={tag.value}>
                                        {tag.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Description Field - Full Width */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            rows="4"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Images</label>
                        <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="w-full"
                                accept="image/*"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Drag and drop images or click to select files
                            </p>
                        </div>

                        {selectedFiles.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="relative group rounded-lg overflow-hidden">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin mr-2" /> Adding...
                                </span>
                            ) : (
                                "Add Product"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Product List Section */}
            <div className="mt-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Product List</h1>
                    <button
                        onClick={fetchProducts}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center"
                    >
                        <span className={isLoadingProducts ? "animate-spin mr-2" : "mr-2"}>⟳</span> Refresh
                    </button>
                </div>

                {isLoadingProducts ? (
                    <div className="flex justify-center my-12">
                        <FaSpinner className="animate-spin text-4xl text-blue-500" />
                    </div>
                ) : products.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="relative overflow-hidden group">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {product.discount > 0 && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                            -{product.discount}%
                                        </div>
                                    )}
                                    {product.stock <= 5 && (
                                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                            Low Stock: {product.stock}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                                    <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                                        <span className="capitalize bg-gray-100 px-2 py-1 rounded">{product.tag}</span>
                                        <span>SKU: {product.SKU}</span>
                                    </div>
                                    <div className="mt-3 font-bold text-lg">${parseFloat(product.price).toFixed(2)}</div>
                                    <div className="flex justify-between items-center mt-4 space-x-2">
                                        <Link to={`/edit-product/${product._id}`} className="flex-1">
                                            <button className="w-full bg-yellow-600 text-white py-2 rounded-lg shadow-md hover:bg-yellow-500 transition-all flex items-center justify-center">
                                                <FaEdit className="mr-2" /> Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="flex-1 bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition-all flex items-center justify-center"
                                        >
                                            <FaTrash className="mr-2" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-12 bg-gray-50 rounded-xl">
                        <p className="text-xl text-gray-600">No products available.</p>
                        <p className="text-gray-500 mt-2">Add your first product using the form above.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;