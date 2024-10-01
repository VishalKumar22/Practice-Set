const USERDATA = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const jwt= require("jsonwebtoken")

const signup = async(req,res) => {
    try {
        const {username, email, password, phone} = req.body
        if(!username | !email | !password | !phone) return res.status(401).json({message:"All fields are required"}) 
            const userExists = await USERDATA.findOne({email:email})
        if(userExists) return res.status(401).json({message: "User already exists"})
            const hashPassword = await bcrypt.hash(password,10)
            const createUser = await USERDATA.create({username, email, password:hashPassword, phone})
        return res.status(201).json({message:"User created Successfuly", data:createUser})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:error.message})
    }
}

const login = async(req,res)=> {
    try {
        const {email, password} = req.body
        if(!email | !password) return res.status(401).json({message:"All fields are required"}) 
            const userExists = await USERDATA.findOne({email:email})
        if(!userExists) return res.status(404).json({message: "User Not found"})
            const isPasswordValid = await bcrypt.compare(password, userExists.password)
        if(isPasswordValid){
            const token = await jwt.sign({_id:userExists.id, email:userExists.email}, process.env.SECRET_KEY)
            return res.status(200).json({message:"Login Successfully", token:token})
        }else{
            return res.status(401).json({message:"Incorrect password or email"})
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:error.message})
    }
}

const profile = async(req,res)=> {
    try {
        const userId = req.userId 
        if(userId){
            const getData = await USERDATA.findOne({_id:userId})
            return res.status(200).json({message:"Data fatched", data:getData})
        }else {
            return res.status(404).json({message:"UserID not found"})
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:error.message})
    }
}

const update = async(req, res) => {
    try{
        const userData = req.body
        const userId = req.userId
        const updateUser = await USERDATA.findByIdAndUpdate(userId, userData)
        return res.status(200).json({message: "Details Updated"})
    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {signup, login, profile, update}