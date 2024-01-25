const express = require("express");
const router = express.Router();

// Load User model
const Liter = require("../../../models/old/Liter");

// @route POST api/liters/
// @desc Register user
// @access Public
router.post("/", async (req, res) => {
  const { literDad, literMom, literDOB } = req.body;
  console.log(req.body)
  try {

    liter = new Liter({
      literDad,
      literMom,
      literDOB
    });
    liter = await liter.save();
    liter = await Liter.findById(liter._id).populate("literMom").populate("literDad")
    return res.json({
      success: true,
      liter: {
        literId: liter._id,
        literDad: liter.literDad,
        literMom: liter.literMom,
        literDOB: liter.literDOB,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/", async (req, res) => {
  const { literId, literDad, literMom, literDOB } = req.body;

  try {
    let liter = await Liter.findOne({ _id: literId });
    if (liter) {
      liter.literDad = literDad
      liter.literMom = literMom
      liter.literDOB = literDOB
      await liter.save()
    }
    liter = await Liter.findById(liter._id).populate("literMom").populate("literDad")
    return res.json({
      success: true,
      liter: {
        literId: liter._id,
        literDad: liter.literDad,
        literMom: liter.literMom,
        literDOB: liter.literDOB,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/", async (req, res) => {
  try {
    const liters = await Liter.find({}).populate("literMom").populate("literDad")
    res.json({
      totalCount: liters.length,
      entities: liters
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const liter = await Liter.findOne({ _id: req.params.id }).populate("literMom").populate("literDad")
    res.json({
      success: true,
      liter: {
        literId: liter._id,
        literDad: liter.literDad,
        literMom: liter.literMom,
        literDOB: liter.literDOB,
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Liter.findOneAndDelete({ _id: req.params.id })
    res.json({
      state: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
