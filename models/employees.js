const mongoose = require('mongoose')

const empployees_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true

  },
  password: {
    type: String,
    required : true
  },
  salary: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})



module.exports = mongoose.model('employees', empployees_schema)