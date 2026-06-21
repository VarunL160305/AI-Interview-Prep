import React from 'react'
import { LuTrash2 } from 'react-icons/lu'

const SummaryCard = ({colors,role,description,experience,topicsToFocus,questions,lastUpdated,onSelect,onDelete}) => {
    const experienceDuration=parseInt(experience)
    return (
        <>
            <div className="card border-1 h-100 position-relative" style={{ cursor: "pointer",transition:"all 0.25s ease"}} 
                onMouseEnter={(e)=>{
                    e.currentTarget.style.transform="translateY(-4px)"
                    e.currentTarget.style.boxShadow="0 5px 5px rgba(0,0,0,0.15)"
                }} 
                onMouseLeave={(e)=>{
                    e.currentTarget.style.transform="translateY(0)"
                    e.currentTarget.style.boxShadow=""
                }}
                onClick={onSelect}>
                <div className="card-body rounded-top p-4  position-relative mt-1" style={{ background: colors.bgColor }}>
                    <div className="d-flex justify-content-between align-items-start flex-wrap">
                        <div className="bg-white rounded d-flex align-items-center justify-content-center me-3" style={{ width: "48px", height: "48px" }}>
                            <span className="fw-semibold fs-5">
                                {role? role.split(" ").slice(0, 2).map(word => word[0]).join("").toUpperCase():"NA"}
                            </span>
                        </div>

                        <div className="flex-grow-1">
                            <h5 className="mb-1 fw-semibold">{role}</h5>
                            <p className="text-muted small mb-0">
                            {topicsToFocus}
                            </p>
                        </div>

                        <button className="btn btn-sm btn-outline-danger ml-3 mt-2"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete()}}>
                            <LuTrash2/>
                        </button>
                    </div>

                </div>

                <div className="card-body pt-3">
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <span className="badge text-dark border">
                            Experience: {experienceDuration>1?`${experienceDuration}Years`:`${experienceDuration}Year`}
                        </span>

                        <span className="badge text-dark border">
                            {questions} Q&A
                        </span>

                        <span className="badge text-dark border">
                            Updated: {lastUpdated}
                        </span>
                    </div>

                    <p className="text-secondary small mb-0">
                        {description}
                    </p>
                </div>
            </div>
        </>
    )
}

export default SummaryCard