const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BreederSchema = new Schema({
  breederName: {
    type: String,
    required: true
  },
  petTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PetTypes"
  },
  breederGender:{
    type:String,
    required: true
  },
  breederDOB: {
    type: Date,
    default: Date.now
  },
  breederDesc: {
    type: String,
    required: true
  },
  breederPhoto: {
    type: String,
    required: true
  }
});

module.exports = Breeder = mongoose.model("Breeders", BreederSchema);
