import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar'

const DashboardLayout = ({children}) => {
    const {user}=useContext(UserContext)
  return (
    <div>
        {user && (
            <div>
                <Navbar/>
                <div>{children}</div>
            </div>)
        }
    </div>
  )
}

export default DashboardLayout