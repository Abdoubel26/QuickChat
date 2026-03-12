import { type userType } from "../pages/HomePage"
import assets from "../assets/assets"
type PropTypes = {
    selectedUser: userType;
}

const RightSideBar = ({selectedUser} : PropTypes) => {
  return selectedUser && (
    <div>
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
      <img src={selectedUser.profilePic || assets.avatar_icon} className="w-20 aspect-square rounded-full "/>
      <h1 className="px-10 w-full text-lg border border-white whitespace-nowrap text-white font-medium mx-auto flex items-center gap-2">
        <p className="w-2 h-2 rounded-full bg-green-500 text-white"></p>
        {selectedUser.fullName}
      </h1>
      <p className="px-10 mx-auto text-white">{selectedUser.bio}</p>
    </div>
    </div>
  ) 
}

export default RightSideBar
