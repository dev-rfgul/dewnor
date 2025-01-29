import React from "react";

const imgs=[
    {
        img:"./images/icons/globe-free-img.png",
        text:"Worldwide Shipping"
    },
    {
        img:"./images/icons/quality-free-img.png",
        text:"Best Quality"
    },
    {
        img:"./images/icons/tag-free-img.png",
        text:"Best Offers"
    },
    {
        img:"./images/icons/lock-free-img.png",
        text:"Secure Payments"}
]

export default function FeatureSection() {
    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-6">
                {/* Features Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-12">
                    {imgs.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <img src={feature.img} alt="" />
                            <p className="text-xl font-semibold text-gray-800">{feature.text}</p>
                        </div>
                    ))}
                </div>

                {/* Tabby Banner Section */}
                <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
                    <img src="./images/featured.png" alt="Tabby Banner" className="w-full h-auto rounded-lg" />
                </div>

                {/* Centered Image */}
                <div className="mt-12 bg-white rounded-lg shadow-sm p-8 flex justify-center">
                    <img src="https://www.dewnor.com/wp-content/uploads/2022/07/logo.png" alt="Tabby Banner" className=" " />
                </div>

                <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
                    <img src="./images/tabby-banner.jpeg" alt="Tabby Banner" className="w-full h-auto rounded-lg" />
                </div>
            </div>
        </div>
    );
}
