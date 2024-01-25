const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile_image: {
    type: String,
  },
  phone: {
    type: String
  },
  contact_person: {
    type: String,
  },
  address: {
    type: String,
  },
  shipping_address: {
    type: String,
  },
  reseller_id: {
    type: String,
  },
  tax_exempt: {
    type: Boolean,
    default: false
  },
  user_status: {
    type: String,
    default: 'request'
  },
  user_type: {
    type: String,
    default: 'normal'
  },
  role: {
    type: String,
    default: 'normal'
  },
  last_login: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  },
  is_deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("Users", UserSchema);
