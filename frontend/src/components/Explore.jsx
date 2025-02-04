// import React, { useEffect, useState } from "react";

// const Explore = () => {
//     const data = [
//         {
//             category: "Wallets",
//             images: [
//                 "/images/explore/wallet-image-1.jpg",
//                 "/images/explore/wallet-image-2.jpg",
//                 "/images/explore/wallet-image-3.jpg",
//             ],
//             btn: "Explore",
//         },
//         {
//             category: "Gadgets!",
//             images: [
//                 "/images/explore/gadget-image-1.jpg",
//                 "/images/explore/gadget-image-3.jpg",
//                 "/images/explore/gadget-image-2.jpg",
//             ],
//             btn: "Explore",
//         },
//         {
//             category: "Bags",
//             images: [
//                 "/images/explore/bag-image-1.jpg",
//                 "/images/explore/bag-image-2.jpg",
//             ],
//             btn: "Explore",
//         },
//     ];

//     const [currentImageIndices, setCurrentImageIndices] = useState(
//         data.map(() => Math.floor(Math.random() * 2))
//     );

//     useEffect(() => {
//         const intervals = data.map((_, categoryIndex) =>
//             setInterval(() => {
//                 setCurrentImageIndices((prevIndices) => {
//                     const newIndices = [...prevIndices];
//                     newIndices[categoryIndex] = Math.floor(
//                         Math.random() * data[categoryIndex].images.length
//                     );
//                     return newIndices;
//                 });
//             }, 2000)
//         );

//         return () => {
//             intervals.forEach(clearInterval);
//         };
//     }, []);

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-6 w-full md:w-3/4 mx-auto">
//             {data.map((item, categoryIndex) => (
//                 <div
//                     key={categoryIndex}
//                     className="relative overflow-hidden border border-gray-300"
//                 >
//                     {/* Image Container */}
//                     <div className="relative w-full h-96">
//                         {/* Smooth Fade Transition */}
//                         <img
//                             src={item.images[currentImageIndices[categoryIndex]]}
//                             alt={item.category}
//                             className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 animate-fade"
//                             onLoad={(e) => e.target.classList.remove("opacity-0")}
//                         />
//                     </div>
    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-black opacity-30"></div>
    
//                     {/* Text Content */}
//                     <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
//                         <h3 className="text-4xl font-semibold mb-2">{item.category}</h3>
//                         <p className="text-yellow-500 text-2xl font-bold underline cursor-pointer">
//                             {item.btn}
//                         </p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
    
// };

// export default Explore;
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
    const [fadeKeys, setFadeKeys] = useState(data.map(() => 0));

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

                // Trigger fade animation
                setFadeKeys((prevKeys) => {
                    const newKeys = [...prevKeys];
                    newKeys[categoryIndex] += 1;
                    return newKeys;
                });
            }, 3000) // Increased time for better user experience
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
                    className="relative overflow-hidden border border-gray-300 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
                >
                    {/* Image Container */}
                    <div className="relative w-full h-96">
                        {/* Smooth Fade Transition */}
                        <img
                            key={fadeKeys[categoryIndex]}
                            src={item.images[currentImageIndices[categoryIndex]]}
                            alt={`Explore ${item.category}`}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000"
                            onLoad={(e) => e.target.classList.replace("opacity-0", "opacity-100")}
                        />
                    </div>

                    {/* Improved Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                        <h3 className="text-4xl font-semibold mb-2">{item.category}</h3>
                        <button className="text-yellow-500 text-2xl font-bold underline cursor-pointer transition-transform transform hover:scale-110">
                            {item.btn}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Explore;
    