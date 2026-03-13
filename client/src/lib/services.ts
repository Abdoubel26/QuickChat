import { type User } from "./types";


const API_URL: string = "http://localhost:5000/api/user"

export const registerUser = async (user: User) => {
    const { fullname, email, password, bio } = user

  const res = await fetch(`${API_URL}/signup`, {
     method: "POST", 
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify({ fullname, email, password, bio })
    })

    return res.json()
}


export const loginUser = async (email: string, password: string) => {

    const res  = await fetch(`${API_URL}/login`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    })
    return res.json()
}



