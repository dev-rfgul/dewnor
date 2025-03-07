
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

// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Carousel = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
    
//     // Custom arrow components
//     const NextArrow = (props) => {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={`${className} z-10 bg-white/80 hover:bg-white/90 w-12 h-12 rounded-full flex items-center justify-center shadow-md before:content-none right-2 lg:right-5`}
//                 style={{ ...style, display: "flex" }}
//                 onClick={onClick}
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
//                     <polyline points="9 18 15 12 9 6"></polyline>
//                 </svg>
//             </div>
//         );
//     };

//     const PrevArrow = (props) => {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={`${className} z-10 bg-white/80 hover:bg-white/90 w-12 h-12 rounded-full flex items-center justify-center shadow-md before:content-none left-2 lg:left-5`}
//                 style={{ ...style, display: "flex" }}
//                 onClick={onClick}
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
//                     <polyline points="15 18 9 12 15 6"></polyline>
//                 </svg>
//             </div>
//         );
//     };

//     // Enhanced settings
//     const settings = {
//         centerMode: true,
//         infinite: true,
//         autoplay: true,
//         autoplaySpeed: 5000,
//         slidesToShow: 1,
//         speed: 700,
//         arrows: true,
//         dots: true,
//         nextArrow: <NextArrow />,
//         prevArrow: <PrevArrow />,
//         beforeChange: (current, next) => setCurrentSlide(next),
//         pauseOnHover: true,
//         cssEase: "cubic-bezier(0.45, 0, 0.15, 1)",
//         appendDots: dots => (
//             <div style={{ bottom: "20px" }}>
//                 <ul className="flex justify-center items-center space-x-2"> {dots} </ul>
//             </div>
//         ),
//         customPaging: i => (
//             <button className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-blue-600 w-6" : "bg-gray-400"}`}></button>
//         ),
//         responsive: [
//             {
//                 breakpoint: 1280,
//                 settings: {
//                     slidesToShow: 1,
//                     centerPadding: "120px",
//                 },
//             },
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 1,
//                     centerPadding: "80px",
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                     centerPadding: "40px",
//                 },
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     centerPadding: "20px",
//                     centerMode: false,
//                 },
//             },
//         ],
//     };

//     // Enhanced data with more fields
//     const data = [
//         {
//             id: 1,
//             name: "Premium Headphones",
//             price: "$299",
//             originalPrice: "$399",
//             discount: "25% OFF",
//             rating: 4.8,
//             reviews: 154,
//             description: "Experience immersive sound with our noise-cancelling technology and premium materials for all-day comfort.",
//             img: "./images/carousel-image-1.png",
//             badge: "Best Seller",
//             colors: ["#000000", "#FFFFFF", "#6366F1"],
//             inStock: true,
//         },
//         {
//             id: 2,
//             name: "Smart Watch Series X",
//             price: "$399",
//             originalPrice: "$499",
//             discount: "20% OFF",
//             rating: 4.7,
//             reviews: 128,
//             description: "Track your fitness, receive notifications, and manage your life with this sleek, water-resistant smartwatch.",
//             img: "./images/carousel-image-2.jpeg",
//             badge: "New",
//             colors: ["#000000", "#FFFFFF", "#22C55E"],
//             inStock: true,
//         },
//         {
//             id: 3,
//             name: "Premium Wireless Speaker",
//             price: "$499",
//             originalPrice: "$649",
//             discount: "23% OFF",
//             rating: 4.9,
//             reviews: 203,
//             description: "Fill any room with incredible sound. Features 360° audio, 24-hour battery, and seamless connectivity.",
//             img: "./images/carousel-image-3.jpeg",
//             badge: "Limited",
//             colors: ["#000000", "#FFFFFF", "#EC4899"],
//             inStock: true,
//         },
//         {
//             id: 4,
//             name: "Professional Camera Lens",
//             price: "$899",
//             originalPrice: "$1099",
//             discount: "18% OFF",
//             rating: 4.6,
//             reviews: 87,
//             description: "Capture stunning details with this professional-grade lens. Perfect for portraits and landscape photography.",
//             img: "./images/carousel-image-4.jpeg",
//             badge: "Pro",
//             colors: ["#000000"],
//             inStock: false,
//         },
//     ];

//     // Star rating component
//     const StarRating = ({ rating }) => {
//         return (
//             <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                     <svg
//                         key={i}
//                         className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                 ))}
//                 <span className="ml-1 text-xs text-gray-200">{rating} ({data[currentSlide].reviews})</span>
//             </div>
//         );
//     };

//     // Color selection component
//     const ColorSelector = ({ colors }) => {
//         return (
//             <div className="flex items-center space-x-2 mt-2">
//                 {colors.map((color, index) => (
//                     <button
//                         key={index}
//                         className="w-5 h-5 rounded-full border border-white focus:ring-2 focus:ring-white"
//                         style={{ backgroundColor: color }}
//                         aria-label={`Color option ${index + 1}`}
//                     />
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <div className="relative carousel-container w-full md:w-11/12 lg:w-4/5 mx-auto my-16 px-4">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Featured Products</h2>
            
//             <div className="slider-wrapper">
//                 <Slider {...settings}>
//                     {data.map((item, index) => (
//                         <div key={item.id} className="outline-none px-2 py-4">
//                             <div className="carousel-item bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
//                                 <div className="flex flex-col lg:flex-row">
//                                     {/* Image Container */}
//                                     <div className="relative lg:w-7/12">
//                                         <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
//                                             {item.badge && (
//                                                 <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                                                     {item.badge}
//                                                 </div>
//                                             )}
                                            
//                                             <img
//                                                 src={item.img}
//                                                 alt={item.name}
//                                                 className="w-full h-full object-cover"
//                                             />
                                            
//                                             {!item.inStock && (
//                                                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                                                     <span className="bg-white/90 text-gray-800 font-medium px-6 py-3 rounded">Out of Stock</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
                                    
//                                     {/* Content Container */}
//                                     <div className="lg:w-5/12 p-6 lg:p-8 flex flex-col">
//                                         <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{item.name}</h3>
                                        
//                                         <div className="flex items-center my-2">
//                                             <StarRating rating={item.rating} />
//                                         </div>
                                        
//                                         <div className="mt-1">
//                                             <span className="text-xl md:text-2xl font-bold text-blue-600">{item.price}</span>
//                                             {item.originalPrice && (
//                                                 <span className="ml-2 text-sm text-gray-500 line-through">{item.originalPrice}</span>
//                                             )}
//                                             {item.discount && (
//                                                 <span className="ml-2 text-xs font-medium text-green-600">{item.discount}</span>
//                                             )}
//                                         </div>
                                        
//                                         <p className="mt-4 text-gray-600">{item.description}</p>
                                        
//                                         <div className="mt-4">
//                                             <div className="text-sm text-gray-600 mb-1">Available Colors</div>
//                                             <ColorSelector colors={item.colors} />
//                                         </div>
                                        
//                                         <div className="mt-auto pt-6 flex flex-wrap gap-3">
//                                             <button 
//                                                 className={`px-6 py-3 rounded-lg text-sm font-medium flex-1 min-w-[120px] ${
//                                                     item.inStock 
//                                                         ? "bg-blue-600 hover:bg-blue-700 text-white" 
//                                                         : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                                 }`}
//                                                 disabled={!item.inStock}
//                                             >
//                                                 {item.inStock ? "Add to Cart" : "Out of Stock"}
//                                             </button>
//                                             <button className="px-4 py-3 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50">
//                                                 Quick View
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
            
//             <div className="flex justify-center mt-8">
//                 <span className="text-sm text-gray-500">
//                     Showing {currentSlide + 1} of {data.length} products
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default Carousel;