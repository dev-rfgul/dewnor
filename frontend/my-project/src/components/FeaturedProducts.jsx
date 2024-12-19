import React from "react";

// Product Data Example
const products = [
    {
        id: 1,
        title: "Leather Belt- Vintage Brown",
        originalPrice: 299.0,
        discountedPrice: 185.0,
        discount: 38,
        image: "/images/explore/wallet-image-1.jpg",
    },
    {
        id: 2,
        title: "Apple Watch Leather Strap — Black",
        originalPrice: 130.0,
        discountedPrice: 160.0,
        discount: 19,
        image: "/images/explore/wallet-image-2.jpg",
    },
    {
        id: 3,
        title: "Leather 15 Cards Wallet",
        originalPrice: 299.0,
        discountedPrice: 150.0,
        discount: 50,
        image: "/images/explore/wallet-image-3.jpg",
    },
    {
        id: 4,
        title: "Leather Belt- Vintage Brown",
        originalPrice: 299.0,
        discountedPrice: 185.0,
        discount: 38,
        image: "/images/explore/gadget-image-1.jpg",
    },
    {
        id: 5,
        title: "Apple Watch Leather Strap — Black",
        originalPrice: 130.0,
        discountedPrice: 160.0,
        discount: 19,
        image: "/images/explore/gadget-image-2.jpg",
    },
    {
        id: 6,
        title: "Leather 15 Cards Wallet",
        originalPrice: 299.0,
        discountedPrice: 150.0,
        discount: 50,
        image: "/images/explore/gadget-image-3.jpg",
    },
    {
        id: 7,
        title: "Leather Belt- Vintage Brown",
        originalPrice: 299.0,
        discountedPrice: 185.0,
        discount: 38,
        image: "/images/explore/bag-image-1.jpg",
    },
    {
        id: 8,
        title: "Apple Watch Leather Strap — Black",
        originalPrice: 130.0,
        discountedPrice: 160.0,
        discount: 19,
        image: "/images/explore/bag-image-2.jpg",
    },
];

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg shadow-md overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                    -{product.discount}%
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800">{product.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-gray-400 line-through text-sm">
                        {product.originalPrice}.د.إ
                    </span>
                    <span className="text-green-600 font-bold">
                        {product.discountedPrice}.د.إ
                    </span>
                </div>
                <button className="mt-3 bg-gray-800 text-white text-xs px-4 py-2 rounded hover:bg-gray-700">
                    ADD TO CART
                </button>
            </div>
        </div>
    );
};

const ProductGrid = () => {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

 export default ProductGrid;




 
// import React, { useState } from "react";

// // Product Card Component
// const ProductCard = ({ product }) => {
//     const [currentImage, setCurrentImage] = useState(product.image);

//     return (
//         <div
//             className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 w-64 h-80" // Fixed width and height for consistency
//             onMouseEnter={() => setCurrentImage(product.hoverImage)}
//             onMouseLeave={() => setCurrentImage(product.image)}
//         >
//             {/* Product Image */}
//             <div className="h-40 overflow-hidden"> {/* Fixed height for the image */}
//                 <img
//                     src={currentImage}
//                     alt={product.title}
//                     className="w-full h-full object-cover transition-transform duration-300"
//                 />
//             </div>

//             {/* Product Info */}
//             <div className="p-5 flex flex-col justify-between h-full">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
//                 <div className="flex justify-between items-center mb-2">
//                     <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
//                     <p className="text-xl font-bold text-green-500">${product.discountedPrice.toFixed(2)}</p>
//                 </div>
//                 <p className="text-sm text-red-500 mb-3">Save {product.discount}%!</p>
//                 <button
//                     className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
//                 >
//                     Add to Cartn
//                 </button>
//             </div>
//         </div>
//     );
// };

// // Product List Component
// const ProductList = () => {
//     const products = [
//         {
//             id: 1,
//             title: "Leather Belt - Vintage Brown",
//             originalPrice: 299.0,
//             discountedPrice: 185.0,
//             discount: 38,
//             image: "/images/explore/wallet-image-1.jpg",
//             hoverImage: "/images/explore/wallet-image-2.jpg",
//         },
//         {
//             id: 2,
//             title: "Apple Watch Leather Strap — Black",
//             originalPrice: 130.0,
//             discountedPrice: 160.0,
//             discount: 19,
//             image: "/images/explore/gadget-image-1.jpg",
//             hoverImage: "/images/explore/gadget-image-3.jpg",
//         },
//         {
//             id: 3,
//             title: "Leather 15 Cards Wallet",
//             originalPrice: 299.0,
//             discountedPrice: 150.0,
//             discount: 50,
//             image: "/images/explore/wallet-image-3.jpg",
//             hoverImage: "/images/explore/gadget-image-2.jpg",
//         },
//         {
//             id: 2,
//             title: "Apple Watch Leather Strap — Black",
//             originalPrice: 130.0,
//             discountedPrice: 160.0,
//             discount: 19,
//             image: "/images/explore/gadget-image-1.jpg",
//             hoverImage: "/images/explore/gadget-image-3.jpg",
//         },
//         {
//             id: 3,
//             title: "Leather 15 Cards Wallet",
//             originalPrice: 299.0,
//             discountedPrice: 150.0,
//             discount: 50,
//             image: "/images/explore/wallet-image-3.jpg",
//             hoverImage: "/images/explore/gadget-image-2.jpg",
//         },
//         {
//             id: 4,
//             title: "Laptop Bag Vintage Style",
//             originalPrice: 749.0,
//             discountedPrice: 449.0,
//             discount: 40,
//             image: "/images/explore/bag-image-1.jpg",
//             hoverImage: "/images/explore/bag-image-2.jpg",
//         },
//     ];

//     return (
//         <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-50">
//             {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//             ))}
//         </div>
//     );
// };

// export default ProductList;
