import mongoose from 'mongoose'


const MessagesSchema = new mongoose.Schema({
    SenderId: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    ReceiverId: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    Message: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

MessagesSchema.index({SenderId: 1, ReceiverId: 1, createdAt: 1})


export default mongoose.model("Message", MessagesSchema)