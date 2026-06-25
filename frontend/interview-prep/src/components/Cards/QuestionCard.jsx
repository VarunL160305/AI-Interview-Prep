import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu'

import AiResponsePreview from '../../pages/InterviewPrep/components/AiResponsePreview'

const QuestionCard = ({question,answer,isPinned,onToggle,onLearnMore}) => {
  const [isExpanded,setIsExpanded]=useState(false)
  const [height,setHeight]=useState(0)
  const contentRef=useRef(null)

  useEffect(()=>{
    if(isExpanded){
      const contentHeight=contentRef.current.scrollHeight
      setHeight(contentHeight+10)
    }else{
      setHeight(0)
    }
  },[isExpanded])

  const toggleExpand=()=>{
    setIsExpanded(!isExpanded)
  }
  return (
    <>
      <div className="card border-0 shadow-sm mb-4" style={{overflow: "hidden"}}>
        <div className="card-body py-4 px-4">
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-start gap-3">
              <span className="fw-semibold text-secondary" style={{ fontSize: "15px" }}>
                Q
              </span>
              <h6 className="mb-0 fw-medium text-dark" style={{cursor: "pointer",marginRight: "5rem", }} onClick={toggleExpand}>
                {question}
              </h6>
            </div>
            <div className="d-flex align-items-center ms-3">
              <div className="d-flex">
                <button className="btn btn-sm btn-outline-primary me-2 d-flex align-items-center gap-2" onClick={onToggle}>
                  {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
                </button>
                <button
                  className="btn btn-sm btn-outline-info me-2 d-flex align-items-center gap-2"
                  onClick={() => {
                    setIsExpanded(true)
                    onLearnMore()}}>
                  <LuSparkles />
                  <span className="d-none d-md-inline">
                    Learn More
                  </span>
                </button>
              </div>
              <button className="btn btn-link text-secondary p-0" onClick={toggleExpand}>
                <LuChevronDown size={20} style={{transform: isExpanded?"rotate(180deg)":"rotate(0deg)",transition: "transform .3s"}}/>
              </button>
            </div>
          </div>
          <div style={{maxHeight: `${height}px`,overflow: "hidden",transition: "max-height .3s ease-in-out"}}>
            <div ref={contentRef} className="mt-4 bg-light rounded p-3 text-secondary">
              <AiResponsePreview content={answer}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard