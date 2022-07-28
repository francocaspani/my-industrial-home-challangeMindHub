require('dotenv').config()
require('./config/database')
const path = require('path')
const express = require('express')
const Router = require('./routes/routes')
const cors = require('cors')
const passport = require('passport')
const fileUpload = require('express-fileupload')
const path = require("path")
const app = express()
const PORT = process.env.PORT || 4000
app.set('port', PORT)


app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(passport.initialize())
app.use(express.static(path.join(__dirname,'image/reviews')))
app.use('/api', Router)


app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname+'image/reviews/index.html'))
})


app.listen(PORT, ()=>{
    console.log('Servidor corriendo en puerto' + PORT)
})

module.exports = app