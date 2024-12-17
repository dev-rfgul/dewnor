"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 1000, // 2 seconds
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "40px",
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "20px",
                },
            },
        ],
    };

    const data = [
        {
            name: "A",
            age: 20,
            review:
                "Hello I am Fahad, and I want to say that styling is fun and I love it.",
            img: "./images/carousel-image-1.png",
        },
        {
            name: "B",
            age: 25,
            review:
                "GST Registration was never this easy. Register your sales tax with Befiler Now.",
            img: "./images/carousel-image-2.jpeg",
        },
        {
            name: "C",
            age: 30,
            review:
                "GST Registration was never this easy. Register your sales tax with Befiler Now.",
            img: "./images/carousel-image-3.jpeg",
        },
  
    ];

    return (
        <div className="w-full m-auto overflow-hidden">
            <div className="mt-20">
                <Slider {...settings}>
                    {data.map((d, index) => (
                        <div
                            key={index}
                            className="w-full h-[500px]  bg-repeat bg-center"
                        ></div>
                    ))}
                </Slider>
            </div>
        </div>
    );
    
    
};

export default Carousel;
