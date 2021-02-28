// require('dotenv').config()
const Vehiclesdata = require('../models/car_bike')

const express = require('express')
const product = express.Router()

//To get the details of all the vehicles that we have
product.get('/products', async (req, res)=>{
    try{
    const vehicles = await Vehiclesdata.find()
    res.status(201).json(vehicles)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})

//To add the vehicle details in the data
product.post('/products', async (req, res)=>{
    vehicle = await Vehiclesdata.find({"cars" : [{name : req.body.name}], "bikes" : [{name : req.body.name}]}).exec()
    if(vehicle.length !== 0){
        res.status(400).json({message: "Vehicle already exists"})
    }
    else{
        const vehicle = new Vehiclesdata({
            
                // cars.name : req.body.cars.name,
                // cars.location : req.body.cars.location,
                // price : req.body.cars.price,
                // bikes.name : req.body.bikes.name,
                // bikes.location : req.body.bikes.location,
                // bikes.price : req.body.price

                "cars":[{
                    name : req.body.name,
                    location : req.body.location,
                    price : req.body.price
                        }],
                "bikes":[{
                    name : req.body.name,
                    location : req.body.location,
                    price : req.body.price
                }]
            
        })
        // {
        //    
        // }
        try{
            const newvehicle = await vehicle.save()
            res.status(201).json(newvehicle)
        }
        catch(err){
            res.status(400).json({message: err.message})
        }
    }
})



module.exports = product