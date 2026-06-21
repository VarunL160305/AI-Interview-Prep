require('dotenv').config()
const express=require('express')
const cors=require('cors')
const path=require('path')
const helmet=require('helmet')
const connectDB = require('./config/db')
const app=express()

const authRoute=require('./routes/authRoute')
const questionRoute=require('./routes/questionRoute')
const sessionRoute=require('./routes/sessionRoute')

const {protect}=require('./middlewares/authMiddleware')
const {generateInterviewQuestions,generateQuestionsExplanation}=require('./controllers/aiController')

app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))
connectDB()

app.use(express.json())
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}))
app.use(helmet())

app.use('/auth',authRoute)
app.use('/sessions',sessionRoute)
app.use('/questions',questionRoute)

app.use('/ai/generate-questions',protect,generateInterviewQuestions)
app.use('/ai/generate-explanations',protect,generateQuestionsExplanation)

const PORT=process.env.PORT||5000
app.listen(PORT,async()=>{
    console.log("Server running")
})