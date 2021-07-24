const express = require('express')
const _route = express.Router()
const bcrypt  = require ('bcryptjs')
const User = require('../../models/Users')
const gravatar = require('gravatar')
const logger = require('../../utils/logger')


//@Routes POST              
_route.post('/register',(req,res) => {
    User.findOne({email:req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email:"Email alreay exist"})
        } else { 

            const avatar = gravatar.url('req.body.email', {
                            s: '200',
                             r: 'pg', 
                             d: 'mm'
                    });


            const newUser = new User ({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                avatar
            })
           
            bcrypt.genSalt(10)
            .then((salt) => {
                console.log(salt)
                return bcrypt.hash(req.body.password,salt)
            })
            .then ((hash) => {
                if (hash) {
                    newUser.password = hash
                }
                console.log(newUser)
                return newUser.save()
            }) 

            .then(user => {
                res.json(user)
                logger.info(`User successfully created id:${user._id} email:${user.email}`)            
            })

            .catch(err => {
                console.log(err)
                logging.error(`Error while registering new user ${err}`)
                return {
                    status: 400,
                    message: err
                }
            })

        }
    })

    .catch(err => (console.log(err)))
})

module.exports = _route
