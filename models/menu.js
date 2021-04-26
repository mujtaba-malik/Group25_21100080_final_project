const mongoose = require('mongoose')

const menu_schema = new mongoose.Schema({
  dish_name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
})



module.exports = mongoose.model('menu', menu_schema)