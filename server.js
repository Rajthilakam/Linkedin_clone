const express = require('express')
const  mongoose = require('mongoose')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile') 
const app = express()
var fs = require('fs')
var morgan = require('morgan')
const keys = require('./config/keys')

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))


//Db Config
const db = keys.mongoUrl
mongoose
    .connect(db)
    .then(() => console.log("Connected to db"))
    .catch(err => console.log(err))


//Routes
app.get('/', (req,res) => res.send('Hello World!'))


//Middleware functions
app.use('/api/users',users)
app.use('/api/posts',posts)
app.use('/api/profile',profile)


//Starting a server
const PORT = 5000
app.listen(PORT, () => console.log(`Server is running at ${PORT}`))

//
