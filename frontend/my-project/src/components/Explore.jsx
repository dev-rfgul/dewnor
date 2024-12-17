import React, { useEffect, useState } from "react";

const Explore = () => {
    const data = [
        {
            category: "Wallets",
            images: [
                "/images/explore/wallet-image-1.jpg",
                "/images/explore/wallet-image-2.jpg",
                "/images/explore/wallet-image-3.jpg",
            ],
            btn: "Explore",
        },
        {
            category: "Gadgets!",
            images: [
                "/images/explore/gadget-image-1.jpg",
                "/images/explore/gadget-image-3.jpg",
                "/images/explore/gadget-image-2.jpg",
            ],
            btn: "Explore",
        },
        {
            category: "Bags",
            images: [
                "/images/explore/bag-image-1.jpg",
                "/images/explore/bag-image-2.jpg",
            ],
            btn: "Explore",
        },
    ];

    const [currentImageIndices, setCurrentImageIndices] = useState(
        data.map(() => Math.floor(Math.random() * 2))
    );

    useEffect(() => {
        const intervals = data.map((_, categoryIndex) =>
            setInterval(() => {
                setCurrentImageIndices((prevIndices) => {
                    const newIndices = [...prevIndices];
                    newIndices[categoryIndex] = Math.floor(
                        Math.random() * data[categoryIndex].images.length
                    );
                    return newIndices;
                });
            }, 2000)
        );

        return () => {
            intervals.forEach(clearInterval);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-6 w-full md:w-3/4 mx-auto">
            {data.map((item, categoryIndex) => (
                <div
                    key={categoryIndex}
                    className="relative overflow-hidden border border-gray-300"
                >
                    {/* Image */}
                    <img
                        src={item.images[currentImageIndices[categoryIndex]]}
                        alt={item.category}
                        className="w-full h-96 object-cover transform transition-transform hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-black opacity-30"></div>

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                        <h3 className="text-4xl font-semibold mb-2">{item.category}</h3>
                        <p className="text-yellow-500 text-2xl font-bold underline cursor-pointer">
                            {item.btn}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Explore;
