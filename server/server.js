const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('{"hello": "Hello World!"}').json();
})

app.listen(port, () => {console.log(`Server is listening to port ${port}`)});