const mongoose = require("mongoose")

const connectDb = async()=> {
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error.message)
        console.log("Database connection failed ")
    }
}
module.exports = connectDb