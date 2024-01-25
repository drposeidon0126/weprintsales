const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  from_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  to_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  message: {
    type: String,
    required: true
  },
  is_deleted: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  });

module.exports = User = mongoose.model("Messages", MessageSchema);
