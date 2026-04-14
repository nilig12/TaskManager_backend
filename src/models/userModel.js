import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
}, { timeStamps: true })

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    })
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    },
        import.meta.env.ACCESS_TOKEN_SECRET,
        { expiresIn: import.meta.env.ACCESS_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,

    }, import.meta.env.REFRESH_TOKEN_SECRET,
        { expiresIn: import.meta.env.REFRESH_TOKEN_EXPIRY }
    )
}

export const User = mongoose.model("User", userSchema)