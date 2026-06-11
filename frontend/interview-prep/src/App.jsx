import React from 'react'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/DashBoard'
import InterviewPrep from './pages/InterviewPrep/InterviewPrep'

import {APP_FEATURES} from './utils/data'

const router=createBrowserRouter([
  {path:'/',element:<LandingPage/>},
  {path:'/login',element:<Login/>},
  {path:'/signup',element:<SignUp/>},
  {path:'/dashboard',element:<Dashboard/>},
  {path:'/interview-prep/:sessionId',element:<InterviewPrep/>}
])

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster toastOptions={{className:"",style:{fontSize:"13px",},}}/></>
  )
}

export default App