const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LiterSchema = new Schema({
  literDad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Breeders"
  },
  literMom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Breeders"
  },
  literDOB: {
    type: Date,
    default: Date.now
  },
});

module.exports = Liter = mongoose.model("Liters", LiterSchema);
