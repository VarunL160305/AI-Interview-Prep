import axios from "axios"

const uploadImage=async(imageFile)=>{
    const formData=new FormData()
    formData.append('image',imageFile)

    try{
        const response=await axios.post("http://localhost:8000/auth/upload-image",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        return response.data
    }catch(err){
        console.error("Error uploading the image",err)
        throw err
    }
}
export default uploadImage