import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const ProductDisplay = () => {

    const { id } = useParams(); // Get product ID from URL  
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-product/${id}`);
                const data = await response.json();

                if (data.product) {
                    setProduct(data.product);
                    setMainImage(data.product.images[0]); // Set first image as default
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]); // Ensure it re-fetches when `id` changes
    console.log(product)

    // loading product till the time the porducts are being loaded from the DB
    if (!product) return (
        <div className="max-w-5xl mx-auto bg-gray-100 p-6 md:p-8 rounded-lg">
            {/* Product Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Left: Product Image */}
                <div className="flex flex-col items-center">
                    {/* Loading Skeleton for Image */}
                    <div className="relative w-full max-w-[400px] sm:max-w-[500px] overflow-hidden bg-gray-300 animate-pulse rounded-lg">
                        {/* Placeholder image */}
                    </div>

                    {/* Loading Skeleton for Thumbnail Images */}
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {Array(5).fill("").map((_, index) => (
                            <div
                                key={index}
                                className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 animate-pulse rounded-lg"
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Product Details */}
                <div>
                    {/* Loading Skeleton for Text */}
                    <div className="bg-gray-300 animate-pulse w-32 h-6 mb-4 rounded-lg" />
                    <div className="bg-gray-300 animate-pulse w-20 h-6 mb-4 rounded-lg" />
                    <div className="bg-gray-300 animate-pulse w-40 h-6 mb-4 rounded-lg" />
                    <div className="bg-gray-300 animate-pulse w-20 h-6 mb-4 rounded-lg" />

                    {/* Loading Skeleton for Description */}
                    <div className="bg-gray-300 animate-pulse w-full h-16 mb-4 rounded-lg" />
                    <div className="bg-gray-300 animate-pulse w-24 h-6 mb-4 rounded-lg" />

                    {/* Quantity & Buttons Skeleton */}
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="w-14 h-10 bg-gray-300 animate-pulse rounded-lg" />
                        <div className="bg-gray-300 animate-pulse w-32 h-10 rounded-lg" />
                        <div className="bg-gray-300 animate-pulse w-32 h-10 rounded-lg" />
                    </div>

                    {/* Category, SKU, Tag Skeleton */}
                    <div className="mt-4 space-y-2 text-gray-700">
                        <div className="bg-gray-300 animate-pulse w-24 h-6 mb-2 rounded-lg" />
                        <div className="bg-gray-300 animate-pulse w-24 h-6 mb-2 rounded-lg" />
                        <div className="bg-gray-300 animate-pulse w-24 h-6 mb-2 rounded-lg" />
                    </div>
                </div>
            </div>

            {/* Description Skeleton */}
            <div className="mt-8">
                <div className="bg-gray-300 animate-pulse w-40 h-6 mb-4 rounded-lg" />
                <div className="space-y-1">
                    {Array(3).fill("").map((_, index) => (
                        <div key={index} className="bg-gray-300 animate-pulse w-60 h-6 mb-2 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );

    const handleImageClick = (img) => {
        setMainImage(img);
    };

    const handleMouseMove = (e) => {
        const img = e.target;
        const { left, top, width, height } = img.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    return (
        <div className="max-w-5xl mx-auto bg-gray-100 p-6 md:p-8 rounded-lg">
            {/* Product Layout */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Left: Product Image */}
                <div className="flex flex-col items-center">
                    {/* Main image with zoom effect */}
                    <div
                        className="relative w-full max-w-[400px] sm:max-w-[500px] overflow-hidden"
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-auto rounded-lg shadow-md object-cover"
                        />

                        {/* Zoomed-in area */}
                        {isZoomed && (
                            <div
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                style={{
                                    backgroundImage: `url(${mainImage})`,
                                    backgroundSize: "200%",
                                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                    transform: "scale(1.5)",
                                    borderRadius: "8px",
                                    transition: "transform 0.1s ease",
                                }}
                            />
                        )}
                    </div>

                    {/* Thumbnail images */}
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer hover:opacity-75"
                                onClick={() => handleImageClick(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Product Details */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>

                    {/* Discount Section */}
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-red-500 text-lg font-semibold">-60%</p>
                        <p className="text-gray-500 line-through text-lg">{product.oldPrice} د.إ</p>
                        <p className="text-gray-900 font-bold text-xl">{product.price} د.إ</p>
                    </div>

                    <p className="text-gray-600 mt-4">{product.description}</p>

                    {/* Stock Info */}
                    <p className="font-bold text-gray-900 mt-4">{product.stock} in stock</p>

                    {/* Quantity & Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                        <input
                            type="number"
                            defaultValue="1"
                            min="1"
                            className="w-14 border border-gray-300 rounded p-2 text-center"
                        />
                        <button className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                            Add to cart
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow-md hover:bg-gray-300 transition">
                            Add to wishlist
                        </button>
                    </div>

                    {/* Category, SKU, Tag */}
                    <div className="mt-4 space-y-2 text-gray-700">
                        <p><b>Category:</b> {product.category}</p>
                        <p><b>SKU:</b> {product.SKU}</p>
                        <p><b>Tag:</b> {product.tag}</p>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold">Color:</span>
                            {product.color.split(",").map((clr, index) => (
                                <div
                                    key={index}
                                    className="w-6 h-6 rounded-full border border-gray-300"
                                    style={{ backgroundColor: clr.trim() }}
                                ></div>
                            ))}
                        </div>

                        <p><b>size:</b> {product.size}</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mt-8">
                <h2 className="text-xl sm:text-2xl font-bold">Description</h2>
                <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                    {product.description
                        .split('.')
                        .filter(item => item.trim() !== '')
                        .map((list, index) => (
                            <li key={index}>{list.trim()}.</li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductDisplay;
