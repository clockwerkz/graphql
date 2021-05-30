const express = require('express');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xcqlp.mongodb.net/campaign-tracker?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Connected to db via mongoose');
  })
  .catch((err) => console.log(err));

const app = express();
const PORT = 4050;

const schema = require('./schema/schema');

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
