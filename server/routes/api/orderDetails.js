const express = require("express");
const router = express.Router();
const uploadFile = require("../../middleware/upload");
const auth = require("../../middleware/auth");
// Load User model
const Order = require("../../models/Order");
const OrderDetail = require("../../models/OrderDetail");


router.get("/list", async (req, res) => {
  try {
    const orderDetails = await OrderDetail.find({ order_id: req.query.order_id })
    console.log(orderDetails)
    res.json({
      totalCount: orderDetails.length,
      entities: orderDetails
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
