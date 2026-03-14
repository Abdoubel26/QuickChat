import { useState } from "react"
import assets from "../assets/assets"
import { registerUser, loginUser } from "../lib/services";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

type loginOrSignup = 'Log in' | 'Sign up';


const LoginPage: React.FC = () => {

  const navigate = useNavigate()

  const { setAuth} = useAuth()

  const [fullname, setFullname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [isDataSubmitted, setIsDataSubmitted] = useState<boolean>(false)
  const [currState, setCurrState] = useState<loginOrSignup>('Sign up')

  const onSubmitHandler =  async (event: any)=> {
    event.preventDefault();

    
    if(currState === "Log in" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      const response = await loginUser(email, password)
      if(response.success){
        setAuth(response.user, response.token)
        navigate("/")
      } else {
        alert(response.details)
        console.log(response.details)
      }
      return;
    }
    else if(currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
    } else if (currState === 'Sign up' && isDataSubmitted) {
        const response = await registerUser({fullname, password, email, bio})
      if(response.success){
        setAuth(response.user, response.token)
        console.log(response.user)
        navigate('/')
      } else {
        alert(response.details)
        console.log(response.details)
      }
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img src={assets.logo_big} className="w-[min(30vw,250px)]"></img>

      <form onSubmit={onSubmitHandler} className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 reounded-lg shadow-lg">
      <h2 className=" font-medium text-2xl flex justify-between items-center">
        {currState}
        {isDataSubmitted && (<img src={assets.arrow_icon} onClick={()=> setIsDataSubmitted(false)} className="w-5 cursor-pointer"/>)}
        
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input type='text' className="p-2 border border-gray-500 rounded-md focus:outline-none"  onChange={(e) => setFullname(e.target.value)} value={fullname} placeholder="Full Name" required/>
        )} 

        {!isDataSubmitted && (
          <>
          <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required placeholder="Email Address"></input>
          <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required placeholder="Password"></input>
          </>
        )}

        {
          currState === "Sign up" && isDataSubmitted && (
            <textarea rows={4} className="p-2 border broder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Write Your Biography Here" onChange={(e)=>{
              setBio(e.target.value)
            }}  value={bio} required ></textarea>
          )
        }

        <button className="py-3 bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer" type="submit">
          {currState === "Sign up" ? "Create Account" : "Log in Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
        <input type="checkbox" className="mx-2 align-middle"/>
        <p>Agree to the terms of use & privacy policy</p>
      </div>

      <div className=" flex flex-col gap-2">
        {currState === "Sign up" ? ( <p>Already have an account? <span className="hover:underline hover:text-blue-400 cursor-pointer" onClick={()=> {setCurrState('Log in')}}>Login here</span></p>) : (<p>Don't have an account? <span className="hover:underline hover:text-blue-400 cursor-pointer" onClick={()=> {setCurrState('Sign up')}}>Singup here</span></p>)}

      </div>
      </form>

     
    </div>
  )
}

export default LoginPage
