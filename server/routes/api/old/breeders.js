const express = require("express");
const router = express.Router();
// Load User model
const Breeder = require("../../../models/old/Breeder");

// @route POST api/breeders/
// @desc Register user
// @access Public
router.post("/", async (req, res) => {
  const { breederName, petTypeId, breederGender, breederDOB, breederDesc } = req.body;
  console.log(req.files[0])

  let breederPhoto = req.files[0].filename;
  try {
    let breeder = new Breeder({
      breederName,
      petTypeId,
      breederGender,
      breederDOB,
      breederDesc,
      breederPhoto
    });

    await breeder.save();

    breeder = await Breeder.findOne({ _id: breeder._id }).populate("petTypeId");

    return res.json({
      success: true,
      breeder: {
        breederId: breeder._id,
        breederName: breeder.breederName,
        petTypeId: breeder.petTypeId,
        breederGender: breeder.breederGender,
        breederDOB: breeder.breederDOB,
        breederDesc: breeder.breederDesc,
        breederPhoto: breeder.breederPhoto
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/", async (req, res) => {
  const { breederId, breederName, petTypeId, breederGender, breederDOB, breederDesc, breederPhoto } = req.body;

  try {
    let breeder = await Breeder.findById(breederId);
    if (breeder) {
      breeder.breederName = breederName
      breeder.petTypeId = petTypeId
      breeder.breederGender = breederGender
      breeder.breederDOB = breederDOB
      breeder.breederDesc = breederDesc
      breeder.breederPhoto = breederPhoto
      await breeder.save()
    }

    breeder = await Breeder.findById(breeder._id).populate("petTypeId")
    return res.json({
      success: true,
      breeder: {
        breederId: breeder._id,
        breederName: breeder.breederName,
        petTypeId: breeder.petTypeId,
        breederGender: breeder.breederGender,
        breederDOB: breeder.breederDOB,
        breederDesc: breeder.breederDesc,
        breederPhoto: breeder.breederPhoto
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/", async (req, res) => {
  try {
    const breeders = await Breeder.find({}).populate("petTypeId")
    res.json({
      totalCount: breeders.length,
      entities: breeders
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const breeder = await Breeder.findById(req.params.id).populate("petTypeId")
    res.json({
      success: true,
      breeder: {
        breederId: breeder._id,
        breederName: breeder.breederName,
        petTypeId: breeder.petTypeId,
        breederGender: breeder.breederGender,
        breederDOB: breeder.breederDOB,
        breederDesc: breeder.breederDesc,
        breederPhoto: breeder.breederPhoto
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Breeder.findOneAndDelete({ _id: req.params.id })
    res.json({
      state: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
