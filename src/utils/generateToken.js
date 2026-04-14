import jwt from "jsonwebtoken"

const generateToken = (_id) => {
    return jwt.sign(
        { _id },
        import.meta.env.VITE_JWT_SECRET,
        { expiresIn: "1d" })
}

export { generateToken }