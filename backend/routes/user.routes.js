import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'





import userModel from '../models/user.model.js';



const router = express.Router();



router.get('/test', (req, res) => {
    res.send('test route')
    console.log(process.env.JWT_SECRET)
})
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        res.status(400).json('User already exists')
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
        name,
        email,
        password: hashPassword,
        isAdmin: "user"
    });
    await user.save();
    res.status(200).json({ message: 'User Created', user })
})
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, user.password);
//         if (!isPasswordCorrect) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Proceed to send success response
//         res.status(200).json({ message: 'Login success', user });

//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });
// Update user role API

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access (XSS protection)
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict', // Helps with CSRF protection
            maxAge: 60 * 60 * 1000 // 1 hour expiration
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });


    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


router.put("/update-role", async (req, res) => {
    const { userId, role } = req.body;

    if (!userId || !role) {
        return res.status(400).json({ message: "User ID and role are required." });
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, { role }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ message: "Role updated successfully!", user: updatedUser });
    } catch (error) {
        console.error("Error updating role:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
router.get('/get-users', async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).json(users)
    }
    catch (error) {
        console.log(error)
    }
})

export default router;
