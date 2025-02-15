// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';

// const ProductDisplay = () => {

//     const { id } = useParams(); // Get product ID from URL  
//     const [product, setProduct] = useState(null);
//     const [mainImage, setMainImage] = useState("");
//     const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//     const [isZoomed, setIsZoomed] = useState(false);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             if (!id) {
//                 console.error("No product ID found in URL");
//                 return;
//             }

//             console.log("Fetching product with ID:", id);

//             try {
//                 const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/get-product/${id}`);
//                 const data = await response.json();

//                 console.log("Fetched data:", data);

//                 if (data.product) {
//                     setProduct(data.product);
//                     if (data.product.images && data.product.images.length > 0) {
//                         setMainImage(data.product.images[0]);
//                     } else {
//                         console.warn("Product has no images");
//                     }
//                 } else {
//                     console.error("Product not found");
//                 }
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//             }
//         };

//         fetchProduct();
//     }, [id]);
//     // Ensure it re-fetches when `id` changes
//     console.log(product)

//     // loading product till the time the porducts are being loaded from the DB
//     if (!product) return (
//         <div className="max-w-5xl mx-auto bg-gray-100 p-6 md:p-8 rounded-lg">
//             {/* Product Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//                 {/* Left: Product Image */}
//                 <div className="flex flex-col items-center">
//                     {/* Loading Skeleton for Image */}
//                     <div className="relative w-full max-w-[400px] sm:max-w-[500px] overflow-hidden bg-gray-300 animate-pulse rounded-lg">
//                         {/* Placeholder image */}
//                     </div>

//                     {/* Loading Skeleton for Thumbnail Images */}
//                     <div className="flex flex-wrap justify-center gap-3 mt-4">
//                         {Array(5).fill("").map((_, index) => (
//                             <div
//                                 key={index}
//                                 className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 animate-pulse rounded-lg"
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Right: Product Details */}
//                 <div>
//                     {/* Loading Skeleton for Text */}
//                     <div className="bg-gray-300 animate-pulse w-32 h-6 mb-4 rounded-lg" />
//                     <div className="bg-gray-300 animate-pulse w-20 h-6 mb-4 rounded-lg" />
//                     <div className="bg-gray-300 animate-pulse w-40 h-6 mb-4 rounded-lg" />
//                     <div className="bg-gray-300 animate-pulse w-20 h-6 mb-4 rounded-lg" />

//                     {/* Loading Skeleton for Description */}
//                     <div className="bg-gray-300 animate-pulse w-full h-16 mb-4 rounded-lg" />
//                     <div className="bg-gray-300 animate-pulse w-24 h-6 mb-4 rounded-lg" />

//                     {/* Quantity & Buttons Skeleton */}
//                     <div className="flex flex-wrap items-center gap-4 mt-4">
//                         <div className="w-14 h-10 bg-gray-300 animate-pulse rounded-lg" />
//                         <div className="bg-gray-300 animate-pulse w-32 h-10 rounded-lg" />
//                         <div className="bg-gray-300 animate-pulse w-32 h-10 rounded-lg" />
//                     </div>

//                     {/* Category, SKU, Tag Skeleton */}
//                     <div className="mt-4 space-y-2 text-gray-700">
//                         <div className="bg-gray-300 animate-pulse w-24 h-6 mb-2 rounded-lg" />
//                         <div className="bg-gray-300 animate-pulse w-24 h-6 mb-2 rounded-lg" />
//                         <div className="bg-gray-300 animate-pulse w-24 h-6 mb-2 rounded-lg" />
//                     </div>
//                 </div>
//             </div>

//             {/* Description Skeleton */}
//             <div className="mt-8">
//                 <div className="bg-gray-300 animate-pulse w-40 h-6 mb-4 rounded-lg" />
//                 <div className="space-y-1">
//                     {Array(3).fill("").map((_, index) => (
//                         <div key={index} className="bg-gray-300 animate-pulse w-60 h-6 mb-2 rounded-lg" />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );

//     const handleImageClick = (img) => {
//         setMainImage(img);
//     };

//     const handleMouseMove = (e) => {
//         const img = e.target;
//         const { left, top, width, height } = img.getBoundingClientRect();
//         const x = ((e.clientX - left) / width) * 100;
//         const y = ((e.clientY - top) / height) * 100;
//         setZoomPosition({ x, y });
//     };

//     return (
//         <>
//             <div>{product._id}</div>
//             <h1>{product.name}</h1>
//             <h1>{product.category}</h1>
//             <h1>{product.SKU}</h1>
//             <h1>{product.description}</h1>
//             <h1>{product.price}</h1>
//             <h1>{product.stock}</h1>
//             <h1>{product.tag}</h1>
//             {product.images.map((img, index) => (
//                 <img src={img}></img>
//             ))}
//             {product.color.map((color, index) => (
//                 <h1>{color}</h1>
//             ))}


//         </>


//     );
// };

// export default ProductDisplay;
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const ProductDisplay = () => {
    const { id } = useParams(); // Get product ID from URL  
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-[400px] sm:max-w-[500px] overflow-hidden bg-gray-300 animate-pulse rounded-lg"></div>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {Array(5).fill("").map((_, index) => (
                            <div key={index} className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 animate-pulse rounded-lg" />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="bg-gray-300 animate-pulse w-32 h-6 mb-4 rounded-lg" />
                    <div className="bg-gray-300 animate-pulse w-20 h-6 mb-4 rounded-lg" />
                    <div className="bg-gray-300 animate-pulse w-40 h-6 mb-4 rounded-lg" />
                    <div className="bg-gray-300 animate-pulse w-20 h-6 mb-4 rounded-lg" />
                    <div className="bg-gray-300 animate-pulse w-full h-16 mb-4 rounded-lg" />
                    <div className="bg-gray-300 animate-pulse w-24 h-6 mb-4 rounded-lg" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group overflow-hidden">
                    <div className="relative w-full max-w-md overflow-hidden">
                        <img 
                            src={mainImage} 
                            alt="Product" 
                            className="w-full rounded-lg transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <p className="text-gray-600">Category: {product.category}</p>
                    <p className="text-gray-600">SKU: {product.SKU}</p>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-lg font-semibold text-blue-500">${product.price}</p>
                    <p className="text-gray-600">Stock: {product.stock}</p>
                    <div className="flex gap-3 mt-4">
                        {product.images.map((img, index) => (
                            <img 
                                key={index} 
                                src={img} 
                                alt="Thumbnail" 
                                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-500" 
                                onClick={() => handleImageClick(img)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
