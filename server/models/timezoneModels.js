require('dotenv').config();
const mongoose = require('mongoose');

const URI = `mongodb+srv://victorhe33:${process.env.MONGOPASS}@cluster0.ugidgmi.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(URI, {
  dbName: "timezoneApp"
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

//for connecting via mongosh: mongosh "mongodb+srv://cluster0.ugidgmi.mongodb.net/myFirstDatabase" --apiVersion 1 --username victorhe33

const timezoneSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  timezone: String,
  teammates: String,
})

const Timezone = mongoose.model('timezone', timezoneSchema);

module.exports = { Timezone }