import assets from  "../assets/assets"


const ProfilePage = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center h-full items-center bg-cover bg-center">
      <div className="backdrop-blur-2xl flex flex-row rounded-2xl p-12 justify-evenly border-2 border-stone-500">

        <div className="flex flex-col justify-end  mr-12">

          <h2 className="text-white text-2xl m-5 ">Profile Details</h2>

          <div className="m-2">
            <input type="file" accept="image/png, image/jpeg" id="pfp" hidden />
            <label htmlFor="pfp" className="flex flex-row items-center" >
              <img src={assets.avatar_icon} className="w-14" /><p className="text-white text-xl mx-2 ">Uplaod Profile Image</p>
            </label>
          </div>

          
            <input type="text"  placeholder="Full Name" className="focus:outline-none border text-white border-gray-400 focus:ring-2 rounded-sm  p-1 placeholder:text-gray-400 text-xl m-2 focus:ring-blue-500 outline-none  "  required/>
            <textarea rows={4} placeholder="Biography" className="focus:outline-none text-white focus:ring-2 rounded-sm border border-gray-400  p-1 placeholder:text-gray-400 text-xl m-2 focus:ring-blue-500 outline-none flex-1 "  required/>

            <button className="bg-linear-to-l from-blue-600 to to-blue-400 rounded-full text-white text-lg p-2 mt-4 ">
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
