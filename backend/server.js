const express=require('express')
require('dotenv').config()
require('./database/mongoDB')
const app=express()
const cors=require('cors')
const morgan=require("morgan")

// port
const port=process.env.PORT
const catgeoryRoute=require('./routes/categoryRoutes')
const userRoute=require('./routes/userRoutes')
const songRoute=require('./routes/songRoutes')
const playlistROute=require('./routes/playlistRoutes')

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(catgeoryRoute)
app.use(userRoute)
app.use(songRoute)
app.use(playlistROute)
app.use("/public/uploads",express.static('public/uploads'))
app.use("/public/audios",express.static('public/audios'))


app.listen(port,()=>{
    console.log(`App started at Port:${port}`)
})
