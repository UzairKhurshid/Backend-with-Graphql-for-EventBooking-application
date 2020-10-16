const mongoose=require('mongoose')
const Event=require('../../models/event')
const Booking=require('../../models/booking')

const { userFun , eventsFun  , singleEventFun  } = require('./resolverHelper')

module.exports={
    //Queries
    
    bookings:async()=>{
        try {
            const bookings=await Booking.find()
            return bookings.map(booking=>{
                return {
                    ...booking._doc,
                    event:singleEventFun.bind(this,booking._doc.event),
                    user:userFun.bind(this,booking._doc.user),
                    createdAt:new Date(booking._doc.createdAt).toISOString(),
                    updatedAt:new Date(booking._doc.updatedAt).toISOString()
                }
            })            
        } catch (e) {
            throw e
        }
    },

    //Mutations

    bookEvent:async(args)=>{
        try {
            const event=await Event.findById({_id:mongoose.Types.ObjectId(args.eventID)})
            if(!event){
                throw new Error('Event ID is invalid')
            }
            var booking=new Booking()
            booking.event=event._id
            booking.user="5f86cdcc46eb4959d05d32c6"
            var res=await booking.save()
            return {
                ...res._doc,
                event:singleEventFun.bind(this,res._doc.event),
                user:userFun.bind(this,res._doc.user),
                createdAt:new Date(res._doc.createdAt).toISOString(),
                updatedAt:new Date(res._doc.updatedAt).toISOString()
            }
        } catch (e) {
            throw e
        }
    },
    cancelBooking:async(args)=>{
        try {
            const booking=await Booking.findById({_id:mongoose.Types.ObjectId(args.bookingID)}).populate('event')
            // /await Booking.findByIdAndDelete({_id:mongoose.Types.ObjectId(args.bookingID)})
            let event=booking.event
            return {
                ...event._doc,
                creator:userFun.bind(this,event._doc.creator)
            }
        } catch (e) {
            throw e
        }
    }
};