
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const ProductDisplay = () => {
    const { id } = useParams(); // Get product ID from URL  
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState('1')



    const handleQuantityChange = (e) => {
        const newQuantity = Number(e.target.value);
        if (newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                console.error("No product ID found in URL");
                return;
            }

            console.log("Fetching product with ID:", id);

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-product/${id}`);
                const data = await response.json();

                console.log("Fetched data:", data);

                if (data.product) {
                    setProduct(data.product);
                    if (data.product.images && data.product.images.length > 0) {
                        setMainImage(data.product.images[0]);
                    } else {
                        console.warn("Product has no images");
                    }
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleImageClick = (img) => {
        setMainImage(img);
    };

    if (!product) return (
        <div className="max-w-5xl mx-auto bg-gray-100 p-6 md:p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Product Image Skeleton */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-full max-w-[250px] sm:max-w-[300px] h-64 bg-gray-300 animate-pulse rounded-lg"></div>

                    {/* Image Thumbnails */}
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {Array(4).fill("").map((_, index) => (
                            <div
                                key={index}
                                className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 animate-pulse rounded-lg"
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info Skeleton */}
                <div className="space-y-6">
                    <div className="bg-gray-300 animate-pulse w-32 h-6 mb-4 rounded-lg"></div>
                    <div className="bg-gray-300 animate-pulse w-40 h-6 mb-4 rounded-lg"></div>
                    <div className="bg-gray-300 animate-pulse w-24 h-6 mb-4 rounded-lg"></div>
                    <div className="bg-gray-300 animate-pulse w-full h-8 mb-6 rounded-lg"></div>

                    {/* Price Skeleton */}
                    <div className="bg-gray-300 animate-pulse w-24 h-8 rounded-lg"></div>

                    {/* Add to Cart Button Skeleton */}
                    <div className="bg-gray-300 animate-pulse w-36 h-10 mt-4 rounded-lg"></div>
                </div>
            </div>
        </div>

    );

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image Section */}
                <div className="relative group overflow-hidden">
                    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-3 mt-4 justify-center">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
                                onClick={() => handleImageClick(img)}
                            />
                        ))}

                    </div>


                </div>

                {/* Product Details Section */}
                <div className="flex flex-col justify-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-gray-600 text-md">Category: <span className="font-medium">{product.category}</span></p>
                    <p className="text-gray-600 text-md">SKU: <span className="font-medium">{product.SKU}</span></p>
                    <p className="text-green-600 text-lg">Price: <span className="font-medium">{product.price}</span></p>
                    {/* <p className="text-gray-700">{product.description}</p> */}


                    <p className={`text-lg font-medium ${product.stock > 0 ? "text-gray-600" : "text-red-500"}`}>
                        {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                    </p>
                    {/* Colors */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Available Colors:</span>
                        <div className="flex gap-2">
                            {product.color.map((color, index) => (
                                <span
                                    key={index}
                                    className="block w-6 h-6 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color }}
                                ></span>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 mt-4">
                        <span className="text-gray-600">Quantity:</span>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="px-2 py-1 text-sm rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-20"
                        />

                        <span className="text-sm text-gray-600">Max: {product.stock}</span>
                    </div>
                    <div className="flex gap-4 mt-4">

                        <button className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition-all duration-300">
                            Add to Cart
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition-all duration-300">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-gray-600 text-md mt-10">
                <p className="text-2xl font-bold text-gray-900 mb-4">Description:</p>

                <ul className="list-disc pl-5 space-y-3 text-gray-700">
                    {product.description
                        .split(".")
                        .filter(sentence => sentence.trim() !== "") // Remove empty strings
                        .map((sentence, index) => (
                            <li
                                key={index}
                                className="text-lg transition-all duration-300 hover:text-blue-500 hover:underline"
                            >
                                {sentence.trim()}.
                            </li>
                        ))}
                </ul>
            </div>

        </div>
    );

};

export default ProductDisplay;
