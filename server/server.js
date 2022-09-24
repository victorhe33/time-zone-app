const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');


const apiRouter = require('./routes/api');
const teamRouter = require('./routes/team');
const loginRouter = require('./routes/login');

const URI = `mongodb+srv://victorhe33:${process.env.MONGOPASS}@cluster0.ugidgmi.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(URI, {
  dbName: "timezoneApp"
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

//REQ BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('{"hello": "Hello World!"}').json();
})

//API ROUTE HANDLER
app.use('/api', apiRouter);

//TEAM ROUTE HANDLER
app.use('/team', teamRouter);

//LOGIN ROUTE HANDLER
app.use('/login', loginRouter);

//Catch-all route handler for requests to unknown paths.
app.use((req, res) => {
  console.log('unknown path');
  res.status(404).send('This is not the page you\'re looking for...')
});

/*
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {console.log(`Server is listening to port ${port}`)});

