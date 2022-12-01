const express =  require('express')
require('dotenv').config()

const {createMeeting} =  require('./controllers/meetingController')

const app = express()

app.use(express.json())

app.post('/',createMeeting)
app.listen(process.env.PORT, ()=>{console.log("Server Running on http://localhost:5000")})


