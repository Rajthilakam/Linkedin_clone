const express = require('express')
const app = express()

//Routes
app.get('/', (req,res) => res.send('Hello World! Hello'))

const PORT = 5000
app.listen(PORT, () => console.log(`Server is running at ${PORT}`))