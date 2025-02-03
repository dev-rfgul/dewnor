import React from "react";
import { Link } from "react-router-dom";

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
        <Link to={`/product/${product.id}`} className="block">
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
        </Link>
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



