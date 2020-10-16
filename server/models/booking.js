const mongoose=require('mongoose')
const bookingSchema=mongoose.Schema({

    event:{
        type:String,
        required:true,
        ref:'Event'
    },
    user:{
        type:String,
        required:true,
        ref:'User'
    }

},{timestamps:true})

const Booking=mongoose.model('Booking',bookingSchema)
module.exports=Booking