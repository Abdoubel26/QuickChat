import assets from  "../assets/assets"
import { useState } from "react"
import { updateUser } from "../lib/services"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {

  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const stringUser = localStorage.getItem("user")
  if(!stringUser) return null;
  const user = JSON.parse(stringUser)

  const [fullname, setFullname] = useState<string>(user.fullname)
  const [bio, setBio] = useState<string>(user.bio)

  const handleSave = async () => {
    const response = await updateUser(fullname, bio, user._id)
    if(response.success) {
      setAuth(response.user, response.token)
    } else {
      alert(response.details)
      console.log(response.details)
    }
  }

  return (
    <div className=" min-h-screen flex flex-col justify-center h-full items-center bg-cover bg-center">
      <div className="backdrop-blur-2xl flex flex-row rounded-2xl p-12 justify-evenly border-2 border-stone-500">

        <div className="flex flex-col justify-end  mr-12">
        <img src={assets.arrow_icon}  className="w-4 absolute top-5 left-5" onClick={() => navigate('/')} ></img>
          <h2 className="text-white text-2xl m-5 ">Profile Details</h2>

          <div className="m-2">
            <input type="file" accept="image/png, image/jpeg" id="pfp" hidden />
            <label htmlFor="pfp" className="flex flex-row items-center" >
              <img src={assets.avatar_icon} className="w-14" /><p className="text-white text-xl mx-2 ">Uplaod Profile Image</p>
            </label>
          </div>

          
            <input type="text" onChange={(e) => setFullname(e.target.value)} value={fullname} placeholder="Full Name" className="focus:outline-none border text-white border-gray-400 focus:ring-2 rounded-sm  p-1 placeholder:text-gray-400 text-xl m-2 focus:ring-blue-500 outline-none  "  required/>
            <textarea rows={4} onChange={(e) => setBio(e.target.value)} value={bio} placeholder="Biography" className="focus:outline-none text-white focus:ring-2 rounded-sm border border-gray-400  p-1 placeholder:text-gray-400 text-xl m-2 focus:ring-blue-500 outline-none flex-1 "  required/>

            <button onClick={handleSave} className="bg-linear-to-l from-blue-600 to to-blue-400 rounded-full text-white text-lg p-2 mt-4 ">
              Save
            </button>

        </div>

        <div className="h-full flex flex-col ml-12 justify-center items-center">

          <img src={assets.logo_icon}  className="m-2  w-40" />

        </div>

      </div>
    </div>
  )
}

export default ProfilePage
