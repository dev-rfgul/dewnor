
// // import React, { useState, useEffect } from "react";

// // const AddProduct = () => {
// //     const [form, setForm] = useState({
// //         name: "",
// //         description: "",
// //         price: "",
// //         stock: "",
// //         color: "",
// //         images: "",
// //         size: "",
// //     });

// //     const [products, setProducts] = useState([]);
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [editingProductId, setEditingProductId] = useState(null);

// //     // Fetch products from the API
// //     const fetchProducts = async () => {
// //         try {
// //             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/all-products`);
// //             const data = await response.json();
// //             setProducts(data);
// //         } catch (error) {
// //             console.error("Error fetching products:", error);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchProducts();
// //     }, []);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setForm((prev) => ({ ...prev, [name]: value }));
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         if (isEditing) {
// //             // Update product
// //             try {
// //                 await fetch(`https://products-wahab.free.beeceptor.com/api/products/${editingProductId}`, {
// //                     method: "PUT",
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                     },
// //                     body: JSON.stringify({
// //                         name: form.name,
// //                         description: form.description,
// //                         price: form.price,
// //                         stock: form.stock,
// //                         color: form.color,
// //                         imgUrl: form.images,
// //                         size: form.size,
// //                     }),
// //                 });

// //                 // Optimistically update the product list
// //                 setProducts((prevProducts) =>
// //                     prevProducts.map((product) =>
// //                         product.id === editingProductId
// //                             ? { ...product, name: form.name, description: form.description, price: form.price, stock: form.stock, color: form.color, imgUrl: form.images, size: form.size }
// //                             : product
// //                     )
// //                 );

// //                 // Reset form and state
// //                 setIsEditing(false);
// //                 setEditingProductId(null);
// //                 setForm({ name: "", description: "", price: "", image: "", stock: "", size: "", color: "" });
// //             } catch (error) {
// //                 console.error("Error updating product:", error);
// //             }
// //         } else {
// //             // Add new product
// //             try {
// //                 const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/add-product`, {
// //                     method: "POST",
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                     },
// //                     body: JSON.stringify({
// //                         name: form.name,
// //                         description: form.description,
// //                         price: form.price,
// //                         stock: form.stock,
// //                         color: form.color,
// //                         imgUrl: form.images,
// //                         size: form.size,
// //                     }),
// //                 });

// //                 const data = await response.json();
// //                 setProducts((prevProducts) => [...prevProducts, data]);

// //                 setForm({ name: "", description: "", price: "", image: "", color: "", size: "", stock: "" });
// //             } catch (error) {
// //                 console.error("Error adding product:", error);
// //             }
// //         }
// //     };


// //     const handleEdit = (product) => {
// //         console.log()
// //         setForm({
// //             name: product.title,
// //             description: product.description,
// //             price: product.price,
// //             stock: product.stock,
// //             color: product.color,
// //             image: product.imgUrl,
// //             size: product.size
// //         });
// //         setIsEditing(true);
// //         setEditingProductId(product.id);
// //     };

// //     const handleDelete = async (id) => {
// //         try {
// //             await fetch(`https://products-wahab.free.beeceptor.com/api/products/${id}`, {
// //                 method: "DELETE",
// //             });

// //             // Remove product from the list
// //             setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
// //         } catch (error) {
// //             console.error("Error deleting product:", error);
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
// //             <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
// //                 <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
// //                     {isEditing ? "Edit Product" : "Add New Product"}
// //                 </h2>
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                     <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Product Name
// //                         </label>
// //                         <input
// //                             type="text"
// //                             name="name"
// //                             value={form.name}
// //                             onChange={handleChange}
// //                             className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //                             placeholder="Enter product name"
// //                             required
// //                         />
// //                     </div>

// //                     <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Description
// //                         </label>
// //                         <textarea
// //                             name="description"
// //                             value={form.description}
// //                             onChange={handleChange}
// //                             className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //                             placeholder="Enter product description"
// //                             rows="4"
// //                             required
// //                         />
// //                     </div>

// //                     <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Price
// //                         </label>
// //                         <input
// //                             type="number"
// //                             name="price"
// //                             value={form.price}
// //                             onChange={handleChange}
// //                             className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //                             placeholder="Enter product price"
// //                             required
// //                         />
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Stock
// //                         </label>
// //                         <input
// //                             type="number"
// //                             name="stock"
// //                             value={form.stock}
// //                             onChange={handleChange}
// //                             className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //                             placeholder="Enter product stock"
// //                             required
// //                         />
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Color
// //                         </label>
// //                         <input
// //                             type="color"
// //                             name="color"
// //                             value={form.color} // Assuming you are using `form.color` for your state
// //                             onChange={handleChange}
// //                             className="w-12 h-12 p-0 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //                             required
// //                         />
// //                     </div>


// //                     <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Image URL
// //                         </label>
// //                         <input
// //                             type="text"
// //                             name="images"
// //                             value={form.images}
// //                             onChange={handleChange}
// //                             className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //                             placeholder="Enter product image URL"
// //                             required
// //                         />
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Size
// //                         </label>
// //                         <input
// //                             type="text"
// //                             name="size"
// //                             value={form.size}
// //                             onChange={handleChange}
// //                             className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //                             placeholder="Enter product size"
// //                             required
// //                         />
// //                     </div>

// //                     <button
// //                         type="submit"
// //                         className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
// //                     >
// //                         {isEditing ? "Update Product" : "Add Product"}
// //                     </button>
// //                 </form>
// //             </div>

// //             <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mt-8">
// //                 <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
// //                     Product List
// //                 </h2>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //                     {products.map((product) => (
// //                         <div
// //                             key={product.id}
// //                             className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col items-center"
// //                         >
// //                             <img
// //                                 src={product.imgUrl}
// //                                 alt={product.title}
// //                                 className="w-full h-48 object-cover rounded-lg mb-4"
// //                             />
// //                             <h3 className="text-lg font-semibold text-gray-800">
// //                                 {product.title}
// //                             </h3>
// //                             <p className="text-sm text-gray-600">{product.description}</p>
// //                             <span className="mt-2 text-xl font-semibold text-blue-500">
// //                                 ${product.price}
// //                             </span>
// //                             <div className="mt-4 flex gap-2">
// //                                 <button
// //                                     onClick={() => handleEdit(product)}
// //                                     className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600"
// //                                 >
// //                                     Edit
// //                                 </button>
// //                                 <button
// //                                     onClick={() => handleDelete(product.id)}
// //                                     className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
// //                                 >
// //                                     Delete
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default AddProduct;

// import { useEffect, useState } from 'react';

// const AddProductForm = () => {
//     const [product, setProduct] = useState({
//         name: '',
//         description: '',
//         price: '',
//         stock: '',
//         color: '',
//         images: '',
//         size: '',
//     });
//     const [products, setProducts] = useState();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProduct({
//             ...product,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const { name, description, price, stock, color, images, size } = product;

//         // Validate fields
//         if (!name || !description || !price || !stock || !images || !images.length) {
//             alert('Please fill all the required fields');
//             return;
//         }

//         // Send data to backend API
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/add-product`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     name,
//                     description,
//                     price: parseFloat(price),
//                     stock: parseInt(stock),
//                     color: color.split(','),
//                     images: images.split(','),
//                     size,
//                 }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 alert('Product added successfully!');
//                 setProduct({
//                     name: '',
//                     description: '',
//                     price: '',
//                     stock: '',
//                     color: '',
//                     images: '',
//                     size: '',
//                 });
//             } else {
//                 alert(data.message || 'Failed to add product');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Error adding product');
//         }
//     };

//     // Fetch products from the API
//     const fetchProducts = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/all-products`);
//             const data = await response.json();
//             setProducts(data);
//             console.log(JSON.stringify(data))
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };
//     useEffect(() => {
//         fetchProducts()
//     },[])

//     return (
//         <>
//             <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">Product Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={product.name}
//                             onChange={handleChange}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">Description</label>
//                         <textarea
//                             name="description"
//                             value={product.description}
//                             onChange={handleChange}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4 grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Price</label>
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={product.price}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Stock</label>
//                             <input
//                                 type="number"
//                                 name="stock"
//                                 value={product.stock}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">Colors (comma separated)</label>
//                         <input
//                             type="text"
//                             name="color"
//                             value={product.color}
//                             onChange={handleChange}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">Images (comma separated URLs)</label>
//                         <input
//                             type="text"
//                             name="images"
//                             value={product.images}
//                             onChange={handleChange}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">Size</label>
//                         <input
//                             type="text"
//                             name="size"
//                             value={product.size}
//                             onChange={handleChange}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                         />
//                     </div>
//                     <div className="text-center">
//                         <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
//                             Add Product
//                         </button>
//                     </div>
//                 </form>
//             </div>
//             <div className="App">
//                 <h1 className="text-3xl font-bold text-center mt-10">Product List</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {products && products.length > 0 ? (
//                         products.map((product) => (
//                             <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
//                                 <img
//                                     src={product.images[0]}
//                                     alt={product.name}
//                                     className="w-full h-48 object-cover rounded-t-lg"
//                                 />
//                                 <div className="p-4">
//                                     <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
//                                     <p className="text-sm text-gray-600 mt-2">{product.description}</p>
//                                     <div className="flex items-center justify-between mt-4">
//                                         <span className="text-lg font-semibold text-blue-500">${product.price}</span>
//                                         <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                                             Add to Cart
//                                         </button>
//                                     </div>
//                                     <div className="mt-2 text-gray-500">
//                                         <span className="font-bold">Stock:</span> {product.stock}
//                                     </div>
//                                     <div className="mt-2 text-gray-500">
//                                         <span className="font-bold">Size:</span> {product.size}
//                                     </div>
//                                     <div className="mt-2 text-gray-500">
//                                         <span className="font-bold">Colors:</span> {product.color.join(', ')}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No products available</p>
//                     )}

//                 </div>
//             </div>
//         </>
//     );
// }

// export default AddProductForm;


import { useEffect, useState } from 'react';

const AddProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        color: '',
        images: '',
        size: '',
    });
    const [products, setProducts] = useState();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, description, price, stock, color, images, size } = product;

        // Validate fields
        if (!name || !description || !price || !stock || !images || !images.length) {
            alert('Please fill all the required fields');
            return;
        }

        // Send data to backend API
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/add-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    price: parseFloat(price),
                    stock: parseInt(stock),
                    color: color.split(','),
                    images: images.split(','),
                    size,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Product added successfully!');
                setProduct({
                    name: '',
                    description: '',
                    price: '',
                    stock: '',
                    color: '',
                    images: '',
                    size: '',
                });
                
            } else {
                alert(data.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding product');
        }
    };

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/all-products`);
            const data = await response.json();
            setProducts(data);
            console.log(JSON.stringify(data))
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchProducts()
    },[])

    return (
        <>
            <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6 grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Colors (comma separated)</label>
                        <input
                            type="text"
                            name="color"
                            value={product.color}
                            onChange={handleChange}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Images (comma separated URLs)</label>
                        <input
                            type="text"
                            name="images"
                            value={product.images}
                            onChange={handleChange}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Size</label>
                        <input
                            type="text"
                            name="size"
                            value={product.size}
                            onChange={handleChange}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-12">
                <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                    {products && products.length > 0 ? (
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
                                        <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
                                            Add to Cart
                                        </button>
                                    </div>
                                    <div className="mt-4 text-gray-500">
                                        <span className="font-bold">Stock:</span> {product.stock}
                                    </div>
                                    <div className="mt-2 text-gray-500">
                                        <span className="font-bold">Size:</span> {product.size}
                                    </div>
                                    <div className="mt-2 text-gray-500">
                                        <span className="font-bold">Colors:</span> {product.color.join(', ')}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg text-gray-600">No products available</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default AddProductForm;
