const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
// const { validationResult } = require("express-validator");
const { validationResult } = require("express-validator");
// import formData from 'form-data';
const formData = require("form-data");

const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);

// Load input validation
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../validation/auth");

// Load User model
const User = require("../../models/User");
const Message = require("../../models/Message");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  //const { name, email, password } = req.body;

  const {
    name,
    email,
    password,
    company_name,
    contact_person,
    phone,
    address,
    reseller_id,
  } = req.body.data.attributes;

  console.log(name, email, password);
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ email: "User already exists" });
    }
    let state = "In-Active";
    user = new User({
      name,
      email,
      password,
      company_name,
      contact_person,
      phone,
      address,
      reseller_id,
    });

    //if (email === 'superadmin@playestates.com') user.user_status = 'Active';

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const payload = {
      user: {
        _id: user._id,
        name: user.name,
        state: user.state,
        email: user.email,
        password: user.password,
        company_name: user.company_name,
        contact_person: user.contact_person,
        phone: user.phone,
        address: user.address,
        reseller_id: user.reseller_id,
        user_status: user.user_status,
        user_type: user.user_type,
        role: user.role,
      },
    };
    console.log(config.get("secretOrKey"));
    jwt.sign(
      payload,
      config.get("secretOrKey"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          success: true,
          access_token: "Bearer " + token,
          refresh_token: "Bearer " + token,
          user: {
            _id: user._id,
            name: user.name,
            state: user.state,
            email: user.email,
            password: user.password,
            company_name: user.company_name,
            contact_person: user.contact_person,
            phone: user.phone,
            address: user.address,
            reseller_id: user.reseller_id,
            user_status: user.user_status,
            user_type: user.user_type,
            role: user.role,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", validateLoginInput(), async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ auth: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ auth: "Invalid Credentials" });
    }

    const payload = {
      user: {
        _id: user._id,
        name: user.name,
        state: user.state,
        email: user.email,
        password: user.password,
        company_name: user.company_name,
        contact_person: user.contact_person,
        phone: user.phone,
        address: user.address,
        reseller_id: user.reseller_id,
        user_status: user.user_status,
        user_type: user.user_type,
        role: user.role,
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
          user: {
            _id: user._id,
            name: user.name,
            state: user.state,
            email: user.email,
            password: user.password,
            company_name: user.company_name,
            contact_person: user.contact_person,
            phone: user.phone,
            address: user.address,
            reseller_id: user.reseller_id,
            user_status: user.user_status,
            user_type: user.user_type,
            role: user.role,
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
router.get("/current", auth, async (req, res) => {
  try {
    console.log(req.user._id);
    const user = await User.findById(req.user._id);
    console.log(user);
    res.json({
      user: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route    GET api/users/pending
// @desc     Get user by request
// @access   Public
router.get('/pending', auth, async (req, res) => {
  try {
    const newUsers = await User.find({user_status: "request"});
    
    res.json({
      totalCount: newUsers.length,
      entities: newUsers,
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/list", auth, async (req, res) => {
  try {
    const users = await User.find({});

    res.json({
      totalCount: users.length,
      entities: users,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.json({
      state: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id/user", auth, async (req, res) => {
  try {
    const response = await User.findById(req.params.id);
    res.json({
      state: true,
      user: response,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/", async (req, res) => {
  const {
    _id,
    name,
    email,
    company_name,
    contact_person,
    user_type,
    role,
    user_status,
    phone,
    address,
    reseller_id,
  } = req.body.user;
  try {
    let user = await User.findById(_id);
    if (user) {
      user.name = name;
      user.email = email;
      user.company_name = company_name;
      user.contact_person = contact_person;
      user.phone = phone;
      user.address = address;
      user.role = role;
      user.reseller_id = reseller_id;
      user.user_type = user_type;
      user.user_status = user_status;
      if (req.files[0]) user.profile_image = req.files[0].filename;
      await user.save();
    }
    return res.json({
      success: true,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.post("/permitUser", auth, async (req, res) => {
  const { type, to_user_id, message } = req.body;

  console.log(req.body);
  try {
    let message = new Message({
      type: type,
      from_user_id: req.user._id,
      to_user_id: to_user_id,
      message: message,
    });
    await message.save();

    let user = await User.findById(req.user._id);

    if (user) {
      user.user_status = type;
      await user.save();
    }

    return res.json({
      success: true,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/customerList", auth, async (req, res) => {
  try {
    const users = await User.find({ user_type: "normal" });
    res.json({
      totalCount: users.length,
      entities: users,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//send email
router.post("/sendEmail", auth, async (req, res) => {
  const client = mailgun.client({ username: "api", key: 'e9b6048b2297fb019b2f6c4d492aff36-28e9457d-ee1210e1' });
  const messageData = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  };
  client.messages
    .create('sandboxa212c18a6f5b45ad96fb1d9819faccdc.mailgun.org', messageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
});


module.exports = router;
