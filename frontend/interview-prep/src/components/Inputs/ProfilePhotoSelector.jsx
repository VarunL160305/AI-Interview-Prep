import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector=({image,setImage,preview,setPreview})=>{

  const inputRef=useRef(null)

  const [previewUrl, setPreviewUrl]=useState(null)

  const handleImageSubmit=(e)=>{
    const file=e.target.files[0]
    if(file){
      setImage({...image,profilePic:file})
      const previewImage=URL.createObjectURL(file)
      setPreviewUrl(previewImage)
      if(setPreview){
        setPreview(previewImage)
      }
    }
  }

  const handleImageRemove=()=>{
    setImage({...image,profilePic:null})
    setPreviewUrl(null)
    if(setPreview){
      setPreview(null)
    }
  }

  const onChooseFile=()=>{
    inputRef.current.click()
  }

  return (
    <div className="d-flex justify-content-center mb-4">
      <input type="file" accept="image/*" ref={inputRef} onChange={handleImageSubmit} className="d-none"/>
      {!image.profilePic?(
        <div
          className="position-relative d-flex justify-content-center align-items-center rounded-circle bg-warning bg-opacity-10"
          style={{width: "90px",height: "90px",cursor: "pointer"}}>
          <LuUser size={40} className="text-warning" onClick={onChooseFile}/>

          <button type="button" onClick={onChooseFile} className="btn btn-warning rounded-circle position-absolute" style={{width: "35px",height: "35px",bottom: "-5px",right: "-5px",padding: '9px'}}>
            <LuUpload />
          </button>
        </div>

      ):(
        <div className="position-relative">
          <img src={preview || previewUrl} alt="profile" className="rounded-circle object-fit-cover" style={{width: "90px",height: "90px"}}/>

          <button type="button" className="btn btn-danger rounded-circle position-absolute" style={{width: "35px",height: "35px",bottom: "-5px",right: "-5px",paddingLeft: "9px"}} onClick={handleImageRemove}>
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector