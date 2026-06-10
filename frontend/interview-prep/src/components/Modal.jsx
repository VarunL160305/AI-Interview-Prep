import React from 'react'

const Modal = ({ children, isOpen, onClose, hideHeader, title }) => {
    if(!isOpen)return null
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{backgroundColor: "rgba(0,0,0,0.4)",zIndex: 1050}}>
            <div className="position-relative d-flex flex-column bg-white shadow rounded overflow-hidden" style={{minWidth: "400px",maxWidth: "90%",maxHeight: "90vh"}}>
                {!hideHeader && (
                    <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                        <h3 className="fs-5 fw-medium text-dark mb-0">
                            {title}
                        </h3>
                    </div>
                )}

                <button type="button" className="btn btn-light position-absolute top-0 end-0 m-3 d-flex justify-content-center align-items-center" style={{width: "32px",height: "32px",borderRadius: "8px"}} onClick={onClose}>
                    <svg className="w-100 h-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>

                <div className="flex-grow-1 overflow-auto" style={{maxHeight: "75vh"}}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal