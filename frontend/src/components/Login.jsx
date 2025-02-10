import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Button clicked");

        // Send a POST request to your backend with the provided email and password
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, { email, password })
            .then((result) => {
                console.log(result);
                const userData = result.data.user;
                localStorage.setItem("user", JSON.stringify(userData))
                console.log(userData)
                // Check the email to determine the redirection path
                if (userData.role === "admin") {
                    navigate('/admin', { state: { user: userData } }); // Redirect to admin page
                } else {
                    navigate('/', { state: { user: userData } });
                    // Redirect to user page
                }
            })
            .catch((error) => {
                // Log the error for debugging purposes
                console.error("Error during login:", error);
            });
    };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-800 text-white px-4">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">
                            Welcome Back
                        </h2>
                    </div>
                    <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
                        Log in to your account
                    </p>
                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email} // Add controlled value
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password} // Add controlled value
                                className="mt-1 block w-full px-4 py-3 border border-gray-300  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            Log In
                        </button>
                    </form>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to='/signup'
                            className="text-blue-200 hover:underline"
                        >
                            Sign Up
                        </Link>

                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
