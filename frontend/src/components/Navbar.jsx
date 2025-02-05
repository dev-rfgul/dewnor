
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Signup from './Signup';
import Login from './Login'


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                        className="w-36 md:w-48 h-auto object-contain"
                        src="https://www.dewnor.com/wp-content/uploads/2021/01/cropped-cropped-logo.png"
                        alt="Dewnor Logo"
                    />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-black text-2xl focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                </button>

                {/* User Account, Wishlist, and Cart */}
                <div className="hidden md:flex items-center space-x-6">
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
                        <span className="absolute -top-2 -right-2 bg-lime-500 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            0
                        </span>
                    </div>
                </div>
            </div>

            {/* Submenu */}
            <nav className="bg-yellow-800">
                <div className="container mx-auto px-4">
                    <div
                        className={`flex flex-col md:flex-row md:justify-evenly space-y-4 md:space-y-0 md:space-x-8 w-full h-auto md:h-14 items-center transition-all duration-300 ${menuOpen ? "block" : "hidden md:flex"
                            }`}
                    >
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
