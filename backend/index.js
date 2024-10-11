const express  = require("express")
const cors = require("cors")
const dotenv  =require("dotenv")
const UserController = require('./controller/UserController')

const connectDB = require("./config/Db")
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 4000

app.use('/api/user',UserController)

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})