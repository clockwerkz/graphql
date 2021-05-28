const express = require('express');
const {graphqlHTTP} = require('express-graphql');

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