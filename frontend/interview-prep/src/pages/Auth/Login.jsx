import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../../components/Inputs/Input'
import { validateEmail,validatePassword } from '../../utils/helper'

const Login = ({ setCurrentPage }) => {

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [error,setError]=useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isValidEmail=validateEmail(userData.email)
    const isValidPassword=validatePassword(userData.password)
    
    if(!isValidEmail && !isValidPassword){
      setError('enter a valid email and password')
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

    //Tomorrow basic data send api catch works
  }

  return (
    <>
      <div className="p-4 p-md-5 d-flex flex-column justify-content-center" style={{width: "90vw",maxWidth: "500px"}}>
        <h3 className="fs-4 fw-semibold text-dark">
          Welcome Back
        </h3>
        <p className="small text-secondary mt-1 mb-4">
          Please Enter your details to log in
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <Input type="text" id="email" className="form-control" placeholder="abc@gmail.com" value={userData.email} onChange={(e) =>setUserData({...userData,email:e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Input type="password" id="password" className="form-control" value={userData.password} onChange={(e) =>setUserData({...userData,password:e.target.value})}/>
            {error && (
              <span className='' style={{color:'red'}}>{error}</span>
            )}
          </div>


          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>

          <p className="text-center mt-3 mb-0">
            Don't have an account?{" "}
            <button type="button" className="btn btn-link p-0 text-decoration-none" onClick={() => setCurrentPage("signup")}>
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login