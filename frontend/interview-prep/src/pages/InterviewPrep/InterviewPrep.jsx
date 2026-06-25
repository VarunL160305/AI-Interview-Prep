import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {AnimatePresence,motion} from "framer-motion"
import { LuCircleAlert,LuListCollapse } from 'react-icons/lu'
import {toast} from "react-hot-toast"
import axios from "axios"

import SpinnerLoader from '../../components/Loaders/SpinnerLoader'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import QuestionCard from '../../components/Cards/QuestionCard'
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
    try{

    }catch(err){

    }
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
        <RoleInfoHeader role={sessionData?.role || ""} topicsToFocus={sessionData?.topicsToFocus || ""} experience={sessionData?.experience || ""} questions={sessionData?.questions.length || "-"} description={sessionData?.description || ""} lastUpdated={sessionData?.updatedAt?new Date(sessionData?.updatedAt).toLocaleDateString("en-GB"):""}/>
        <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
          <h2 className="text-lg font-semibold color-black">
            Interview Q & A
          </h2>
          <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
            <div className={`col-span-12 ${openLearnMoreModal?"md:col-span":"md:col-span-8"}`}>
              <AnimatePresence>
                {sessionData?.questions?.map((data,index)=>{
                  return (
                  <motion.div key={data._id || index} initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:0.95}} transition={{duration:0.4,type:"spring",stiffness:100,delay:index*0.1,damping:15}} layout layoutId={`question-${data._id || index}`}>
                    <QuestionCard question={data?.question} answer={data?.answer} onLearnMore={()=>generateExplanation(data.question)} isPinned={data?.isPinned} onToggle={()=>toggleQuestionPin(data._id)}/>
                  </motion.div>)
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default interviewPrep