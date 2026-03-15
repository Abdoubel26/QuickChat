import { Routes, Route, useNavigate } from "react-router"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage"
import { AuthProvider } from "./context/authContext"
import { useEffect } from "react"
import { useSocket } from "./context/socketContext"



function App() {

  const navigate = useNavigate()

  const { socket } = useSocket() 
  const id = localStorage.getItem('id')
  const token = localStorage.getItem('token')

  useEffect(() => {

    socket.on('connect', () => console.log('user connected') )
    if(!id && !token){
      navigate('/login')
    } else {
      navigate('/')
    }


  }, [])


  const content = ( 
       <>
    <div className="bg-[url('./src/assets/bgImage.svg')] h-screen bg-contain">
      <Routes>
        <Route  path='/' element={< HomePage />} />
        <Route  path='/login' element={<LoginPage />} />
        <Route  path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
    
    </>
  )

  return (
      <AuthProvider >
        {content}
      </AuthProvider>
  )
}

export default App
