import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import axios from "axios"

import Input from '../../components/Inputs/Input'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { validateEmail, validatePassword } from '../../utils/helper'
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'

const SignUp = ({ setCurrentPage }) => {

  const [userData, setUserData] = useState({
    profilePic: null,
    username: "",
    email: "",
    password: ""
  })
  const [error,setError]=useState(null)

  const navigate = useNavigate()

  const {updateUser}=useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValidEmail=validateEmail(userData.email)
    const isValidPassword=validatePassword(userData.password)

    let profilePicURL=""
        
    if(!userData.username && !isValidEmail && !isValidPassword){
      setError("enter a valid email, password and username")
      return
    }

    if(!isValidEmail && !isValidPassword){
      setError('enter a valid email and password')
      return
    }

    if(!userData.username){
      setError("enter a valid username")
      return
    }

    if(!isValidEmail){
      setError('enter a valid email')
      return
    }

    if(!isValidPassword){
      setError('enter a valid password')
      return
    }

    setError('')

    //Tomorrow basic data send api catch works after completing some backend stuffs commit all changes
    try{
      if(userData.profilePic){
        const imgUploadResponse=await uploadImage(userData.profilePic)
        profilePicURL=imgUploadResponse.imageUrl || ""
      } 

      const response=await axios.post("http://localhost:8000/auth/register",{
        name:userData.username,
        email:userData.email,
        password:userData.password,
        profilePic:profilePicURL
      })

      const {token}=response.data
      if(token){
        localStorage.setItem('token',token)
        updateUser(response.data)
        navigate('/dashboard')
      }
    }catch(err){
      if(err.response && err.response.data.message){
        setError(err.response.data.message)
      }
      else{
        setError("Something went wrong. Please try again")
      }
    }

  }

  return (
    <div className="p-4 p-md-5 d-flex flex-column justify-content-center" style={{width: "90vw",maxWidth: "500px"}}>
      <h3 className="fs-4 fw-semibold text-dark">
        Create an Account
      </h3>

      <p className="small text-secondary mt-1 mb-4">
        Join us today by entering your details below
      </p>

      <form onSubmit={handleSubmit}>
        <ProfilePhotoSelector image={userData} setImage={setUserData}/>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <Input placeholder="Enter username" value={userData.username} onChange={(e) =>setUserData({...userData,username: e.target.value})}/>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <Input placeholder="abc@gmail.com" value={userData.email}  onChange={(e) =>setUserData({...userData,email: e.target.value})}/>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Enter Password
          </label>

          <Input type="password" value={userData.password} onChange={(e) =>setUserData({...userData,password: e.target.value})}/>
          {error && (
              <span className='' style={{color:'red'}}>{error}</span>
            )}
        </div>

        <button type="submit" className="btn btn-dark w-100 py-2">
          Sign Up
        </button>

        <p className="text-center mt-3 mb-0 small">
          Already have an account?{" "}
          <button type="button" className="btn btn-link p-0 text-decoration-none" onClick={() => setCurrentPage('login')} style={{marginBottom:"5px"}}>
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp