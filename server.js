require('dotenv').config()
require('./config/database')
const express = require('express')
const Router = require('./routes/routes')
const cors = require('cors')
const passport = require('passport')
const fileUpload = require('express-fileupload')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(passport.initialize())
app.use('/api', Router)

app.set('port', PORT)

app.get('/', (req,res) => {
    res.send('Servidor CREADO y corriendo en puerto ' + app.get('port'))
})

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en puerto' + PORT)
})