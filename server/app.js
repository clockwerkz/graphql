const express = require('express');
const {graphqlHTTP} = require('express-graphql');
require ('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.user}:${process.env.pw}@cluster0.xcqlp.mongodb.net/games?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log("MongoDB connected....")
  const collection = client.db("games").collection("campaigns");
  // perform actions on the collection object
  client.close();
});



const app = express();
const PORT = 4050;

const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}));

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
});