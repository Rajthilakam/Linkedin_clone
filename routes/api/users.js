const express = require('express')
const _route = express.Router()

_route.get('/register',(req,res) => res.json({
    msg:'User route works'
}))

module.exports = _route
