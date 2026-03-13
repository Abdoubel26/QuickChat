import { useEffect, useRef, useState } from "react";
import assets from "../assets/assets"
import { initState, type userType } from "../pages/HomePage"
import { formatMessageTime } from "../lib/utils";
import { connectSocket, getSocket } from "../modules/socket";


interface Message {
  SenderId: string, 
  ReceiverId: string,
  text: string,
  image?: string
  CreatedAt: string,
}


type PropTypes = {
    selectedUser: userType;
    setSelectedUser: React.Dispatch<React.SetStateAction<userType>>
}

const ChatContainer = ({selectedUser, setSelectedUser}: PropTypes ) => {


  const [messages, setMessage] = useState<Message[]>([])

  const scrollEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollEnd.current) scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return selectedUser !== initState  ? (
    <div className=" flex flex-col min-h-0">
      
            { /* header */ }
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500 mb-1">

        <img src={assets.arrow_icon}  onClick={() => setSelectedUser(initState) } className="w-5"></img>
        <img src={assets.profile_martin} className=" w-15 rounded-full "></img>
        <p className="text-white flex-1 text-lg gap-2 items-center ">Martin Johnson

         <span className="px-2 select-none">🟢</span>
        </p>
        <div className="flex gap-5">
          
          <img src={assets.help_icon} className="w-5 mx-4 "></img>
        </div>
      </div>
      { /* chat area */ }

      <div className="flex-1 min-h-0 overflow-y-auto">
        {messages.map((msg, indx) =>(
          <div key={indx} className={`flex items-end justify-end gap-2 ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}` }>
            {msg.image ? <img src={msg.image}></img> : <p className={`p-2 max-w-50 md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none ' : 'rounded-bl-none' } `}> {msg.text } </p>}
            <div className="text-center text-xs">
              <img src={msg.SenderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt='' className="w-7 rounded-full"/> 
              <p className="text-gray-500" >{formatMessageTime(msg.CreatedAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>

      </div>
        { /* ---------- bottom area -------- */ }

        <div className="absoulte bottom-0 left-0 right-0 flex items-center gap-3 p-3" >
          <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full" >
            <input type="text" placeholder="Send a message" 
            className=" rounded-2xl text-sm p-3 text-white placeholder-gray-400 flex-1 border-none outline-none "></input>
            <input type="file" id='image' accept="image/png, image/jpeg" hidden></input>
            <label htmlFor="image">
              <img src={assets.gallery_icon} className="w-5 mr-2 cursor-pointer"  />
            </label>
          </div>
        <img src={assets.send_button} className="w-7 cursor-pointer" />
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
