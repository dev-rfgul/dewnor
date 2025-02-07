
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
        SKU: '',
        category: '',
        tag: '',
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

        const { name, description, price, stock, color, images, size, SKU, category, tag } = product;

        // Validate fields
        if (!name || !description || !price || !stock || !images || !images.length || !SKU || !category || !tag) {
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
                    SKU,
                    category,
                    tag
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
            const data = await response.json();
            setProducts(data);
            console.log(JSON.stringify(data))
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchProducts()
    }, [])

    const handleDelete = async (id) => {
        alert("are you sure you want to delete the product")
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/delete-product/${id}`, {
                method: "DELETE",
            });

            // Remove product from the list
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    return (
        <>
            {/* add products form  */}
            <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Add Product</h2>
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter the Name"
                                value={product.name}
                                onChange={handleChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={product.description}
                                placeholder="Enter Description of the Product"
                                onChange={handleChange}
                                rows="4"
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
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
                                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">Colors (comma separated)</label>
                            <input
                                type="text"
                                name="color"
                                value={product.color}
                                placeholder="Enter Colors separated by commas"
                                onChange={handleChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">Images (comma separated URLs)</label>
                            <input
                                type="text"
                                name="images"
                                value={product.images}
                                placeholder="Enter Image URLs separated by commas"
                                onChange={handleChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">Size</label>
                            <input
                                type="text"
                                name="size"
                                value={product.size}
                                placeholder="Enter Size of the Product"
                                onChange={handleChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">SKU</label>
                            <input
                                type="text"
                                name="SKU"
                                value={product.SKU}
                                placeholder="Enter SKU"
                                onChange={handleChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={product.category}
                                placeholder="Enter categories separated by commas"
                                onChange={handleChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="tag" className="block text-lg font-medium text-gray-700">
                                Tag
                            </label>
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

                    </div>

                    <div className="mt-6 text-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                        >
                            Add Product
                        </button>
                    </div>
                </form>

            </div>
            {/* display products */}
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
                                <button
                                    onClick={() => { handleDelete(product._id) }}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
                                    Delete Product
                                </button>
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
