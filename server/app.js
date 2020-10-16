require('../server/db/db')
const express=require('express')
const {graphqlHTTP}=require('express-graphql')
const bodyParser=require('body-parser')
const auth= require('./auth/auth')
const app=express()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const graphQlSchema = require('./graphql/schemas/index');
const graphQlResolvers = require('./graphql/resolvers/index');

//middleware to set content headers (Cors policy)
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})
//auth middleware for all requests
app.use(auth)
//application route
app.use('/graphql',graphqlHTTP(
    {
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        
        graphiql: true
    })
)


app.listen(8000,()=>{
    console.log('server is up and running on port 8000')
})