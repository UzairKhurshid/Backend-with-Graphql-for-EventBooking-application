const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    createdEvents:[
        {
            type:String,
            ref:'Event'
        }
    ]
})

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

const User=mongoose.model('User',userSchema)
module.exports=User