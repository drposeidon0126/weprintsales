const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    title: {
      type: String,
    },
    status: {
      type: String,
      default: "pending payment",
    },
    total_value: {
      type: Number,
      default: 0,
    },
    payment_req: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
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

OrderSchema.plugin(mongoosePaginate);
module.exports = Order = mongoose.model("Orders", OrderSchema);
