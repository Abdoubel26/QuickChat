import Message from "../models/message.js";

export const getMessages = async (req, res) => {
    const { id } = req.userCrendentials
    const { secondUserId } = req.query
    if(!id || !secondUserId ) return res(400).json({ success: true, details: "User Credentials not provided!"})
        
    try {
        const Messages = await Message.find({ 
            $or:
            [
                {SenderId: secondUserId, ReceiverId: id}, 
                {SenderId: id, ReceiverId: secondUserId}
            ]} )
        res.status(200).json({ success: true, details: 'Message Got successfully', payload: Messages})
    } catch(e) {
        console.log(e.message)
        res.status(500).json({ success: false, details:' Server Error!'})
    }
}
