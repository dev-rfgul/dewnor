import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <header className="bg-white shadow-md">
            {/* Banner Section */}
            <div className="italic text-black text-sm py-2 text-center">
                <p>Free Express Shipping in UAE ~ 30 Days Guarantee!</p>
            </div>

            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <img
                        className="w-48 h-auto object-contain"
                        src="https://www.dewnor.com/wp-content/uploads/2021/01/cropped-cropped-logo.png"
                        alt="Dewnor Logo"
                    />
                </div>

                {/* User Account, Wishlist, and Cart */}
                <div className="flex items-center space-x-6">
                    {/* User Account */}
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faUser} className="text-black text-lg" />
                        <div>
                            <p className="text-gray-500 text-sm">My Account</p>
                            <a
                                href="#"
                                className="text-black font-semibold text-sm hover:text-gray-700 transition"
                            >
                                Signup & Login
                            </a>
                        </div>
                    </div>

                    {/* Wishlist Icon */}
                    <div className="relative">
                        <FontAwesomeIcon icon={faHeart} className="text-black text-lg" />
                        <span className="absolute -top-2 -right-2 bg-lime-500 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            0
                        </span>
                    </div>

                    {/* Cart Icon */}
                    <div className="relative">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-black text-lg" />
                        <span className="absolute -top-2 -right-2  text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            0
                        </span>
                    </div>
                </div>
            </div>

            {/* Submenu */}
            <nav className="bg-brown-800 py-2">
                <div className="container mx-auto px-4">
                    <div className="flex justify-evenly space-x-8 bg-yellow-800 w-full h-14  items-center">
                        <a href="#" className="text-black hover:text-lime-500 font-medium transition">
                            Leather Wallets-Hand Stitched
                        </a>
                        <a href="#" className="text-black hover:text-lime-500 font-medium transition">
                            Devices & Techs
                        </a>
                        <a href="#" className="text-black hover:text-lime-500 font-medium transition">
                            Leather Bags
                        </a>
                        <a href="#" className="text-black hover:text-lime-500 font-medium transition">
                            Store
                        </a>
                        <a href="#" className="text-black hover:text-lime-500 font-medium transition">
                            Contact Us
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
