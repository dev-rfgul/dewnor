
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faHeart, faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";



// const Navbar = () => {

//     const [menuOpen, setMenuOpen] = useState(false);
//     const [cart, setCart] = useState(1)


//     const cartLength = useSelector((state) => state.cart.items.length)
//     console.log(cartLength)
//     return (
//         <header className="bg-white shadow-md">
//             {/* Banner Section */}
//             <div className="italic text-black text-sm py-2 text-center">
//                 <p>Free Express Shipping in UAE ~ 30 Days Guarantee!</p>
//             </div>

//             <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//                 {/* Logo Section */}
//                 <Link
//                     to='/'
//                     className="flex items-center space-x-4">
//                     <img
//                         className="w-36 md:w-48 h-auto object-contain"
//                         src="https://www.dewnor.com/wp-content/uploads/2021/01/cropped-cropped-logo.png"
//                         alt="Dewnor Logo"
//                     />
//                 </Link>

//                 {/* Mobile Menu Button */}
//                 <button
//                     className="md:hidden text-black text-2xl focus:outline-none"
//                     onClick={() => setMenuOpen(!menuOpen)}
//                 >
//                     <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
//                 </button>

//                 {/* User Account, Wishlist, and Cart */}
//                 <div className="hidden md:flex items-center space-x-6">
//                     {/* User Account */}
//                     <div className="flex items-center space-x-2">
//                         <FontAwesomeIcon icon={faUser} className="text-black text-lg" />
//                         <div>
//                             <Link
//                                 to={'/profile'}
//                                 className="text-gray-500 text-sm"
//                             >My Account</Link>
//                             <nav>
//                                 <Link
//                                     to="/signup"
//                                     className="text-black font-semibold text-sm hover:text-gray-700 transition"
//                                 >
//                                     Signup
//                                 </Link>
//                                 <Link
//                                     to="/login"
//                                     className="ml-5 text-black font-semibold text-sm hover:text-gray-700 transition"
//                                 >
//                                     Login
//                                 </Link>
//                             </nav>
//                         </div>
//                     </div>

//                     {/* Wishlist Icon */}
//                     <div className="relative">
//                         <FontAwesomeIcon icon={faHeart} className="text-black text-lg" />
//                         <span className="absolute -top-2 -right-2 bg-lime-500 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                             0
//                         </span>
//                     </div>

//                     {/* Cart Icon */}
//                     <Link
//                         to={"/profile"}
//                     >
//                         <div className="relative">
//                             <FontAwesomeIcon icon={faShoppingCart} className="text-black text-lg" />
//                             <span className="absolute -top-2 -right-2 bg-lime-500 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                                 {cartLength > 0 ? cartLength : 0}
//                             </span>
//                         </div>
//                     </Link>

//                 </div>
//             </div>

//             {/* Submenu */}
//             <nav className="bg-yellow-800">
//                 <div className="container mx-auto px-4">
//                     <div
//                         className={`flex flex-col md:flex-row md:justify-evenly space-y-4 md:space-y-0 md:space-x-8 w-full h-auto md:h-14 items-center transition-all duration-300 ${menuOpen ? "block" : "hidden md:flex"
//                             }`}
//                     >
//                         <a href="#" className="text-black hover:text-lime-500 font-medium transition">
//                             Leather Wallets-Hand Stitched
//                         </a>
//                         <a href="#" className="text-black hover:text-lime-500 font-medium transition">
//                             Devices & Techs
//                         </a>
//                         <a href="#" className="text-black hover:text-lime-500 font-medium transition">
//                             Leather Bags
//                         </a>
//                         <a href="#" className="text-black hover:text-lime-500 font-medium transition">
//                             Store
//                         </a>
//                         <a href="#" className="text-black hover:text-lime-500 font-medium transition">
//                             Contact Us
//                         </a>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faHeart,
    faShoppingCart,
    faBars,
    faTimes,
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Get cart items from Redux store
    const cartItems = useSelector((state) => state.cart.items);
    const cartLength = cartItems?.length || 0;
    const wishlistItems = useSelector((state) => state.wishlist?.items || []);
    const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

    // Listen for scroll events to apply shadow/background change
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // Navbar menu items for better maintainability
    const navItems = [
        { id: 1, title: "Leather Wallets-Hand Stitched", path: "/wallets" },
        { id: 2, title: "Devices & Techs", path: "/devices" },
        { id: 3, title: "Leather Bags", path: "/bags" },
        { id: 4, title: "Store", path: "/store" },
        { id: 5, title: "Contact Us", path: "/contact" },
    ];

    return (
        <header className={`bg-white ${isScrolled ? 'shadow-lg fixed top-0 left-0 right-0 z-50 animate-fadeDown' : 'shadow-md'} transition-all duration-300`}>
            {/* Banner Section */}
            <div className="bg-yellow-50 italic text-black text-sm py-2 text-center">
                <p>Free Express Shipping in UAE ~ 30 Days Guarantee!</p>
            </div>

            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo Section */}
                <Link
                    to="/"
                    className="flex items-center space-x-4 transition-transform hover:scale-105"
                >
                    <img
                        className="w-36 md:w-48 h-auto object-contain"
                        src="https://www.dewnor.com/wp-content/uploads/2021/01/cropped-cropped-logo.png"
                        alt="Dewnor Logo"
                        loading="eager"
                    />
                </Link>

                {/* Mobile Menu Button */}
                <div className="flex items-center space-x-4 md:hidden">
                    <button
                        aria-label="Search"
                        className="text-black text-xl focus:outline-none p-2"
                        onClick={() => setSearchOpen(!searchOpen)}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <button
                        aria-label={menuOpen ? "Close Menu" : "Open Menu"}
                        className="text-black text-2xl focus:outline-none p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                    </button>
                </div>

                {/* Search Bar - Desktop */}
                <div className="hidden md:block flex-grow max-w-md mx-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-lime-500">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>

                {/* User Account, Wishlist, and Cart - Desktop */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* User Account */}
                    <div className="flex items-center space-x-2 group">
                        <FontAwesomeIcon icon={faUser} className="text-black text-lg group-hover:text-lime-500 transition-colors" />
                        <div>
                            <Link
                                to="/profile"
                                className="text-gray-500 text-sm hover:text-lime-500 transition-colors"
                            >
                                My Account
                            </Link>
                            {!isAuthenticated ? (
                                <nav>
                                    <Link
                                        to="/signup"
                                        className="text-black font-semibold text-sm hover:text-lime-500 transition-colors"
                                    >
                                        Signup
                                    </Link>
                                    <span className="mx-2 text-gray-300">|</span>
                                    <Link
                                        to="/login"
                                        className="text-black font-semibold text-sm hover:text-lime-500 transition-colors"
                                    >
                                        Login
                                    </Link>
                                </nav>
                            ) : (
                                <p className="text-sm text-lime-600">Welcome back!</p>
                            )}
                        </div>
                    </div>

                    {/* Wishlist Icon */}
                    <Link to="/wishlist" className="relative group">
                        <FontAwesomeIcon icon={faHeart} className="text-black text-lg group-hover:text-lime-500 transition-colors" />
                        <span className="absolute -top-2 -right-2 bg-lime-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all group-hover:scale-110">
                            {wishlistItems.length}
                        </span>
                    </Link>

                    {/* Cart Icon */}
                    <Link to="/profile" className="relative group">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-black text-lg group-hover:text-lime-500 transition-colors" />
                        <span className="absolute -top-2 -right-2 bg-lime-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all group-hover:scale-110">
                            {cartLength}
                        </span>
                    </Link>
                </div>
            </div>

            {/* Mobile Search - Conditional rendering */}
            {searchOpen && (
                <div className="px-4 py-2 md:hidden">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-lime-500">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            )}

            {/* Navigation Menu */}
            <nav className="bg-yellow-800">
                <div className="container mx-auto px-4">
                    <div
                        className={`flex flex-col md:flex-row md:justify-evenly space-y-4 md:space-y-0 md:space-x-8 w-full h-auto md:h-14 items-center transition-all duration-300 ${menuOpen ? "py-4" : "hidden md:flex"
                            }`}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className="text-white hover:text-lime-500 font-medium transition-colors relative group py-2 md:py-0"
                            >
                                {item.title}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile User Controls - Only visible when menu is open on mobile */}
            {menuOpen && (
                <div className="md:hidden bg-gray-100 p-4 flex justify-around">
                    <Link to="/profile" className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faUser} className="text-black text-lg mb-1" />
                        <span className="text-xs">Account</span>
                    </Link>
                    <Link to="/wishlist" className="flex flex-col items-center">
                        <div className="relative">
                            <FontAwesomeIcon icon={faHeart} className="text-black text-lg mb-1" />
                            <span className="absolute -top-2 -right-2 bg-lime-500 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {wishlistItems.length}
                            </span>
                        </div>
                        <span className="text-xs">Wishlist</span>
                    </Link>
                    <Link to="/cart" className="flex flex-col items-center">
                        <div className="relative">
                            <FontAwesomeIcon icon={faShoppingCart} className="text-black text-lg mb-1" />
                            <span className="absolute -top-2 -right-2 bg-lime-500 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {cartLength}
                            </span>
                        </div>
                        <span className="text-xs">Cart</span>
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;