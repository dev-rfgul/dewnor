import React from "react";

const ProductDisplay = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="flex justify-center">
                        <img
                            src="/images/explore/bag-image-1.jpg" // Replace with product image URL
                            alt="The Camel Wallet"
                            className="rounded-lg shadow-md w-full max-w-sm"
                        />
                    </div>
                    {/* Product Details */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            “The Camel” Standard Leather Wallet
                        </h1>
                        <p className="mt-2 text-xl text-red-500">-60%</p>
                        <p className="mt-2 text-lg text-gray-600">
                            د.إ350.00 <span className="line-through">د.إ140.00</span>
                        </p>
                        <p className="mt-4 text-gray-700">
                            Preorder Sale Ending on 14-08-2022
                        </p>
                        <p className="mt-1 text-gray-500">
                            Order now and pay online to book yours. Cash on delivery is not
                            accepted for Preorder Sale!!
                        </p>
                        <p className="mt-2 font-semibold text-gray-700">20 in stock</p>

                        <div className="flex items-center mt-4 space-x-4">
                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="w-12 border border-gray-300 rounded-md text-center"
                            />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                                Add to cart
                            </button>
                            <button className="bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300">
                                Add to wishlist
                            </button>
                        </div>
                        <div className="mt-4 text-sm text-gray-600">
                            <p>Category: Leather Wallets-Hand Stitched</p>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800">Description</h2>
                    <p className="mt-4 text-gray-600">
                        Craftsmanship is what makes DEWNOR’S. All of our products are 100%
                        hand-crafted right here in the UAE.
                    </p>
                    <ul className="mt-4 list-disc list-inside text-gray-600">
                        <li>Main standard Cash pocket</li>
                        <li>Holds up to 8 cards plus cash</li>
                        <li>Full Grain – Vegetable Tanned Leather</li>
                        <li>Coin pocket & Secured with Snap Button</li>
                        <li>Conditioned with Dewnor’s leather treatment</li>
                    </ul>
                </div>

                {/* Related Products */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800">You may also like…</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {/* Example Product */}
                        {[
                            {
                                name: "Leather Case 4-Pens",
                                price: "د.إ129.00",
                                originalPrice: "د.إ199.00",
                                discount: "-35%",
                                image:"/images/explore/bag-image-1.jpg"
                            },
                            {
                                name: "6 Card – Heritage Brown Leather",
                                price: "د.إ180.00",
                                originalPrice: "د.إ450.00",
                                discount: "-60%",
                                image:"/images/explore/bag-image-1.jpg"
                            },
                            {
                                name: "Leather Hand-Band",
                                price: "د.إ99.00",
                                originalPrice: "د.إ159.00",
                                discount: "-38%",
                                image:"/images/explore/bag-image-1.jpg"
                            },
                            {
                                name: "Leather Mouse Pad",
                                price: "د.إ99.00",
                                originalPrice: "د.إ150.00",
                                discount: "-34%",
                                image:"/images/explore/bag-image-1.jpg"
                            },
                        ].map((product, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-4 rounded-lg shadow-md text-center"
                            >
                                <p className="text-sm font-bold">{product.name}</p>
                                <p className="mt-1 text-sm text-red-500">{product.discount}</p>
                                <p className="mt-1 text-sm text-gray-800">{product.price}</p>
                                <p className="text-xs line-through">{product.originalPrice}</p>
                                <img src={product.image} alt="" />
                                <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                                    Add to cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
