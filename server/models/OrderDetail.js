const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    title: {
      type: String,
      default: "pending payment",
    },
    service_type: {
      type: Number,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Number,
      default: 1,
    },
    comment: {
      type: String,
    },
    store_at_up: {
      type: String,
    },
    client_art_up: {
      type: String,
    },
    hold: {
      type: Number,
      default: 0,
    },
    due_date: {
      type: Date,
    },
    sales_staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    art_staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    prod_staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = OrderDetail = mongoose.model("OrderDetails", OrderSchema);
