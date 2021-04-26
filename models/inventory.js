const mongoose = require('mongoose')

const inventory_schema = new mongoose.Schema({
  Item: {
    type: String,
    required: true
  },
  Quantity: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
})



module.exports = mongoose.model('Inventory', inventory_schema)