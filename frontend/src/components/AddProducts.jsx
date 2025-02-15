import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ImageUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        name: '', description: '', price: '', stock: '',
        color: '', size: '', SKU: '', category: '', tag: '',
    });
    const [products, setProducts] = useState([]);

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
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
        setLoading(true);
        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            formData.append(key, value);
        });
        selectedFiles.forEach((file) => formData.append('image', file));

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/admin/add-product`,
                formData, { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            if (response.data.message === 'Product created successfully') {
                alert('Product added successfully!');
                setProduct({ name: '', description: '', price: '', stock: '', color: '', size: '', SKU: '', category: '', tag: '' });
                setSelectedFiles([]);
            }
        } catch (error) {
            console.error('Error submitting product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Add Product Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {["name", "description", "price", "stock", "color", "size", "SKU", "category"].map((field) => (
                        <div key={field}>
                            <label className="block text-lg font-medium text-gray-700">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={field === "price" || field === "stock" ? "number" : "text"}
                                name={field}
                                value={product[field]}
                                onChange={handleChange}
                                placeholder={`Enter ${field}`}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    ))}

                    {/* Tag Dropdown */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Tag</label>
                        <select
                            name="tag"
                            value={product.tag}
                            onChange={handleChange}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="wallet">Wallet</option>
                            <option value="gadgets">Gadgets</option>
                            <option value="bags">Bags</option>
                        </select>
                    </div>

                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                        {selectedFiles.length > 0 && (
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg shadow"
                                        />
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <FaEdit className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2" />
                                            <FaTrash
                                                onClick={() => handleRemoveImage(index)}
                                                className="cursor-pointer text-red-500 hover:text-red-700"
                                            />
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
                            className="w-full px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Product List */}
            <div className="mt-12">
                <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.length ? (
                        products.map((product) => (
                            <div
                                key={product._id}
                                className="border rounded-xl shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-transform duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    {product.discount > 0 && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                            -{product.discount}%
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                    <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                                        <span>{product.tag}</span>
                                        <span>SKU: {product.SKU}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <Link to={`/edit-product/${product._id}`} className="w-1/2">
                                            <button className="w-full bg-yellow-600 text-white py-2 rounded-lg shadow-md hover:bg-yellow-500 transition-all">
                                                EDIT
                                            </button>
                                        </Link>
                                        <button className="w-1/2 bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition-all">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg">No products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
