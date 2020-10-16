const mongoose=require('mongoose')
const User=require('../../models/user')
const Event=require('../../models/event')


const singleEventFun=async(eventID)=>{
    try {
        const event=await Event.findById({_id:mongoose.Types.ObjectId(eventID)})  
        return {
            ...event._doc,
            creator: userFun.bind(this, event.creator)
        }      
    } catch (e) {
        throw e
    }
}


const eventsFun = async eventIds => {
    try {
      const events = await Event.find({ _id: { $in: eventIds } });
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: userFun.bind(this, event.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  };

const userFun=async(userID)=>{
    try {
        const user = await User.findById({_id:mongoose.Types.ObjectId(userID)});
        return {
          ...user._doc,
          _id: user.id,
          createdEvents: eventsFun.bind(this, user._doc.createdEvents)
        };
      } catch (err) {
        throw err;
      }
}


exports.userFun=userFun
exports.eventsFun=eventsFun
exports.singleEventFun=singleEventFun