import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const register = async (req, res) => {
    const {fullname, email, password, bio} = req.body

    if(!fullname || !email || !bio || !password){
        return res.status(400).json({ success: false, details: "Missing required Fields"})
    }

    const existingUser = await User.findOne({email: email})
    if(existingUser){
        res.status(400).json({ success: false, details:" Email Already Registered"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const CreatedUser = new User({ fullname, email, hashedPassword, bio})
    try {
        await CreatedUser.save()
        const token = jwt.sign(
                {id: CreatedUser.id, email: CreatedUser.email },
                process.env.JWT_SECRET, 
                {expiresIn: "1d"}
            )
        res.status(201).send({ success: true, details: "User Registered successfully", user: CreatedUser, token: token})

    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, details:"Server Error!"})
    }
}


export const login = async (req, res) => {
    console.log('backend login controller is running!')
    const {email, password, } = req.body
    if(!email, !password){res.status(400).json({ success: false, details:"Missing required fields"})}
    const existingUser = await User.findOne({email: email})
    if(!existingUser) return res.status(404).json({success: false, details: "Email not Found, Please Register"})

    const isMatch = bcrypt.compare(password, existingUser.hashedPassword)
    try {
        if(isMatch){
            const token = jwt.sign(
                {id: existingUser.id, email: existingUser.email },
                process.env.JWT_SECRET, 
                {expiresIn: "1d"}
            )
           res.status(200).json({success: true, details: "logged in successfully", token: token, user: existingUser }) 
        }
        else if(!isMatch) {
            res.status(400).json({ success: false, details:"Wrong Credentials"})
        }
    } catch(e) {
        console.log(e.message)
        res.status(500).json({ success: false, details:"Server Error!"})
    }
}

export const updateProfile = async (req, res) => {
    const {fullname, bio, id } = req.body
    if(!fullname || !bio) return res.status(400).json({ success: false, details: "Missing required fields"})
    try {
        const updateduser = await User.findByIdAndUpdate( id, {fullname, bio})
        if(!updateduser) return res.status(400).json({ success: false, details:"user not found!"})
        const token = jwt.sign(
            {id: updateduser.id, email: updateduser.email}, 
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        res.status(200).json({ success: true, details: "Updated Successfully!", token: token, user: updateduser})
    }
    catch(e) {
        console.log(e.message)
        res.status(500).json({ success: false, details: "Server Error!"})
    }
}