import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from local storage
    console.log(user)
    // if (!user || !user.isAdmin) {
    //     return <Navigate to="/" replace />;
    // }
    if (user.role === "admin") {
        return <Navigate to="/add-product" />
    }
    return children;
};

export default ProtectedRoute;
