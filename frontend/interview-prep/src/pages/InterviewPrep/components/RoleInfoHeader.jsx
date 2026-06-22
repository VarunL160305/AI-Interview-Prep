import React from 'react'

const RoleInfoHeader = ({ role, questions, experience, topicsToFocus, lastUpdated, description }) => {
    const experienceDuration = parseInt(experience)
    return (
        <>
            <div className="bg-white position-relative">
                <div className="container position-relative">
                    <div className="d-flex flex-column justify-content-center position-relative" style={{ height: "200px", zIndex: 2 }}>
                        <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                                <h2 className="fw-medium mb-1">
                                    {role}
                                </h2>
                                <p className="text-dark mb-4" style={{ fontSize: "14px" }}>
                                    {topicsToFocus}
                                </p>
                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                    <span
                                        className="badge bg-dark rounded-pill"
                                        style={{ fontSize: "10px", padding: "8px 12px" }}>
                                        Experience: {experienceDuration > 1 ? `${experienceDuration} Years` : `${experienceDuration} Year`}
                                    </span>
                                    <span className="badge bg-dark rounded-pill" style={{ fontSize: "10px", padding: "8px 12px" }}>
                                        {questions} Q&A
                                    </span>
                                    <span className="badge bg-dark rounded-pill" style={{ fontSize: "10px", padding: "8px 12px" }}>
                                        Last Updated: {lastUpdated}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="position-absolute top-0 end-0 d-flex align-items-center justify-content-center overflow-hidden" style={{ width: "450px", height: "200px" }}>
                        <div className="position-absolute rounded-circle bg-success" style={{ width: "140px", height: "140px", filter: "blur(70px)", opacity: 0.42, left: "120px" }}></div>
                        <div className="position-absolute rounded-circle bg-info" style={{ width: "140px", height: "140px", filter: "blur(70px)", opacity: 0.32, left: "180px" }}></div>
                        <div className="position-absolute rounded-circle bg-primary" style={{ width: "120px", height: "120px", filter: "blur(60px)", opacity: 0.40, left: "150px", top: "80px" }}></div>
                        <div className="position-absolute rounded-circle bg-danger" style={{ width: "120px", height: "120px", filter: "blur(60px)", opacity: 0.08, left: "230px", top: "60px" }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoleInfoHeader