const {buildSchema} =require('graphql')
module.exports=buildSchema(`


    type User{
        _id:ID!
        name:String!
        email:String!
        password:String!
        createdEvents:[Event!]
    }

    type authData {
        userID:ID!
        token:String!
        tokenExpirationTime:Int!
    }

    type Event{
        title:String!
        description:String!
        price:Float!
        date:String!
        creator:User!
    }

    type Booking{
        _id:ID
        event:Event!
        user:User!
        createdAt:String!
        updatedAt:String!
    }

    input userInput{
        name:String!
        email:String!
        password:String!
    }

    input eventInput{
        title:String!
        description:String!
        price:Float!
        date:String!
    }

    type rootQuery{
        users: [User!]!
        login(email:String!,password:String!) : authData!
        events: [Event!]!
        bookings:[Booking!]!
    }

    type rootMutation{
        createUser(userInput:userInput) : User!
        createEvent(eventInput:eventInput) : Event!
        bookEvent(eventID:String!):Booking!
        cancelBooking(bookingID:String!):Event!
    }

    schema{
        query:rootQuery,
        mutation:rootMutation
    }

`);