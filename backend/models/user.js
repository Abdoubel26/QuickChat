import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    hashedPassword: String,
    bio: String,
})

export default mongoose.model("User", userSchema)