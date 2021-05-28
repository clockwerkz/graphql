const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const app = express();
const PORT = 4050;

app.use('/graphql', graphqlHTTP({
    
}));

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
});