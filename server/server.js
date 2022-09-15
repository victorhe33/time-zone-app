const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const apiRouter = require('./routes/api');

//REQ BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('{"hello": "Hello World!"}').json();
})

//API ROUTE HANDLER
app.use('/api', apiRouter);

//Catch-all for non-existing paths.
app.use((req, res) => {
  console.log(req.path)
  res.status(404).send('This is not the page you\'re looking for...')
});

app.listen(port, () => {console.log(`Server is listening to port ${port}`)});

