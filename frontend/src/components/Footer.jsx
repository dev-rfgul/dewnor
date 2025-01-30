
// import React from 'react';
// import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';

// const Footer = () => {
//     return (
//         <footer className="text-white ">
//             <div className=" bg-yellow-800 container mx-auto px-6 md:px-12">
//                 {/* Main Content: Links and Social */}
//                 <div className="flex flex-col md:flex-row justify-evenly items-start md:items-center">
//                     {/* Quick Links */}
//                     <div className=" mt-5 mb-6 md:mb-0">
//                         <h4 className="text-3xl font-semibold mb-4">Quick Links</h4>
//                         <ul className="grid grid-cols-2 gap-2 text-sm">
//                             <li><a href="#" className="hover:text-yellow-300">Home</a></li>
//                             <li><a href="#" className="hover:text-yellow-300">About Us</a></li>
//                             <li><a href="#" className="hover:text-yellow-300">My Account</a></li>
//                             <li><a href="#" className="hover:text-yellow-300">Contact</a></li>
//                             <li><a href="#" className="hover:text-yellow-300">Privacy Policy</a></li>
//                             <li><a href="#" className="hover:text-yellow-300">Shipping and Returns</a></li>
//                         </ul>
//                     </div>

//                     {/* Social Links */}
//                     <div>
//                         <h4 className="text-3xl font-semibold mb-4">Get Social</h4>
//                         <ul className="flex space-x-6 text-lg ">
//                             <li>
//                                 <a href="#" className="flex items-center sm:text- hover:text-yellow-300 ">
//                                     <FaFacebook className="mr-2 md:text-md" /> Facebook
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="flex items-center hover:text-yellow-300">
//                                     <FaInstagram className="mr-2 md:text-md" /> Instagram
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="flex items-center hover:text-yellow-300">
//                                     <FaPinterest className="mr-2 md:text-md" /> Pinterest
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="border-t border-yellow-700 my-6"></div>

//                 {/* Bottom Row */}
//                 <div className="flex flex-col md:flex-row justify-between items-center text-sm ">
//                     <p className="text-gray-400">&copy; 2024 Dewnor. All rights reserved.</p>
//                     <p className="text-gray-400 mb-9">
//                         Powered by <a href="#" className="text-yellow-300 hover:text-yellow-400 ">Dewnor</a>
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from 'react';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-white bg-yellow-800 w-full py-10">
            <div className="max-w-6xl mx-auto px-6 md:px-20 lg:px-32">
                {/* Main Content: Links and Social */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h4 className="text-2xl font-semibold mb-4">Quick Links</h4>
                        <ul className="grid grid-cols-2 gap-3 text-sm">
                            {["Home", "About Us", "My Account", "Contact", "Privacy Policy", "Shipping & Returns"].map((link, index) => (
                                <li key={index}>
                                    <a href="#" className="hover:text-yellow-300">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="text-center md:text-left">
                        <h4 className="text-2xl font-semibold mb-4">Get Social</h4>
                        <ul className="flex flex-col md:flex-row md:justify-start items-center space-y-3 md:space-y-0 md:space-x-6 text-lg">
                            {[{icon: FaFacebook, name: "Facebook"}, {icon: FaInstagram, name: "Instagram"}, {icon: FaPinterest, name: "Pinterest"}].map(({icon: Icon, name}, index) => (
                                <li key={index}>
                                    <a href="#" className="flex items-center space-x-2 hover:text-yellow-300">
                                        <Icon className="text-xl" />
                                        <span>{name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-yellow-700 my-6"></div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
                    <p>&copy; 2024 Dewnor. All rights reserved.</p>
                    <p className="mt-3 md:mt-0">
                        Powered by <a href="#" className="text-yellow-300 hover:text-yellow-400">Dewnor</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
