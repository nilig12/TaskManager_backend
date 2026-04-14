import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";


const jwtVerify = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        //token missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }

        const decoded = jwt.verify(token, import.meta.env.VITE_JWT_SECRET)

        const user = await User.findById(decoded._id)


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }

        req.user = user
        next();

    } catch (error) {
        return res.status(401)
            .json({
                success: false,
                message: "Unauthorized, invalid token",
            })

    }

}

export { jwtVerify }