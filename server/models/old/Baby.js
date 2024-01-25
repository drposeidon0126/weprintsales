const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BabySchema = new Schema({
  literId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Liters"
  },
  babyName: {
    type: String,
    required: true
  },
  babyDOB: {
    type: Date,
    default: Date.now
  },
  babyGender: {
    type: String,
    required: true
  },
  petDescriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PetDescriptions"
  },
  babyPic1: {
    type: String,
    required: false
  },
  babyPic2: {
    type: String,
    required: false
  },
  babyPic3: {
    type: String,
    required: false
  },
  babyPic4: {
    type: String,
    required: false
  },
  babyPic5: {
    type: String,
    required: false
  },
  babyPic6: {
    type: String,
    required: false
  },
  babyPrice: {
    type: Number,
    required: true
  },
  babyStatus: {
    type: String,
    required: true
  },
});

module.exports = Baby = mongoose.model("Babies", BabySchema);
