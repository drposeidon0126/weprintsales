const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/keys");
const auth = require("../../middleware/auth");
const { validationResult } = require("express-validator");

// Load input validation
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../validation/auth");

// Load User model
const Customer = require("../../models/Customer");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password, eth, twitter, linkedin, discord } = req.body.product;

  try {
    let customer = await Customer.findOne({ email });

    if (customer) {
      return res.status(400).json({ email: "Customer already exists" });
    }

    customer = new Customer({
      name,
      email,
      password,
      eth,
      twitter,
      linkedin,
      discord
    });
    const salt = await bcrypt.genSalt(10);

    customer.password = await bcrypt.hash(password, salt);
    await customer.save();

    const payload = {
      user: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        eth: customer.eth,
        twitter: customer.twitter,
        linkedin: customer.linkedin,
        discord: customer.discord
      },
    };

    jwt.sign(
      payload,
      config.secretOrKey,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          success: true,
          accessToken: "Bearer " + token,
          product: {
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            eth: customer.eth,
            twitter: customer.twitter,
            linkedin: customer.linkedin,
            discord: customer.discord
          }
        });
      }
    );

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/", async (req, res) => {
  const { name, email, eth, twitter, linkedin, discord } = req.body.product;

  try {
    let customer = await Customer.findOne({ email });
    if (customer) {
      customer.name = name
      customer.email = email
      customer.eth = eth
      customer.twitter = twitter
      customer.linkedin = linkedin
      customer.discord = discord
      customer.save()
    }

    jwt.sign(
      payload,
      config.secretOrKey,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          success: true,
          accessToken: "Bearer " + token,
          product: {
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            eth: customer.eth,
            twitter: customer.twitter,
            linkedin: customer.linkedin,
            discord: customer.discord
          }
        });
      }
    );

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", validateLoginInput(), async (req, res) => {
  // Check Validation
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   // Formatting errors to return object instead of an array
  //   const formattedErrors = errors.array().reduce((acc, current) => {
  //     acc[current["param"]] = current.msg;
  //     return acc;
  //   }, {});
  //   return res.status(400).json(formattedErrors);
  // }

  const { email, password } = req.body;

  // Find user by email
  try {
    let customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(400).json({ auth: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return res.status(400).json({ auth: "Invalid Credentials" });
    }

    const payload = {
      customer: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        eth: customer.eth,
        twitter: customer.twitter,
        linkedin: customer.linkedin,
        discord: customer.discord
      },
    };

    jwt.sign(
      payload,
      config.secretOrKey,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          accessToken: "Bearer " + token,
          customer: {
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            eth: customer.eth,
            twitter: customer.twitter,
            linkedin: customer.linkedin,
            discord: customer.discord
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/users/current
// @desc     Get user by token
// @access   Private
router.get("/find", async (req, res) => {
  try {
    const customers = await Customer.find({})
    res.json({
      totalCount: customers.length,
      entities: customers
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Customer.findOneAndDelete({ _id: req.params.id })

    res.json({
      state: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
