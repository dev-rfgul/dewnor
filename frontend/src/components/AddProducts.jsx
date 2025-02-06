

// import { useEffect, useState } from 'react';
// import axios from 'axios'

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

//     const handleDelete = async (id) => {
//         try {
//             await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/delete-product/${id}`, {
//                 method: "DELETE",
//             });
//             alert("product deleted successfully")
//             // Remove product from the list
//             setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };


//     const handleUpdate = async (id, updatedData) => {
//         try {
//             const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/product/edit-product/${id}`, updatedData);
//             console.log("Product updated successfully:", response.data);
//             return response.data;
//         } catch (error) {
//             console.error("Error updating product:", error.response?.data?.message || error.message);
//         }
//     };


//     useEffect(() => {
//         fetchProducts()
//     }, [product])
//     return (
//         <>
//             {/* add products form  */}
//             <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
//                 <h2 className="text-3xl font-bold text-center mb-6">Add Product</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-6">
//                         <label className="block text-lg font-medium text-gray-700">Product Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={product.name}
//                             onChange={handleChange}
//                             className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-lg font-medium text-gray-700">Description</label>
//                         <textarea
//                             name="description"
//                             value={product.description}
//                             onChange={handleChange}
//                             className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-6 grid grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-lg font-medium text-gray-700">Price</label>
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={product.price}
//                                 onChange={handleChange}
//                                 className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-lg font-medium text-gray-700">Stock</label>
//                             <input
//                                 type="number"
//                                 name="stock"
//                                 value={product.stock}
//                                 onChange={handleChange}
//                                 className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-lg font-medium text-gray-700">Colors (comma separated)</label>
//                         <input
//                             type="text"
//                             name="color"
//                             value={product.color}
//                             onChange={handleChange}
//                             className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-lg font-medium text-gray-700">Images (comma separated URLs)</label>
//                         <input
//                             type="text"
//                             name="images"
//                             value={product.images}
//                             onChange={handleChange}
//                             className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-lg font-medium text-gray-700">Size</label>
//                         <input
//                             type="text"
//                             name="size"
//                             value={product.size}
//                             onChange={handleChange}
//                             className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div className="text-center">
//                         <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition">
//                             Add Product
//                         </button>
//                     </div>
//                 </form>
//             </div>
//             {/* display products */}
//             <div className="mt-12">
//                 <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
//                     {products && products.length > 0 ? (
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
//                                         <button
//                                             onClick={() => { handleDelete(product._id) }}
//                                             className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
//                                             Delete
//                                         </button>
//                                     </div>
//                                     <div className="flex items-center justify-between mt-6">
//                                         <span className="text-lg font-semibold text-blue-500">${product.price}</span>
//                                         <button
//                                             onClick={() => { handleUpdate(product._id,) }}
//                                             className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition">
//                                             Update
//                                         </button>
//                                     </div>
//                                     <div className="mt-4 text-gray-500">
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
//                         <p className="text-center text-lg text-gray-600">No products available</p>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default AddProductForm;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !price || !stock || !images) {
            alert('All fields are required');
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/add-product`, {
                name,
                description,
                price,
                stock,
                images: images.split(',') // Ensuring it's stored as an array
            });
            setProducts([...products, response.data]);
            setName('');
            setDescription('');
            setPrice('');
            setStock('');
            setImages('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/products/${id}`, updatedData);
            setProducts((prevProducts) => prevProducts.map((product) => product._id === id ? response.data : product));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 m-2" />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 m-2" />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 m-2" />
                <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} className="border p-2 m-2" />
                <input type="text" placeholder="Images (comma separated)" value={images} onChange={(e) => setImages(e.target.value)} className="border p-2 m-2" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
            </form>

            <div>
                {products.map((product) => (
                    <div key={product._id} className="border p-4 mb-4">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <div className="mt-2 text-gray-500">
                            <span className="font-bold">Colors:</span> {Array.isArray(product.color) ? product.color.join(', ') : product.color}
                        </div>
                        <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white p-2 mt-2 rounded">Delete</button>
                        <button onClick={() => handleUpdate(product._id, { name: 'Updated Name' })} className="bg-green-500 text-white p-2 mt-2 ml-2 rounded">Update</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
