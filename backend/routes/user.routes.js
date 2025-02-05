import express from 'express';
import bcrypt from 'bcrypt'
import userModel from '../models/user.model.js';


const router = express.Router();


router.get('/test', (req, res) => {
    res.send('test route')
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
    });
    await user.save();
    res.status(200).json({ message: 'User Created', user })
})
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

        // Proceed to send success response
        res.status(200).json({ message: 'Login success' });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


export default router;