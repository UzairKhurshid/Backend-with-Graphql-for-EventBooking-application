const mongoose=require('mongoose')
const User=require('../../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { eventsFun } = require('./resolverHelper')




module.exports={
    //Queries
    login:async ({email,password}) => {
        try {
            console.log(email)
            console.log(password)
            const user=await User.findOne({email:email})
            if(!user){
                throw new Error('Invalid Email')
            }
            const isEqual=await bcrypt.compare(password,user.password)
            if(!isEqual){
                throw new Error('Invalid Password')
            }            
            const token=jwt.sign({userID:user.id,email:user.email},'secretToHashToken',{expiresIn:'10h'})
            console.log(token)
            return {userID:user.id,token:token,tokenExpirationTime:10}
        } catch (e) {
            throw e
        }
    },

    //Mutations
    createUser:async(args)=>{
        try{
            const user = new User()
            user.name=args.userInput.name
            user.email=args.userInput.email
            user.password=args.userInput.password
            await user.save()
            return {
                ...user._doc,
                createdEvents:eventsFun.bind(this,user._doc._id)
            }
        }catch(e){
            throw e 
        }
    }
};