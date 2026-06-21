import React,{createContext,useState,useEffect} from 'react'
import axios from "axios"

export const UserContext=createContext()

const UserProvider = ({children}) => {

  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    if(user){
      return
    }
    const accessToken=localStorage.getItem('token')
    if(!accessToken){
      setLoading(false)
      return
    }

    const fetchUser=async () => {
      try{
        const response=await axios.get("http://localhost:8000/auth/profile",{
          headers:{
            "Authorization":`Bearer ${accessToken}`
          }
        })
        setUser(response.data)
      }
      catch(err){
        console.error("User not authorized")
        clearUser()
      }
      finally{
        setLoading(false)
      }
    }
    fetchUser()
  },[])

  const updateUser=(userData)=>{
    setUser(userData)
    localStorage.setItem('token',userData.token)
    setLoading(false)
  }

  const clearUser=()=>{
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <>
      <UserContext.Provider value={{user,loading,updateUser,clearUser}}>
        {children}
      </UserContext.Provider>
    </>
  )
}

export default UserProvider