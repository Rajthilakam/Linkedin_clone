const express = require('express')
const  mongoose = require('mongoose')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile') 
const logger = require('./utils/logger')


const app = express()
var fs = require('fs')
var morgan = require('morgan')
const keys = require('./config/keys')

// setup the logger
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))

//Db Config
const db = keys.mongoUrl
mongoose
    .connect(db,{useNewUrlParser:true},
                {useUnifiedTopology:true})
    .then(() => {
        console.log("Connected to db")
        logger.info("Connected to Mongodb")})
    .catch(err => {
        console.log(err)
        logger.error({message:err})
    })

app.use(express.urlencoded())
app.use(express.json())
//app.use(morgan("combined"))


//Routes
app.get('/', (req,res) => res.send('Hello World!'))


//Middleware functions
app.use('/api/users',users)
app.use('/api/posts',posts)
app.use('/api/profile',profile)


//Starting a server
const PORT = 5000
app.listen(PORT, () => {
    console.log('Server started....')
    logger.info(`Server started and running on ${PORT}`)
})

//
