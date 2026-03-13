import { Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage"
import { AuthProvider } from "./context/authContext"

function App() {

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
