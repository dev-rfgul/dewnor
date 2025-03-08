// import jwt from 'jsonwebtoken';

// const verifyAdmin = (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         console.log("🔹 Token received:", token); // Log the token

//         if (!token) {
//             console.log("⛔ No token found! Unauthorized access.");
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("✅ Decoded Token:", decoded); // Log decoded token

//         if (decoded.role !== "admin") {
//             console.log(`⛔ User "${decoded.email}" is not an admin. Access Denied!`);
//             return res.status(403).json({ message: "Forbidden" });
//         }

//         req.user = decoded;
//         console.log(`✅ Admin "${decoded.email}" verified successfully!`);
//         next();
//     } catch (err) {
//         console.log("⛔ Invalid token:", err.message);
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

// export default verifyAdmin;

import jwt from 'jsonwebtoken';

const verifyAdmin = (req, res, next) => {
    try {
        // Support both Cookie & Authorization Header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        console.log("🟡 All Cookies:", req.cookies);
        console.log("🔹 Token received:", token); 

        if (!token) {
            console.log("⛔ No token found! Unauthorized access.");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        if (decoded.role !== "admin") {
            console.log(`⛔ User "${decoded.email}" is not an admin. Access Denied!`);
            return res.status(403).json({ message: "Forbidden" });
        }

        req.user = decoded;
        console.log(`✅ Admin "${decoded.email}" verified successfully!`);
        next();
    } catch (err) {
        console.log("⛔ Invalid token:", err.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

export default verifyAdmin;
