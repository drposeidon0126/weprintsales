const express = require("express");
const router = express.Router();
const config = require('config');
const auth = require("../../middleware/auth");

// Load input validation
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../validation/auth");

// Load User model
const Message = require("../../models/Message");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/", auth, async (req, res) => {
  const {
    type,
    from_user_id,
    to_user_id,
    message
  } = req.body;
  console.log(req.user)
  try {

    message = new Message({
      type,
      from_user_id,
      to_user_id,
      message
    });

    await message.save();

    message = await Message.findOne({ _id: message._id }).populate("Users");

    return res.json({
      success: true,
      message: message
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
