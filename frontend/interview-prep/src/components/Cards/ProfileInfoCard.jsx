import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

const ProfileInfoCard = () => {
    const navigate=useNavigate()

    const {user,clearUser}=useContext(UserContext)

    const handleLogout=()=>{
        clearUser()
        navigate('/')
    }
    return user && (
        <>
            <div className="d-flex align-items-center">
                <img src={user.profileImageUrl} alt="Profile" className="rounded-circle me-3" style={{width: "44px",height: "44px",objectFit: "cover",backgroundColor: "#d1d5db"}}/>
                <div>
                    <div className="fw-bold text-dark"style={{fontSize: "15px",lineHeight: "1"}}>
                        {user.name || ""}
                    </div>

                    <button className="btn btn-link p-0 text-warning fw-semibold text-decoration-none" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfileInfoCard