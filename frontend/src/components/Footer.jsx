
import React from 'react';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-white ">
            <div className=" bg-yellow-800 container mx-auto px-6 md:px-12">
                {/* Main Content: Links and Social */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    {/* Quick Links */}
                    <div className=" mt-5 mb-6 md:mb-0">
                        <h4 className="text-3xl font-semibold mb-4">Quick Links</h4>
                        <ul className="grid grid-cols-2 gap-2 text-sm">
                            <li><a href="#" className="hover:text-yellow-300">Home</a></li>
                            <li><a href="#" className="hover:text-yellow-300">About Us</a></li>
                            <li><a href="#" className="hover:text-yellow-300">My Account</a></li>
                            <li><a href="#" className="hover:text-yellow-300">Contact</a></li>
                            <li><a href="#" className="hover:text-yellow-300">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-yellow-300">Shipping and Returns</a></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-3xl font-semibold mb-4">Get Social</h4>
                        <ul className="flex space-x-6 text-lg">
                            <li>
                                <a href="#" className="flex items-center hover:text-yellow-300">
                                    <FaFacebook className="mr-2" /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center hover:text-yellow-300">
                                    <FaInstagram className="mr-2" /> Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center hover:text-yellow-300">
                                    <FaPinterest className="mr-2" /> Pinterest
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-yellow-700 my-6"></div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm ">
                    <p className="text-gray-400">&copy; 2024 Dewnor. All rights reserved.</p>
                    <p className="text-gray-400 mb-9">
                        Powered by <a href="#" className="text-yellow-300 hover:text-yellow-400 ">Dewnor</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
