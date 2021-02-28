require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended : false }))




const mongoose = require('mongoose')
mongoose.connect(process.env.VEHICLE_USERS, { useNewUrlParser : true})
const db = mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.log('Connected to the server….'))

const UsersRoutes = require('./routes/vehicle-users')
app.use('/', UsersRoutes) //http://localhost:3000/<route>
//If it was => app.use('/users', UsersRoutes) then => //http://localhost:3000/users/<route>

const VehiclesRoutes = require('./routes/car_bike')
app.use('/', VehiclesRoutes)


app.listen(process.env.PORT || 3000, ()=>console.log('Listening to server....'))