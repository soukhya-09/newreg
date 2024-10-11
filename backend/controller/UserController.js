const express = require("express")
const User = require('../model/User')
const bcrypt = require("bcrypt")
const router = express.Router()

router.get('/getuser',async(req,res)=>{
    try {
        const user = await User.findOne()
        
        res.status(201).json({success:true,user:user})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.post('/postuser',async(req,res)=>{
    try {
        const {email,password}= req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"empty details"
            })
        }
        const newuserlogin = await User.findOne({email});
        if(newuserlogin){
            return res.status(400).json({
                success:false,
                message:"user already signed up , please login"
            })
        }
        const hashed=await bcrypt.hash(password,10);

        const newUser = await new User({email,password:hashed});
        await newUser.save()
        res.status(200).json({success:true,message:"registered successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.put('/putuser/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const {emailtobechanged} = req.body;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"no logged in user detected"
            })
        }
        const user  = await User.findById(id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"no user found with this id in database"
            })
        }
        if(!emailtobechanged ){
            return res.status(400).json({
                success:false,
                message:"no update query detected"
            })
        }
        user.email = emailtobechanged;
        user.save()
      
        

        res.status(200).json({success:true,message:"user updated",emailchanged_to:emailtobechanged})
    } catch (error) {
        res.status(400).json({message:"error",error:error.message})
    }
})

router.delete('/deleteuser/:id',async(req,res)=>{
    try {
        const {id}= req.params;
     
        if(!id){
            return res.status(400).json({
                success:false,
                message:"no logged in user detected"
            })
        }
        const user  = await User.findById(id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"no user found with this id in database"
            })
        }
        const deleteUser = await User.findByIdAndDelete(id)
        deleteUser.password=null
        res.status(200).json({success:true,message:"user deleted",user:deleteUser})
    } catch (error) {
        res.status(500).json("user not found")
    }
})

module.exports=router