const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReservationSchema = new Schema({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Babies"
  },
  reservationDOB: {
    type: Date,
    default: Date.now
  },
  reservationFirstName: {
    type: String,
    required: true
  },
  reservationLastName: {
    type: String,
    required: true
  },
  reservationEmail: {
    type: String,
    required: true
  },
  reservationPhone: {
    type: String,
    required: true
  },
  reservationLocation: {
    type: String,
    required: true
  },
  domainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Domains"
  },
  reservationPaymentStatus: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

module.exports = Reservation = mongoose.model("Reservations", ReservationSchema);
