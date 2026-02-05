import User from "../models/usermodel";
import bcrypt from 'bcrypt'
import { jwt } from "jsonwebtoken";

// 1. REGISTER A NEW USER
exports.registerUser = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        // Check if all fields are provided
        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the user
        const newUser = new User({
            fullName,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ 
            message: "User created successfully! Please login." 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. LOGIN USER
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        // Send token and basic user info back to frontend
        res.status(200).json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};