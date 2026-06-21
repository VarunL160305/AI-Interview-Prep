const Session=require('../models/Session')
const Question=require('../models/Question')

module.exports.createSession=async (req,res) => {
    try{
        const {role,experience,topicsToFocus,description,questions}=req.body
        if(parseInt(experience)<0 || parseInt(experience)>50){
            return res.status(400).json({
                message:"Experience must be between 0 and 50 years"
            })
        }
        const session=await Session.create({
            user:req.user._id,
            role,
            experience,
            topicsToFocus,
            description
        })

        const questionDocs=await Promise.all(
            questions.map(async(ques)=>{
                const question=await Question.create({
                    session:session._id,
                    question:ques.question,
                    answer:ques.answer
                })
                return question._id
            })
        )
        session.questions=questionDocs
        await session.save()

        res.status(201).json({success:true,session})

    }catch(err){
        res.status(500).json({success:false,message:"Server Error"})
    }
}

module.exports.getSessionById=async (req,res) => {
    try{
        const session=await Session.findById(req.params.id).populate(
            {
                path:'questions',options:{sort:{isPinned:-1,createdAt:1}}
            }
        )
        if(!session){
            return res.status(404).json({success:false,message:"session not found"})
        }
        res.status(200).json({success:true,session})
    }catch(err){
        res.status(500).json({success:false,message:"Server Error"})
    }
}

module.exports.getMySessions=async (req,res) => {
    try{
        const session=await Session.find({user:req.user._id}).sort({createdAt:-1}).populate('questions')
        res.status(200).json(session)
    }catch(err){
        res.status(500).json({success:false,message:"Server Error"})
    }
}

module.exports.deleteSession=async (req,res) => {
    try{
        const session=await Session.findById(req.params.id)
        if(!session){
            return res.status(404).json({message:"Session not found"})
        }

        if(session.user.toString()!==req.user.id){
            return res.status(401).json({message:"Not authorized to delete the session"})
        }

        await Question.deleteMany({session:session._id})

        await Session.findByIdAndDelete(session._id)

        res.status(200).json({message:"Session deleted successfully"})

    }catch(err){
        res.status(500).json({success:false,message:"Server Error"})
    }
}