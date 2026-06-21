import React from 'react'
import { Link } from 'react-router-dom'

import ProfileInfoCard from '../Cards/ProfileInfoCard'

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-white border-bottom sticky-top"
      style={{backdropFilter: "blur(2px)",zIndex: 1030}}>
      <div className="container d-flex justify-content-between align-items-center">
        <h2 className="mb-0 fw-medium text-dark" style={{fontSize: "1.25rem",lineHeight: "1.25rem",}}>
          Interview Prep AI
        </h2>

        <ProfileInfoCard />
      </div>
    </nav>
  )
}


export default Navbar