const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DomainSchema = new Schema({
  domainName: {
    type: String,
    required: true
  },
  petTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PetTypes"
  }
});

module.exports = Domain = mongoose.model("Domains", DomainSchema);
