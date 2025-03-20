import User from "../models/user.model.js"
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js"
import cloudinary from "../db/cloudinary.js"

export const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: 'Fields Missing'})
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: 'Invalid Email'})
        }

        const isUser = await User.findOne({email});
        if (isUser) {
            return res.status(400).json({success: false, message: 'User already Exists'});
        }

        if (password.length < 5) {
            return res.status(400).json({sucess: false, message: 'Weak Password'});
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
    
        generateToken(newUser._id, res);
        await newUser.save();
        const user = await User.findById(newUser._id).select('-password');
        res.status(200).json({success: true, user, message: 'Welcome to Chatty'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({success: false, message: 'Fields Missing'});
        }
    
        if(!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: 'Enter a Valid Email'});
        }
    
        const isUser = await User.findOne({email});
        if (!isUser) {
            return res.status(400).json({success: false, message: 'User does not exists'});
        }

        const isPassword = await bcrypt.compare(password, isUser.password);
        if (!isPassword) {
            return res.status(400).json({success: false, message: 'Incorrect Password'});
        }
    
        generateToken(isUser._id, res);
        const user = await User.findById(isUser._id).select('-password');
        res.status(200).json({success: true, user: user, message: `Welcome Back ${user.name}`});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt', {maxAge: 0});
        res.status(200).json({success: true, message: 'Logged Out'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const profile = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const editProfile = async (req, res) => {
    try {
        const { name, profilePic } = req.body;
        // if (!name && !profilePic) {
        //     return res.status(400).json({success: false, message: ''})
        // }


        let image_url = '';

        let cloudinaryResponse = null;
        if (profilePic) {
            cloudinaryResponse = await cloudinary.uploader.upload(profilePic, {folder: 'ProfilePic'})
        }

        if (cloudinaryResponse) {
            image_url = cloudinaryResponse.secure_url;
        }

        await User.findByIdAndUpdate(req.user._id, {profilePic: image_url}, {new: true})
        res.status(200).json({success: true, message: 'Profile Updated', profilePic: image_url})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}