import { type User } from "./types";


const API_URL_USER: string = "http://localhost:5000/api/user"
const API_URL_MESSAGES: string = "http://localhost:5000/api/messages"

export const registerUser = async (user: User) => {

    console.log('registerUser is running...')
    const { fullname, email, password, bio } = user

  const res = await fetch(`${API_URL_USER}/signup`, {
     method: "POST", 
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify({ fullname, email, password, bio }),
     credentials: 'include'
    })

    return res.json()
}


export const loginUser = async (email: string, password: string) => {

    console.log('sending login requrest...')

    const res  = await fetch(`${API_URL_USER}/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}), 
        credentials: 'include'
    })
    return res.json()
}

export const updateUser = async (fullname: string, bio: string, id: string) => {
    console.log("sending Update profile request...")

    const res = await fetch(`${API_URL_USER}/update`, 
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fullname, bio, id})
        })
    return res.json()
}

export const getOneUser = async (id: string) => {
    const res = await fetch(`${API_URL_USER}/getOneUser?id=${id}`, {
        method: 'GET', 
        headers: {
            "Content-Type": "application/json"
        }   
    })
    return res.json()
}

export const getusers = async () => {
    const res = await fetch(`${API_URL_USER}/getUsers`, {
        method: 'GET'
    })
    return res.json()
}

export const getMessages = async (secondUserId: string, token: string) => {

    console.log('getMessages service running...')

    const res =  await fetch(`${API_URL_MESSAGES}?secondUserId=${secondUserId}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "authorization": `Bearer ${token}`
        }
    })
    return res.json()
}

