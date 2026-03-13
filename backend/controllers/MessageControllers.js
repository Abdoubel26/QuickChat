import mongoose from "mongoose";
import express from "express"
import Message from "../models/message";



export const getMessages = async (req, res) => {
    const { userCredentials } = req
    const { secondUserId } = req.body
    if(!userCredentials || !secondUserId ) return res(400).json({ success: true, details: "User Credentials not provided!"})
    const {id, email} = userCredentials

    try {
        const Messages = await Message.find({ 
            $or:
            [
                {SenderId: secondUserId, ReceiverId: userCredentials.id}, 
                {SenderId: userCredentials.id, ReceiverId: secondUserId}
            ]} )
        res.status(200).json({ success: true, details: 'Message Got successfully', payload: Messages})
    } catch(e) {
        console.log(e.message)
        res.status(500).json({ success: false, details:' Server Error!'})
    }
}

export const sendMessage = async (req, res) => {
    const { userCredentials } = req
    const { SenderId, ReceiverId, Message} = req.body
    if(!userCredentials  || !SenderId || !ReceiverId || !Message) return res(400).json({ success: true, details: "User Credentials not provided!"})
    
    const NewMessage = {
        SenderId: SenderId,
        ReceiverId: ReceiverId,
        Message: Message,
    }
    try {
        const CreatedMessage = await Message.save(NewMessage)
        res.status(201).json({ success: true, details:"Message Sent Successfully"})
    } catch(e) {
        console.log(e.message)
        res.status(500).json({ success: false, details:' Server Error!'})
    }
}

