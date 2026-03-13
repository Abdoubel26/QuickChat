import { useState } from "react";
import ChatContainer from "../components/ChatContainer"
import RightSideBar from "../components/RightSideBar"
import SideBar from "../components/SideBar"

export type userType = {
    _id: string,
    email: string,
    fullName: string,
    profilePic: string,
    bio: string
} 

export const initState: userType = {
  _id: '', email: '', fullName: '', profilePic: '', bio: ''
}

const HomePage = () => {

  const [selectedUser, setSelectedUser] = useState<userType>(initState);

  return (
    <div className="border w-full h-full sm:py-[5%] sm:px-[15%] ">
      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 grid-rows-[auto_1fr] relative ${ selectedUser !== initState ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_0.75fr]' : 'md:grid-cols-2'}`}>
        <SideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <RightSideBar  selectedUser={selectedUser}/>
      </div>
    </div>
  )
}

export default HomePage