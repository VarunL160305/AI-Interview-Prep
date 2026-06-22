import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

import Input from '../../components/Inputs/Input'
import SpinnerLoader from '../../components/Loaders/SpinnerLoader'

const CreateSessionForm = () => {

    const [formData,setFormData]=useState({
        role:"",
        experience:"",
        topicsToFocus:"",
        description:""
    })
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    const navigate=useNavigate()

    const handleChange=(key,e)=>{
        setFormData(formData=>({...formData,[key]:e.target.value}))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const {role,topicsToFocus,experience}=formData
        if(!role || !topicsToFocus || !experience){
            setError("Please fill all the required fields")
            return
        }
        if(experience>50){
            setError("experience should be less than 50 Years")
        }
        setError("")
        setLoading(true)
    

        try{
            const token=localStorage.getItem('token')
            const AIResponse=await axios.post("http://localhost:8000/ai/generate-questions",{
                role:formData.role,
                experience:formData.experience,
                topicsToFocus:formData.topicsToFocus,
                numberOfQuestions:10
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const generatedQuestions=AIResponse.data
            
            const response=await axios.post("http://localhost:8000/sessions/create",{
                ...formData,questions:generatedQuestions
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(response)
            if(response && response.data.session._id){
                navigate(`/interview-prep/${response.data.session._id}`)
            }
        }catch(err){
            if(err.response && err.response.data.message){
                setError(err.response.data.message)
            }
            else{
                setError("Something went wrong. Please try again")
            }
        }finally{
            setLoading(false)
        }
    }


  return (
    <>
        <div className="p-4 p-md-5 d-flex flex-column justify-content-center" style={{ width: "90vw", maxWidth: "500px" }}>
            <h3 className="fs-4 fw-semibold text-dark">
                Start a New Interview Journey
            </h3>
            <p className="small text-secondary mt-1 mb-4">
                Fill out the following details to get your personalized set of interview questions.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <Input
                        value={formData.role}
                        onChange={(e) => handleChange("role", e)}
                        placeholder="Frontend Developer, AI Engineer, etc."
                        type="text"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Experience</label>
                    <Input
                        value={formData.experience}
                        onChange={(e) => handleChange("experience", e)}
                        placeholder="e.g. 2"
                        type="number"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Topics To Focus</label>
                    <Input
                        value={formData.topicsToFocus}
                        onChange={(e) => handleChange("topicsToFocus", e)}
                        placeholder="React, Node.js, MongoDB"
                        type="text"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <Input
                        value={formData.description}
                        onChange={(e) => handleChange("description", e)}
                        placeholder="Any specific goals for this session"
                        type="text"
                    />
                </div>

                {error && (
                <div className="text-danger small mb-3">
                    {error}
                </div>
                )}

                <button type="submit" className="btn btn-dark w-100 py-2 d-flex justify-content-center align-items-center gap-2" disabled={loading} >
                {loading && <SpinnerLoader />}
                    Create Session
                </button>
            </form>
        </div>
    </>
  )
}

export default CreateSessionForm