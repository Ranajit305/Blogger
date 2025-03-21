import User from "../models/user.model.js"
import Blog from "../models/blog.model.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js"
import cloudinary from "../db/cloudinary.js"

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: 'Fields Missing'})
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: 'Invalid Email'})
        }

        const isUser = await User.findOne({email});
        if (isUser) {
            return res.status(400).json({success: false, message: 'User already exists'})
        }

        if (password.length < 5) {
            return res.status(400).json({success: false, message: 'Weak Password'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();
        generateToken(newUser._id, res);
        res.status(200).json({success: true, user: {_id: newUser._id, name: newUser.name, email: newUser.email, profilePic: newUser.profilePic, createdAt: newUser.createdAt}, message: 'Welcome to Blogger'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({success: false, message: 'Fields Missing'});
        }
    
        if(!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: 'Enter a Valid Email'});
        }
    
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({success: false, message: 'User does not exists'});
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({success: false, message: 'Incorrect Password'});
        }
        
        generateToken(user._id, res);
        const currUser = await User.findById(user._id).select("-password");
        res.status(200).json({success: true, user: currUser, message: `Welcome Back ${user.name}`});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {maxAge: 0});
        res.status(200).json({success: true, message: 'Logged Out'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
          return res
            .status(400)
            .json({ success: false, message: "No Image Selected" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        await User.findByIdAndUpdate(
          req.user._id,
          { profilePic: uploadResponse.secure_url },
          { new: true }
        );
        res.status(200).json({ success: true, profilePic: uploadResponse.secure_url, message: "Profile Updated" });
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const checkUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const searchUser = async (req, res) => {
    try {
        const { name } = req.params;
        if (!name) {
            return res.status(400).json({success: false, message: 'Name Required'})
        }

        const users = await User.find({
            $and: [
                { _id: { $ne: req.user._id } },
                {
                    $or: [
                        { name: name }
                    ]
                }
            ]
        }).select('name profilePic');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const userAccount = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId === req.user._id) {
            return
        }
        const user = await User.findById(userId).select('-password -email');
        if (!user) {
            return res.status(404).json({success: false, message: 'User not Found'})
        }

        const blogs = await Blog.find({owner: userId}).sort({createdAt: -1})
        res.status(200).json({success: true, user, blogs})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const subscribeOrUnsubscribe = async (req, res) => {
    try {
        const { userId } = req.params;
        const isUser = await User.findById(userId);
        if (!isUser) {
            res.status(404).json({success: false, message: 'User not Found'})
        }

        const user = await User.findById(req.user._id);
        const subscribed = user.subscribe.includes(userId);
        if (subscribed) {
            user.subscribe.pull(userId);
            isUser.followers.pull(userId);
        } else {
            user.subscribe.push(userId);
            isUser.followers.push(userId);
        }
        await Promise.all([user.save(), isUser.save()]);
        user.subscribe.includes(userId) ? res.json('Subscribed') : res.json('Unsubscribed')
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}