//To generate the jwt token 

import jwt from 'jsonwebtoken';
export const generateToken = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,  // 7 days
        httpOnly:true,  // Only transmit the token via HTTPS and prevents XSS attacks cross-site scripting
        secure: process.env.NODE_ENV !== "development",        
        sameSite:"strict" // Enforces strict SameSite cookie policy
    })

    return token;
};
