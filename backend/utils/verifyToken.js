import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(404).json({success: false, message: 'Unauthorized: No Token Provided'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(404).json({success: false, message: 'Unauthorized: Invalid Token'})
        }

        const user = await User.findById(decoded.userId).select('-password');
        req.user = user;
        next();
    } catch (error) {
        console.log("Token Verification Error: ", error.message)
    }
}