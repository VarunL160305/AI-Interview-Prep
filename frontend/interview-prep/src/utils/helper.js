export const validateEmail=(email)=>{
    if(!email){
        return false
    }
    if(!email.includes('@')){
        return false
    }
    if(!email.includes('.')){
        return false
    }
    return true
}

export const validatePassword=(password)=>{
    if(!password){
        return false
    }
    if (password.length < 8){
        return false
    }
    return true
}