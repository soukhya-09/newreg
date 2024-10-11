const mongoose = require("mongoose")

const connectDB= async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to database")
    } catch (error) {
        console.log("failed to connect database")
    }
}

module.exports=connectDB