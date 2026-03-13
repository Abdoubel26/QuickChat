import { type User } from "./types";


const API_URL: string = "http://localhost:5000/api/user"

export const registerUser = async (user: User) => {

    console.log('registerUser is running...')
    const { fullname, email, password, bio } = user

  const res = await fetch(`${API_URL}/signup`, {
     method: "POST", 
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify({ fullname, email, password, bio }),
     credentials: 'include'
    })

    return res.json()
}


export const loginUser = async (email: string, password: string) => {

    console.log('sending login requrest...')

    const res  = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}), 
        credentials: 'include'
    })
    return res.json()

}



