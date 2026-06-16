const {GoogleGenAI}=require('@google/genai')
const {conceptExplainPrompt, questionAnswerPrompt}=require('../utils/prompts')

const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})

const generateInterviewQuestions=async(req,res)=>{
    try{
        const {role,experience,topicsToFocus,numberOfQuestions}=req.body
        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message:"Missing required fields"})
        }

        const prompt=questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions)
        const response=await ai.models.generateContent({
            model:"gemini-3.5-flash",
            contents:prompt
        })

        const rawData=response.text
        const cleanData=rawData.replace(/^'''json\s*/,"").replace(/'''$/,"").trim()
        const data=JSON.parse(cleanData)

        res.status(200).json(data)
    }catch(err){
        res.status(500).json({success:false,message:"Failed to generate questions",error:err.message})
    }
}

const generateQuestionsExplanation=async(req,res)=>{
    try{
        const {question}=req.body
        if(!question){
            return res.status(400).json({message:"Missing required fields"})
        }

        const prompt=conceptExplainPrompt(question)
        const response=await ai.models.generateContent({
            model:"gemini-3.5-flash",
            contents:prompt
        })
        const rawData=response.text
        const cleanData=rawData.replace(/^'''json\s*/,"").replace(/'''$/,"").trim()
        const data=JSON.parse(cleanData)

        res.status(200).json(data)
        
    }catch(err){
        res.status(500).json({success:false,message:"Failed to generate questions",error:err.message})
    }
}

module.exports={generateInterviewQuestions,generateQuestionsExplanation}