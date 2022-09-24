const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//for connecting via mongosh: mongosh "mongodb+srv://cluster0.ugidgmi.mongodb.net/myFirstDatabase" --apiVersion 1 --username victorhe33

const timezoneSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  team: [String],
})

const Timezone = mongoose.model('timezone', timezoneSchema);

module.exports = { Timezone }