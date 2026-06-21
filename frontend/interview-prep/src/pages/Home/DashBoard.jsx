import React, { useEffect, useState } from 'react'
import {LuPlus} from "react-icons/lu"
import toast from "react-hot-toast"
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import {CARD_BG} from "../../utils/data"
import SummaryCard from "../../components/Cards/SummaryCard"
import Modal from "../../components/Modal"
import CreateSessionForm from "../Home/CreateSessionForm"

const Dashboard = () => {
  const navigate=useNavigate()

  const [openCreateModal,setOpenCreateModal]=useState(false)
  const [session,setSession]=useState([])
  const [openDeleteAlert,setOpenDeleteAlert]=useState({
    open:false,
    data:null
  })

  const fetchAllSession=async () => {
    try{
      const token=localStorage.getItem('token')
      const response=await axios.get("http://localhost:8000/sessions/my-session",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setSession(response.data)
    }catch(err){
      console.error("Error fetching session data",err)
    }
  }

  const deleteSession=async () => {
    
  }

  useEffect(()=>{
    fetchAllSession()
  },[])

  return (
    <>
      <DashboardLayout>
        <div className="container py-4">
          <div className="row g-4 pb-4">
            {session?.map((data,idx)=>{
              return (
              <div key={data._id} className="col-lg-4 col-md-6">
                <SummaryCard colors={CARD_BG[idx%CARD_BG.length]} role={data.role} topicsToFocus={data.topicsToFocus || ""} experience={data.experience} questions={data.questions.length || "-"} description={data.description || "-"} lastUpdated={data.updatedAt?new Date(data.updatedAt).toLocaleDateString("en-GB"):""} onSelect={()=>navigate(`/interview-prep/${data._id}`)} onDelete={()=>setOpenDeleteAlert({open:true,data})}/>
              </div> )
            })}
          </div>

          <button
            className="btn position-fixed d-flex align-items-center gap-2 px-4 py-3 rounded-pill fw-semibold text-white"
            style={{
              bottom: "40px",
              right: "40px",
              background:
                "linear-gradient(135deg, #f4a95d 0%, #FF7212 100%)",
              border: "none",
              boxShadow: "0 4px 15px rgba(229, 108, 28, 0.25)",
              transition: "all 0.25s ease",
              zIndex: 1050,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow="0px 10px 20px 2px #f4a95d"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow="0px 0px 0px"
            }}
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus size={20} />
            <span>Add New</span>
          </button>
        </div>
        <Modal isOpen={openCreateModal} onClose={()=>setOpenCreateModal(false)} hideHeader>
          <div>
            <CreateSessionForm/>
          </div>
        </Modal>
      </DashboardLayout>
    </>
  )
}

export default Dashboard