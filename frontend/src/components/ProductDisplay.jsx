import React, { useState, useEffect } from "react";

const ProductDisplay = () => {
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-products`);
                const data = await response.json();
                setProduct(data[0]); // Assuming first product
                setMainImage(data[0].images[0]); // Set first image as default
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, []);

    if (!product) return <p>Loading...</p>;

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
        <div className="max-w-5xl mx-auto bg-gray-100 p-8 rounded-lg">
            {/* Product Layout */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Product Image */}
                <div className="flex flex-col items-center">
                    {/* Main image with zoom effect */}
                    <div
                        className="relative w-full max-w-[500px] overflow-hidden"
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
                                className="absolute top-0 left-0 w-full h-full pointer-events-none"
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
                    <div className="flex justify-center space-x-4 mt-4">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75"
                                onClick={() => handleImageClick(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Product Details */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                    {/* Discount Section */}
                    <p className="text-red-500 text-lg font-semibold mt-2">-60%</p>
                    <p className="text-gray-500 line-through text-lg">{product.oldPrice} د.إ</p>
                    <p className="text-gray-900 font-bold text-xl">{product.price} د.إ</p>

                    <p className="text-gray-600 mt-4">
                    {product.description}
                    </p>

                    {/* Stock Info */}
                    <p className="font-bold text-gray-900 mt-4">{product.stock} in stock</p>

                    {/* Quantity & Buttons */}
                    <div className="flex items-center space-x-4 mt-4">
                        <input
                            type="number"
                            defaultValue="1"
                            min="1"
                            className="w-12 border border-gray-300 rounded p-2 text-center"
                        />
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
                            Add to cart
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300">
                            Add to wishlist
                        </button>
                    </div>

                    {/* Category */}
                    <p className="text-gray-700 mt-4"> <b>Category:</b> {product.category}</p>
                    <p className="text-gray-700 mt-4"> <b>SKU:</b> {product.SKU}</p>
                    <p className="text-gray-700 mt-4"> <b>Tag:</b> {product.tag}</p>
                </div>
            </div>

            {/* Description */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold">Description</h2>
                <ul className="list-disc pl-5 text-gray-700 mt-2">
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
