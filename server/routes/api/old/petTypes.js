const express = require("express");
const router = express.Router();

// Load User model
const PetType = require("../../../models/old/PetType");

// @route POST api/petTypes/
// @desc Register user
// @access Public
router.post("/", async (req, res) => {
  console.log(req.body)
  const { petType, petTypeMomCalled, petTypeDadCalled } = req.body;
  try {
    let petTypeEntity = await PetType.findOne({ petType });

    if (petTypeEntity) {
      return res.status(400).json({ petType: "PetType already exists" });
    }

    petTypeEntity = new PetType({
      petType,
      petTypeMomCalled,
      petTypeDadCalled
    });
    petTypeEntity = await petTypeEntity.save();

    return res.json({
      success: true,
      petType: {
        petTypeId: petTypeEntity._id,
        petType: petTypeEntity.petType,
        petTypeMomCalled: petTypeEntity.petTypeMomCalled,
        petTypeDadCalled: petTypeEntity.petTypeDadCalled,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/", async (req, res) => {
  console.log(req.body)

  const { petTypeId, petType, petTypeMomCalled, petTypeDadCalled } = req.body;

  try {
    let petTypeEntity = await PetType.findById(petTypeId);
    if (petTypeEntity) {
      petTypeEntity.petType = petType
      petTypeEntity.petTypeMomCalled = petTypeMomCalled
      petTypeEntity.petTypeDadCalled = petTypeDadCalled
      await petTypeEntity.save()
    }
    return res.json({
      success: true,
      petType: {
        petTypeId: petTypeEntity._id,
        petType: petTypeEntity.petType,
        petTypeMomCalled: petTypeEntity.petTypeMomCalled,
        petTypeDadCalled: petTypeEntity.petTypeDadCalled,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/", async (req, res) => {
  try {
    const petTypes = await PetType.find({})
    res.json({
      success: true,
      totalCount: petTypes.length,
      entities: petTypes
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const petTypeEntity = await PetType.findOne({ _id: req.params.id })
    res.json({
      success: true,
      petType: {
        petTypeId: petTypeEntity._id,
        petType: petTypeEntity.petType,
        petTypeMomCalled: petTypeEntity.petTypeMomCalled,
        petTypeDadCalled: petTypeEntity.petTypeDadCalled,
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  console.log(req.params)
  try {
    await PetType.findOneAndDelete({ _id: req.params.id })

    res.json({
      state: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
