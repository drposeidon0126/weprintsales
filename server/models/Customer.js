const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CustomerSchema = new Schema({
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
    required: true
  },
  eth: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  discord: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Customer = mongoose.model("customers", CustomerSchema);
