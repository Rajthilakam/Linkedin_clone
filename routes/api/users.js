const express = require('express')
const _route = express.Router()
const bcrypt  = require ('bcryptjs')
const User = require('../../models/Users')
const gravatar = require('gravatar')


//@Routes POST  

const saltrounds = 10
            
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

            console.log(req.body.password)

           
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

            .then(user => res.json(user))

            .catch(err => {
                console.log(err)
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
