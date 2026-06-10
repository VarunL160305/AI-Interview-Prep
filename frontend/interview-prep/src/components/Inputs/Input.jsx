import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({type,className='',placeholder,value,onChange,label}) => {

  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="mb-3">
      <div className="position-relative">
        <input
          type={
            type === "password"
              ? (showPassword ? "text" : "password")
              : type
          }
          className={`form-control py-2 ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        

        {type === "password" && (
          <span
            className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
            style={{
              cursor: "pointer",
              zIndex: 5
            }}
            onClick={togglePassword}
          >
            {showPassword ? (
              <FaRegEye style={{color:'orange'}} size={18}  />
            ) : (
              <FaRegEyeSlash style={{color:'orange'}} size={18} />
            )}
          </span>
        )}

      </div>

    </div>
  )
}

export default Input