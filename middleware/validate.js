const jwt = require("jsonwebtoken")
const USERDATA = require("../models/userSchema")

const validate = async(req,res,next) => {
    try {
        const token = req.headers['authorization']
      
        if(!token) return res.status(404).json({message:"Authorization header missing"})
            const userToken = token.replace(/^Bearer\s+/, "")
        console.log("usertokeeneeee",userToken)
        if(!userToken) return res.status(404).json({message:"token invalid formate"})
            const decode = jwt.verify(userToken, process.env.SECRET_KEY)
        const findAccount = await USERDATA.findOne({_id:decode._id})
        if(!findAccount) return res.status(404).json({message:"Unauthorizied user"})
            req.userId = decode._id
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
}

module.exports = validate



