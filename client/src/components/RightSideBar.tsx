import { initState } from "../pages/HomePage"
import assets, { imagesDummyData } from "../assets/assets"
import { type User } from "../lib/types"

type PropTypes = {
    selectedUser: User;
}


const RightSideBar = ({selectedUser} : PropTypes) => {

  return selectedUser !== initState  && (
    <div className=" w-full relative overflow-y-scroll ">
      <div className="pt-10 flex flex-col items-center gap-2 text-xs font-light mx-auto">
      <img src={assets.avatar_icon} className="w-15 aspect-square rounded-full "/>
      <h1 className="px-7 text-center w-full text-lg  whitespace-nowrap text-white font-medium mx-auto flex items-center gap-2">
        <p className="w-2 h-2 rounded-full bg-green-500 text-white"></p>
        {selectedUser.fullname}
      </h1>
      <p className="text-center mx-auto text-white">{selectedUser.bio}</p>
    </div>
    <hr className="border-white my-4" />

    <div className="px-5 text-xs" >
      <p>Media</p>
      <div className="mt-1 max-h-50 overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 ">
       {imagesDummyData.map((url, indx) =>(
        <div key={indx} className="cursor-pointer rounded" onClick={()=> window.open(url)}>
          <img src={url} ></img>
          
          </div>
          
       ) )}

       
      </div>
    </div>
   
    </div>
  ) 
}

export default RightSideBar
