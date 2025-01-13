//step 1 import 
const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')
// const authRouter = require('./routes/auth')
// const categoryRouter = require('./routes/category')


// middleware \
app.use(morgan('dev'))
app.use(express.json({limit: '20mb'}))
app.use(cors())

// app.use('/api',authRouter)clas
// app.use('/api',categoryRouter)
readdirSync('./routes').map((A)=> app.use('/api', require('./routes/'+A)))

// // step 3 Router
// app.post('/api',(req,res)=>{
//     const { email,username } = req.body
//     console.log(email,username)
//     res.send('Woww!')
// })
 

 


//step 2 start se   rver 
app.listen(5000,()=> console.log('Server in running on port 5000 '))