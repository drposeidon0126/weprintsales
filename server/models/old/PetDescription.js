const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PetDescriptionSchema = new Schema({
  petDescription: {
    type: String,
    required: true
  },
  petTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PetTypes"
  }
});

module.exports = PetDescription = mongoose.model("PetDescriptions", PetDescriptionSchema);
