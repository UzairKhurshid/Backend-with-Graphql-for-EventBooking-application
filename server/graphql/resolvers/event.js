const mongoose=require('mongoose')
const User=require('../../models/user')
const Event=require('../../models/event')
const Booking=require('../../models/booking')

const { userFun } = require('./resolverHelper')



module.exports={
    //Queries
    events:async()=>{
        try {
            const events=await Event.find()
            return events.map(event=>{
                return {
                    ...event._doc,
                    creator:userFun.bind(this,event._doc.creator)
                }   
            })
        } catch (e) {
            throw e
        }
    },

    //Mutations
    
    createEvent:async(args,req)=>{
        try {
            if(req.isAuth == false){
                throw new Error('Unauthenticated')
            }
            const userID='5f86cc48a2e1517ce8ef4a4b'
            var event=new Event()
            event.title=args.eventInput.title
            event.description=args.eventInput.description
            event.price=args.eventInput.price
            event.date=args.eventInput.date
            event.creator=userID
            await event.save()
            var user=await User.findById({_id:mongoose.Types.ObjectId(userID)})
            user.createdEvents.push(event._id)
            await user.save()

            return {
                ...event._doc,
                creator: userFun.bind(this, event.creator)
            }
        } catch (e) {
            throw e
        }
    }
};