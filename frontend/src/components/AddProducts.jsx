
import React, { useState, useEffect } from "react";

const AddProduct = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });

    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch("https://products-wahab.free.beeceptor.com/api/products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            // Update product
            try {
                await fetch(`https://products-wahab.free.beeceptor.com/api/products/${editingProductId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: form.name,
                        description: form.description,
                        price: form.price,
                        imgUrl: form.image,
                    }),
                });

                // Optimistically update the product list
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === editingProductId
                            ? { ...product, title: form.name, description: form.description, price: form.price, imgUrl: form.image }
                            : product
                    )
                );

                // Reset form and state
                setIsEditing(false);
                setEditingProductId(null);
                setForm({ name: "", description: "", price: "", image: "" });
            } catch (error) {
                console.error("Error updating product:", error);
            }
        } else {
            // Add new product
            try {
                const response = await fetch("https://products-wahab.free.beeceptor.com/api/products/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: form.name,
                        description: form.description,
                        price: form.price,
                        imgUrl: form.image,
                    }),
                });

                const data = await response.json();
                setProducts((prevProducts) => [...prevProducts, data]);

                setForm({ name: "", description: "", price: "", image: "" });
            } catch (error) {
                console.error("Error adding product:", error);
            }
        }
    };


    const handleEdit = (product) => {
        console.log()
        setForm({
            name: product.title,
            description: product.description,
            price: product.price,
            image: product.imgUrl,
        });
        setIsEditing(true);
        setEditingProductId(product.id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`https://products-wahab.free.beeceptor.com/api/products/${id}`, {
                method: "DELETE",
            });

            // Remove product from the list
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    {isEditing ? "Edit Product" : "Add New Product"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product description"
                            rows="4"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product price"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product image URL"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        {isEditing ? "Update Product" : "Add Product"}
                    </button>
                </form>
            </div>

            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mt-8">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Product List
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col items-center"
                        >
                            <img
                                src={product.imgUrl}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold text-gray-800">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <span className="mt-2 text-xl font-semibold text-blue-500">
                                ${product.price}
                            </span>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
