import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET);

        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict'
        })
    } catch (error) {
        console.log("JWT Error: ", error.message);
    }
}