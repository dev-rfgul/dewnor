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
    res.status(401).json({ message: 'User Created', user })
})

export default router;