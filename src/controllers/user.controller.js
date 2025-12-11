import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async(req,res)=>{
    try {
        const {username,email,password} = req.body; // User se data le rhe hain

        if(!username || !email || !password){
            res.status(400).json({message:"All fields are required"});
            return;
        }

        // Check if user already exists
        const exixtingUser = await User.findOne({email});
        if(exixtingUser){
            res.status(409).json({message:"User already exists"});
            return;
        }
        // hash the password
        const hashPassword = await bcrypt.hash(password,10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password:hashPassword
        })
        await newUser.save();
        res.status(201).json({message:"User registered successfully", user:newUser});
        newUser.password = undefined; // Password ko response me nahi bhejna

        
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
        
    }
}

const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            res.status(400).json({message:"All fields are required"});
            return null;
        }

        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({message:"User not found"});
            return null;
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if(!passwordIsValid){
            res.status(401).json({message:"Invalid password"});
            return null;
        }

        const generateToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        user.password = undefined; // Password ko response me nahi bhejna

        res.status(200).json({message:"Login successful", user, token: generateToken});
        
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

export {registerUser, loginUser};