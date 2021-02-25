const mongoose = require('mongoose')
const VehicleSchema = new mongoose.Schema({
    "cars" : [
        {
            // id : {
            //     type : Number,
            //     required : true
            // },
            name : {
                type : String,
                required : true
            },
            location : {
                type : String,
                required : true,
                default : "https://img.etimg.com/thumb/msid-61740103,width-1200,height-900,imgsize-251731,overlay-etpanache/photo.jpg"
            },
            price : {
                type : Number,
                required : true
            } 
        }
    ],

    "bikes" : [
        {
            // id : {
            //     type : Number,
            //     required : true
            // },
            name : {
                type : String,
                required : true
            },
            location : {
                type : String,
                required : true,
                default : "https://img.indianautosblog.com/crop/1200x675/2019/03/29/royal-enfield-kx-concept-bims-2019-left-front-quar-19a8.jpg"
            },
            price : {
                type : Number,
                required : true
            } 
        }
    ]
})

module.exports = mongoose.model('Vehicle-details', VehicleSchema)