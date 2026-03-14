import Message from "../models/message.js";

export const getMessages = async (req, res) => {
    const { id, secondUserId } = req.query
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

export const sendMessage = async (req, res) => {
    const { userCredentials } = req.body
    const { ReceiverId, MessageReceived} = req.body
    if(!userCredentials || !ReceiverId || !MessageReceived) return res(400).json({ success: true, details: "User Credentials not provided!"})
    
    const NewMessage = new Message({
        SenderId: userCredentials.id,
        ReceiverId: ReceiverId,
        text: MessageReceived,
    })
    try {
        const CreatedMessage = await NewMessage.save()
        res.status(201).json({ success: true, details:"Message Sent Successfully", NewMessage: NewMessage})
    } catch(e) {
        console.log(e.message)
        res.status(500).json({ success: false, details:' Server Error!'})
    }
}
