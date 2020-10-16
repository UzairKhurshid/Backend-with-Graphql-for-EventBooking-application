const mongoose=require('mongoose')
const eventSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true,
        ref:'User'
    }
})
const Event=mongoose.model('Event',eventSchema)
module.exports=Event