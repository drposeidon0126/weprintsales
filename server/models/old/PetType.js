const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PetTypeSchema = new Schema({
  petType: {
    type: String,
    required: true
  },
  petTypeMomCalled: {
    type: String,
    required: true
  },
  petTypeDadCalled: {
    type: String,
    required: true
  }
});

module.exports = PetType = mongoose.model("PetTypes", PetTypeSchema);
