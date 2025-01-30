// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";  // Correct CSS import
// import "slick-carousel/slick/slick-theme.css";  // Correct CSS import

// // Your component logic goes here


// const Carousel = () => {
//     const settings = {
//         className: "center",
//         centerMode: true,
//         infinite: true,
//         centerPadding: "50px",
//         autoplay: true,
//         autoplaySpeed: 3000,
//         slidesToShow: 1,
//         speed: 500,
//         arrows: true, // Enable next/prev arrows
//         dots: true, // Add navigation dots
//         focusOnSelect: true,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 2,
//                     centerPadding: "30px",
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                     centerPadding: "20px",
//                 },
//             },
//         ],
//     };

//     const data = [
//         {
//             name: "Product A",
//             price: "$299",
//             description: "High-quality product with great features and performance.",
//             img: "./images/carousel-image-1.png",
//         },
//         {
//             name: "Product B",
//             price: "$399",
//             description: "Amazing features for the price. A must-have!",
//             img: "./images/carousel-image-2.jpeg",
//         },
//         {
//             name: "Product C",
//             price: "$499",
//             description: "Perfect blend of quality and design. Get it before it's gone!",
//             img: "./images/carousel-image-3.jpeg",
//         },
//     ];

//     return (
//         <div className="carousel-container w-11/12 lg:w-3/4 mx-auto mt-16">
//             <Slider {...settings}>
//                 {data.map((item, index) => (
//                     <div
//                         key={index}
//                         className="carousel-item bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
//                     >
//                         <div className="relative h-[400px] lg:h-[500px]">
//                             <img
//                                 src={item.img}
//                                 alt={`${item.name}`}
//                                 className="w-full h-full object-cover"
//                             />
//                             {/* Overlay for better text visibility */}
//                             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
//                             {/* Product Details */}
//                             <div className="absolute bottom-4 left-6 text-white z-10">
//                                 <h3 className="text-xl lg:text-2xl font-semibold">
//                                     {item.name}
//                                 </h3>
//                                 <p className="text-lg">{item.price}</p>
//                                 <p className="text-sm mt-2 hidden lg:block">
//                                     {item.description}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     );
// };

// export default Carousel;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const settings = {
        centerMode: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        speed: 500,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "40px",
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "20px",
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "10px",
                },
            },
        ],
    };

    const data = [
        {
            name: "Product A",
            price: "$299",
            description: "High-quality product with great features and performance.",
            img: "./images/carousel-image-1.png",
        },
        {
            name: "Product B",
            price: "$399",
            description: "Amazing features for the price. A must-have!",
            img: "./images/carousel-image-2.jpeg",
        },
        {
            name: "Product C",
            price: "$499",
            description: "Perfect blend of quality and design. Get it before it's gone!",
            img: "./images/carousel-image-3.jpeg",
        },
    ];

    return (
        <div className="carousel-container w-full md:w-3/4 mx-auto mt-10">
            <Slider {...settings}>
                {data.map((item, index) => (
                    <div key={index} className="carousel-item bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-4 left-6 text-white z-10">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{item.name}</h3>
                                <p className="text-sm sm:text-lg">{item.price}</p>
                                <p className="text-xs sm:text-sm mt-2 hidden md:block">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
