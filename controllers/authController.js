import User from "../models/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
    const {name, email, password} = req.body

try {
        const userExists = await User.findOne({ email })

    if (userExists) {
        return res.status(400).json({ mwssage: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ message: "Invalid User Data"})
    } 
} catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
} 

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email });


        if(user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(401).json({ message: "Invalid email or password"})
        } 
    } catch (error) {
        res.status(500).json({ message: "internal Server Error"})
    }
}


export {
    loginUser,
    registerUser
}