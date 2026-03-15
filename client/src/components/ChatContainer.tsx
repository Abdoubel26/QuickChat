import { useEffect, useState } from "react";
import assets from "../assets/assets"
import { initState } from "../pages/HomePage"
import { formatMessageTime } from "../lib/utils";
import { type User } from "../lib/types";
import { useSocket } from "../context/socketContext";
import { getMessages } from "../lib/services";
import { useAuth } from "../context/authContext";

interface Message {
  SenderId: string, 
  ReceiverId: string,
  text: string,
  createdAt: string,
}

type PropTypes = {
    selectedUser: User;
    setSelectedUser: React.Dispatch<React.SetStateAction<User>>
}

const ChatContainer = ({selectedUser, setSelectedUser}: PropTypes ) => {

  const { socket } = useSocket()
  const {user, token} = useAuth()


  useEffect(() => {

    const loadmessages = async () => {
      const res = await getMessages(selectedUser._id!, token)
      if(res.success){
        setMessages(res.payload)
      } else {
        alert(res.details)
      }
    }
    if(selectedUser !== initState){
      loadmessages()
    }
  }, [selectedUser] )

  useEffect(() => {
      socket.on('receive-message', (message: Message) => {
      setMessages(prev => [ ...prev, message])
      })  
      
      return () => {
        socket.off('receive-message')
      }
  }, [socket])

  const handleSend = () => {
    if(user){
      const messageToSend: Message = {
      SenderId: user._id as string,
      ReceiverId: selectedUser._id as string,
      text: messageText,
      createdAt: new Date().toISOString()
    }
    socket.emit('send-message', (messageToSend))
    setMessageText('')
    }
  }

  const [messages, setMessages] = useState<Message[]>([])
  const [messageText, setMessageText] = useState<string>('')

  return selectedUser !== initState  ? (
    <div className=" flex flex-col min-h-0">
      
            { /* header */ }
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500 mb-1">

        <img src={assets.arrow_icon}  onClick={() => setSelectedUser(initState) } className="w-5"></img>
        <img src={assets.avatar_icon} className=" w-15 rounded-full "></img>
        <p className="text-white flex-1 text-lg gap-2 items-center ">{selectedUser.fullname}

         <span className="px-2 select-none">🟢</span>
        </p>
        <div className="flex gap-5">
          
          <img src={assets.help_icon} className="w-5 mx-4 "></img>
        </div>
      </div>
      { /* chat area */ }

      <div className="flex-1 min-h-0 overflow-y-auto">
        {messages.map((msg, indx) =>(
          <div key={indx} className={`flex items-end justify-end gap-2 ${msg.SenderId !== user._id && 'flex-row-reverse'}` }>
            { <p className={`p-2 max-w-50 md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.SenderId === user._id ? 'rounded-br-none ' : 'rounded-bl-none' } `}> {msg.text } </p>}
            <div className="text-center text-xs">
              <img src={assets.avatar_icon} alt='' className="w-7 rounded-full"/> 
              <p className="text-gray-500" >{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}

      </div>
        { /* ---------- bottom area -------- */ }

        <div className=" absolute w-[50%]  bottom-0  flex items-center gap-3 p-3" >
          <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full" >
            <input type="text" onChange={(e) => setMessageText(e.target.value)} value={messageText} placeholder="Send a message" 
            className=" rounded-2xl text-sm p-3 text-white placeholder-gray-400 flex-1 border-none outline-none "></input>
            <input type="file" id='image' accept="image/png, image/jpeg" hidden></input>
            <label htmlFor="image">
              <img src={assets.gallery_icon} className="w-5 mr-2 cursor-pointer"  />
            </label>
          </div>
        <img src={assets.send_button} className="w-7 cursor-pointer" onClick={handleSend} />
        </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
    <div className="bg-linear-to-t from-blue-600 to-blue-300 rounded-2xl w-90 h-90 flex flex-col justify-center items-center  mt-5">
      <img src={assets.logo_icon} className="max-w-16"></img>
      <p className="text-white font-semibold py-2  text-2xl">Chat Anytime, Anywhere</p>
    </div>
    </div>
  )
}

export default ChatContainer
