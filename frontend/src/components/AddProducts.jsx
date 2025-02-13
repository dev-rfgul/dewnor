
// import { useState, useEffect } from "react";
// import axios from "axios";

// const ImageUploader = () => {
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const [product, setProduct] = useState({
//         name: '',
//         description: '',
//         price: '',
//         stock: '',
//         color: '',
//         size: '',
//         SKU: '',
//         category: '',
//         tag: '',
//     });
//     const [products, setProducts] = useState([]);

//     // Handle product input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProduct((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // Submit product form with images
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         const formData = new FormData();
//         Object.entries(product).forEach(([key, value]) => {
//             if (key !== "images") {
//                 formData.append(key, value);
//             }
//         });

//         // Append images
//         selectedFiles.forEach((file) => formData.append('image', file));

//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/admin/add-product`,
//                 formData,
//                 { headers: { 'Content-Type': 'multipart/form-data' } }
//             );

//             console.log(formData)
//             if (response.data.message === 'Product created successfully') {
//                 alert('Product created successfully!');
//                 setProduct({ ...product, images: [] });  // Reset product form
//                 setSelectedFiles([]); // Clear selected files
//             }
//         } catch (error) {
//             console.error('Error in submitting product:', error);
//             alert('An error occurred while submitting the product.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     console.log(product)
//     console.log(selectedFiles)


//     const fetchProducts = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
//             const data = await response.json();
//             setProducts(data);
//             // console.log(JSON.stringify(data))
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };
//     useEffect(() => {
//         fetchProducts()
//     }, [])


//     // Delete a product
//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this product?")) {
//             try {
//                 await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/delete-product/${id}`, { method: "DELETE" });
//                 setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
//             } catch (error) {
//                 console.error("Error deleting product:", error);
//             }
//         }
//     };

//     // Handle file input changes
//     const handleFileChange = (event) => {
//         const files = Array.from(event.target.files);
//         setSelectedFiles(files);
//     };
//     // Handle image upload
//     const handleUpload = async () => {
//         setLoading(true);
//         const formDataList = selectedFiles.map((file) => {
//             const formData = new FormData();
//             formData.append("image", file);
//             return formData;
//         });

//         try {
//             const uploadPromises = formDataList.map((formData) =>
//                 axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/upload-img`, formData, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 })
//             );
//             await Promise.all(uploadPromises);
//             setSelectedFiles([]); // Clear selected files after upload
//         } catch (error) {
//             console.error("Error uploading images:", error);
//             alert("An error occurred while uploading images.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             {/* Add product form */}
//             <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
//                 <h2 className="text-3xl font-bold text-center mb-6">Add Product</h2>
//                 <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h2>
//                     <div className="space-y-4">
//                         {/* Form fields */}
//                         {["name", "description", "price", "stock", "color", "size", "SKU", "category"].map((field) => (
//                             <div key={field}>
//                                 <label className="block text-lg font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                                 <input
//                                     type={field === "price" || field === "stock" ? "number" : "text"}
//                                     name={field}
//                                     value={product[field]}
//                                     onChange={handleChange}
//                                     placeholder={`Enter ${field}`}
//                                     className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 />
//                             </div>
//                         ))}
//                         {/* Tag dropdown */}
//                         <div>
//                             <label htmlFor="tag" className="block text-lg font-medium text-gray-700">Tag</label>
//                             <select
//                                 id="tag"
//                                 name="tag"
//                                 value={product.tag}
//                                 onChange={handleChange}
//                                 className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="wallet">Wallet</option>
//                                 <option value="gadgets">Gadgets</option>
//                                 <option value="bags">Bags</option>
//                             </select>
//                         </div>

//                         {/* Image upload */}
//                         <div className="p-4">
//                             <label className="block text-lg font-medium text-gray-700">Images</label>
//                             <input
//                                 type="file"
//                                 multiple
//                                 onChange={handleFileChange}
//                                 className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//                             />
//                             <button
//                                 onClick={handleUpload}
//                                 disabled={loading || selectedFiles.length === 0}
//                                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
//                             >
//                                 {loading ? "Uploading..." : "Upload Images"}
//                             </button>
//                         </div>

//                         <div className="mt-6 text-center">
//                             <button
//                                 type="submit"
//                                 className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
//                             >
//                                 Add Product
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>

//             {/* Display products */}
//             <div className="mt-12">
//                 <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
//                     {products.length ? (
//                         products.map((product) => (
//                             <div key={product._id} className="bg-white shadow-lg rounded-lg p-6">
//                                 <img
//                                     src={product.images[0]}
//                                     alt={product.name}
//                                     className="w-full h-48 object-cover rounded-t-lg"
//                                 />
//                                 <div className="p-4">
//                                     <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
//                                     <p className="text-md text-gray-600 mt-2">{product.description}</p>
//                                     <div className="flex items-center justify-between mt-6">
//                                         <span className="text-lg font-semibold text-blue-500">${product.price}</span>
//                                     </div>
//                                     <div className="mt-4 text-gray-500">
//                                         <span className="font-bold">Stock:</span> {product.stock}
//                                     </div>
//                                     <div className="mt-2 text-gray-500">
//                                         <span className="font-bold">Category:</span> {product.category}
//                                     </div>
//                                     <div className="mt-4 flex justify-between items-center">
//                                         <button
//                                             onClick={() => handleDelete(product._id)}
//                                             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                                         >
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
//         </>
//     );
// };

// export default ImageUploader;
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa"; // For the edit and delete icons

const ImageUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        color: '',
        size: '',
        SKU: '',
        category: '',
        tag: '',
    });
    const [products, setProducts] = useState([]);

    // Handle product input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Submit product form with images
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            if (key !== "images") {
                formData.append(key, value);
            }
        });

        // Append images
        selectedFiles.forEach((file) => formData.append('image', file));

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/admin/add-product`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.data.message === 'Product created successfully') {
                alert('Product created successfully!');
                setProduct({ ...product, images: [] });  // Reset product form
                setSelectedFiles([]); // Clear selected files
            }
        } catch (error) {
            console.error('Error in submitting product:', error);
            alert('An error occurred while submitting the product.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts()
    }, []);

    // Handle file input changes
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevState) => [...prevState, ...files]);  // Add selected files
    };

    // Remove an image
    const handleRemoveImage = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };

    // Handle image update
    const handleUpdateImage = (index) => {
        // Trigger file input when clicking the edit icon
        document.getElementById(`file-input-${index}`).click();
    };

    // Handle the update when a new image is selected
    const handleImageUpdate = (event, index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles[index] = event.target.files[0]; // Update the image at the index
        setSelectedFiles(updatedFiles);
    };

    return (
        <>
            {/* Add product form */}
            <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Add Product</h2>
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h2>
                    <div className="space-y-4">
                        {/* Form fields */}
                        {["name", "description", "price", "stock", "color", "size", "SKU", "category"].map((field) => (
                            <div key={field}>
                                <label className="block text-lg font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
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
                        {/* Tag dropdown */}
                        <div>
                            <label htmlFor="tag" className="block text-lg font-medium text-gray-700">Tag</label>
                            <select
                                id="tag"
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

                        {/* Image upload */}
                        <div className="p-4">
                            <label className="block text-lg font-medium text-gray-700">Images</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="mt-4">
                                {selectedFiles.length > 0 && (
                                    <div className="grid grid-cols-3 gap-4">
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Selected Image ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                                <div className="absolute top-2 right-2 text-white">
                                                    <FaEdit
                                                        onClick={() => handleUpdateImage(index)}
                                                        className="cursor-pointer text-blue-500"
                                                    />
                                                    <FaTrash
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="cursor-pointer text-red-500 ml-2"
                                                    />
                                                </div>
                                                <input
                                                    type="file"
                                                    id={`file-input-${index}`}
                                                    onChange={(event) => handleImageUpdate(event, index)}
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Display products */}
            <div className="mt-12">
                <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                    {products.length ? (
                        products.map((product) => (
                            <div key={product._id} className="bg-white shadow-lg rounded-lg p-6">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-md text-gray-600 mt-2">{product.description}</p>
                                    <div className="flex items-center justify-between mt-6">
                                        <span className="text-lg font-semibold text-blue-500">${product.price}</span>
                                    </div>
                                    <div className="mt-4 text-gray-500">
                                        <span className="font-bold">Stock:</span> {product.stock}
                                    </div>
                                    <div className="mt-2 text-gray-500">
                                        <span className="font-bold">Category:</span> {product.category}
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                        >
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
        </>
    );
};

export default ImageUploader;
