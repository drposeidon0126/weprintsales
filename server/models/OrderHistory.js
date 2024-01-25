const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderHistorySchema = new Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = OrderHistory = mongoose.model(
  "OrderHistorys",
  OrderHistorySchema
);
