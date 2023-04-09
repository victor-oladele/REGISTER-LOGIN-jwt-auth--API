require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// connection to database
const connectdb = require('./db/connect')

// errorhandler
const errorhandler = require('./middleware/errorhandler')
const notfound = require('./middleware/notfound')


// route imported
const userroute = require('./routes/user')
const dashboardroute = require('./routes/dashboard')

const authmiddleware = require('./middleware/auth')

const port = process.env.PORT || 3500


//express inbuilt middleware that handles json post request from the front-end
app.use(express.json())




// route
app.use('/api/v1/auth' , userroute)
app.use('/api/v1' , authmiddleware, dashboardroute)


app.use(errorhandler)
app.use(notfound)

const start = async()=>{
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(port , ()=>{
            console.log(`server running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()


