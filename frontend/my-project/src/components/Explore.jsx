
// import React from 'react'

// const Explore = () => {
//     const data = [
//         {
//             img: "./images/explore/carousel-image-1.png",
//             text: 'Product A',
//             name: 'Wallets',
//             btn: 'Explore',
//         },
//         {
//             img: "./images/explore/carousel-image-2.jpeg",
//             text: 'Product B',
//             name: 'Gadegets',
//             price: '$199.99',
//             btn: 'Explore',
//         },
//         {
//             img: "./images/explore/carousel-image-3.jpeg",
//             text: 'Product C',
//             name: 'Bags',
//             price: '$299.99',
//             btn: 'Explore',
//         },
//     ]
//     return (
//         <>
//             <div>
//                 <h1 className="text-4xl font-bold text-center mt-10">Explore</h1>
//                 <p className="text-lg text-center mt-4">Discover our wide range of products</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
//                 {data.map((item, index) => (
//                     <div key={index} className="relative bg-white p-4 shadow-md">
//                         <img src={item.img} alt={item.text} className="w-full h-64 object-cover" />
//                         {/* Product Details */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
//                         <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10">
//                             <h3 className="text-5xl lg:text-6xl font-semibold">{item.name}</h3>
//                             <p className="underline text-5xl text-yellow-500 mt-2 lg:block">{item.btn}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//         </>
//     )
// }

// export default Explore

import React, { useEffect, useState } from 'react'

const Explore = () => {
    const data = [
        {
            category: "Wallet",
            images: [
                "/images/explore/wallet-image-1.jpg",
                "/images/explore/wallet-image-2.jpg",
                "/images/explore/wallet-image-3.jpg",
            ],
            name: "Wallet",
            btn: "Shop Now",
        },
        {
            category: "Gadgets",
            images: [
                "/images/explore/gadget-image-1.jpg",
                "/images/explore/gadget-image-3.jpg",
                "/images/explore/gadget-image-2.jpg",
            ],
            name: "Gadget",
            btn: "Shop Now",
        },
        {
            category: "Bags",
            images: [
                "/images/explore/bag-image-1.jpg",
                "/images/explore/bag-image-2.jpg",
            ],
            name: "Bags",
            btn: "Shop Now",
        },
    ];

    const [currentImageIndices, setCurrentImageIndices] = useState(
        data.map(() => Math.floor(Math.random() * data[0].images.length))
    );

    useEffect(() => {
        const intervals = data.map((_, categoryIndex) =>
            setInterval(() => {
                setCurrentImageIndices(prevIndices => {
                    const newIndices = [...prevIndices];
                    newIndices[categoryIndex] = Math.floor(Math.random() * data[categoryIndex].images.length);
                    return newIndices;
                });
            }, 2000)
        );

        return () => {
            intervals.forEach(clearInterval);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {data.map((item, categoryIndex) => (
                <div key={categoryIndex} className="relative bg-white p-4 shadow-md">
                    {/* Show the random image for each category */}
                    <img
                        src={item.images[currentImageIndices[categoryIndex]]}
                        alt={item.category}
                        className="w-full h-64 object-cover"
                    />
                    {/* Product Details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10">
                        <h3 className="text-5xl lg:text-6xl font-semibold">{item.name}</h3>
                        <p className="underline text-5xl text-yellow-500 mt-2 lg:block">{item.btn}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Explore;
