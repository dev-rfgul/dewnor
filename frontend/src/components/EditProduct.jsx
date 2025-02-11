
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";

const ProductDisplay = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [editableFields, setEditableFields] = useState({});
    const [images, setImages] = useState([]); // Store the list of images

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/get-product/67aa3e55826056bf3f91a4f8`);
                const data = await response.json();
                if (data.product) {
                    setProduct(data.product);
                    setMainImage(data.product.images[0]);
                    setEditableFields({
                        name: data.product.name,
                        price: data.product.price,
                        oldPrice: data.product.oldPrice,
                        description: data.product.description,
                        stock: data.product.stock,
                        category: data.product.category,
                        SKU: data.product.SKU,
                        tag: data.product.tag
                    });
                    setImages(data.product.images); // Initialize images array
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleEdit = (field, value) => {
        setEditableFields(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        const newImages = [...images];
        const reader = new FileReader();

        reader.onloadend = () => {
            newImages[index] = reader.result; // Update the image at the clicked index
            setImages(newImages);
        };

        if (file) {
            reader.readAsDataURL(file); // Read the file as data URL
        }
    };

    const handleUpdateProduct = async () => {
        console.log("btn clicked");
        console.log(editableFields)
        try {
            console.log("execution started");
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/edit-product/67aa3e55826056bf3f91a4f8`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...editableFields,
                    images, // Include the images array in the update
                }),
            });

            if (response.ok) {
                alert('Product updated successfully');
                const updatedProduct = await response.json(); // Assuming backend returns updated product details
                setProduct(updatedProduct.product); // Update state with the latest product details
                setMainImage(updatedProduct.product.images[0]); // Update main image
                setImages(updatedProduct.product.images); // Update images array
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    if (!product) return (
        <div className="max-w-5xl mx-auto bg-gray-100 p-6 md:p-8 rounded-lg">
            {/* Loading Skeleton */}
            {/* Same skeleton code as before */}
        </div>
    );



    return (
        <div className="max-w-5xl mx-auto bg-gray-100 p-6 md:p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Left: Product Image */}
                <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-[400px] sm:max-w-[500px]">
                        <img
                            src={mainImage}
                            alt={editableFields.name}
                            className="w-full h-auto rounded-lg shadow-md object-cover"
                        />
                        <label className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
                            <FiEdit />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(0, e)} // Update the main image
                            />
                        </label>
                    </div>
                    {/* Thumbnail Images */}
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image}
                                    alt={`product-image-${index}`}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                                />
                                <label className="absolute top-1 right-1 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
                                    <FiEdit />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageChange(index, e)} // Update respective image
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Product Details */}
                <div>
                    {/* name */}
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={editableFields.name}
                            onChange={(e) => handleEdit("name", e.target.value)}
                            className="text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-400 outline-none"
                        />
                        <FiEdit className="ml-2 cursor-pointer" />
                    </div>
                    {/* description */}
                    <textarea
                        value={editableFields.description}
                        onChange={(e) => handleEdit("description", e.target.value)}
                        className="w-full mt-4 border border-gray-300 p-2 rounded outline-none"
                    />
                    {/* price */}
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-red-500 text-lg font-semibold">-60%</p>
                        <input
                            type="text"
                            value={editableFields.oldPrice}
                            onChange={(e) => handleEdit("oldPrice", e.target.value)}
                            className="text-gray-500 line-through text-lg border-b border-gray-400 outline-none"
                        />
                        <input
                            type="text"
                            value={editableFields.price}
                            onChange={(e) => handleEdit("price", e.target.value)}
                            className="text-gray-900 font-bold text-xl border-b border-gray-400 outline-none"
                        />
                    </div>
                    {/* stock */}
                    <p className="font-bold text-gray-900 mt-4">Stock:
                        <input
                            type="text"
                            value={editableFields.stock}
                            onChange={(e) => handleEdit("stock", e.target.value)}
                            className="ml-2 border-b border-gray-400 outline-none"
                        />
                    </p>
                    {/* color */}
                    <p className="font-bold text-gray-900 mt-4">Stock:
                        <input
                            type="text"
                            value={editableFields.color}
                            onChange={(e) => handleEdit("color", e.target.value)}
                            className="ml-2 border-b border-gray-400 outline-none"
                        />
                    </p>

                    {/* category */}
                    <p>Category:
                        <input
                            type="text"
                            value={editableFields.category}
                            onChange={(e) => handleEdit("category", e.target.value)}
                            className="border-b border-gray-400 outline-none"
                        />
                    </p>
                    {/* sku */}
                    <p>SKU:
                        <input
                            type="text"
                            value={editableFields.SKU}
                            onChange={(e) => handleEdit("SKU", e.target.value)}
                            className="border-b border-gray-400 outline-none"
                        />
                    </p>
                    {/* tag */}
                    <p>Tag:
                        <input
                            type="text"
                            value={editableFields.tag}
                            onChange={(e) => handleEdit("tag", e.target.value)}
                            className="border-b border-gray-400 outline-none"
                        />
                    </p>

                </div>
            </div>

            {/* Update Product Button */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleUpdateProduct}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                    Update Product
                </button>
            </div>
        </div>
    );
};

export default ProductDisplay;
