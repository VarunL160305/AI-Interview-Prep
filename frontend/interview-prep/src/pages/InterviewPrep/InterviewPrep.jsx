import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {AnimatePresence,motion} from "framer-motion"
import { LuCircleAlert,LuListCollapse } from 'react-icons/lu'
import {toast} from "react-hot-toast"
import axios from "axios"

import SpinnerLoader from '../../components/Loaders/SpinnerLoader'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import RoleInfoHeader from './components/RoleInfoHeader'

const interviewPrep = () => {
  const {sessionId}=useParams()

  const [sessionData,setSessionData]=useState(null)
  const [error,setError]=useState("")

  const [openLearnMoreModal,setOpenLoadMoreModal]=useState(false)
  const [explanation,setExplanation]=useState("")

  const [loading,setLoading]=useState(false)
  const [isUpdateLoader,setIsUpdateLoader]=useState(false)

  const fetchSessionDetailById=async()=>{
    try{
      const token=localStorage.getItem('token')
      const response=await axios.get(`http://localhost:8000/sessions/${sessionId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(response.data && response.data.session){
        setSessionData(response.data.session)
      }
    }catch(err){
      console.error("Error",err)
    }
  }

  const generateExplanation=async (question) => {
    
  }

  const toggleQuestionPin=async (questionId) => {
    
  }

  const generateMoreQuestions=async () => {
    
  }

  useEffect(()=>{
    if(sessionId){
      fetchSessionDetailById()
    }
  },[])

  return (
    <>
      <DashboardLayout>
        <RoleInfoHeader role={sessionData?.role || ""} topicsToFocus={sessionData?.topicsToFocus || ""} experience={sessionData?.experience || ""} questions={sessionData?.questions.length || "-"} description={sessionData?.description || ""} lastUpdated={sessionData?.updatedAt?new Date(sessionData?.updatedAt).toLocaleDateString("en-GB"):""}>
        </RoleInfoHeader>
      </DashboardLayout>
    </>
  )
}

export default interviewPrep