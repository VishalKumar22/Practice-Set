const express = require("express")
const connectDb = require("./config/db")
const router = require("./routes/routes")
require("dotenv").config()
const cors = require("cors")
const app = express()

const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET , POST, PUT, DELETE, OPTIONS",
    // allowedHeaders: 'Content-Type, Authorization',
    credentials:true
}
app.use(cors(corsOptions))

connectDb()

//middleware
app.use(express.json())

//routes
app.use("/user", router)

const port = process.env.PORT || 8080
app.listen(port, ()=> {
    console.log(`Listening to ${port}`)
})