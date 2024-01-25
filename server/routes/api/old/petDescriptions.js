const express = require("express");
const router = express.Router();

// Load User model
const PetDescription = require("../../../models/old/PetDescription");


// @route POST api/petDescriptions/
// @desc Register user
// @access Public
router.post("/", async (req, res) => {
  const { petDescription, petTypeId } = req.body;
  console.log(req.body)
  try {
    let petDescriptionEntity = await PetDescription.findOne({ petDescription });

    if (petDescriptionEntity) {
      return res.status(400).json({ petDescription: "Domain already exists" });
    }

    petDescriptionEntity = new PetDescription({
      petDescription,
      petTypeId
    });

    await petDescriptionEntity.save();

    petDescriptionEntity = await PetDescription.findById(petDescriptionEntity._id).populate("petTypeId");

    return res.json({
      success: true,
      petDescription: {
        petDescriptionId: petDescriptionEntity._id,
        petDescription: petDescriptionEntity.petDescription,
        petTypeId: petDescriptionEntity.petTypeId,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/", async (req, res) => {
  const { petDescriptionId, petDescription, petTypeId } = req.body;

  try {
    let petDescriptionEntity = await PetDescription.findById(petDescriptionId);
    if (petDescriptionEntity) {
      petDescriptionEntity.petDescription = petDescription
      petDescriptionEntity.petTypeId = petTypeId
      await petDescriptionEntity.save()
    }
    petDescriptionEntity = await PetDescription.findById(petDescriptionId).populate("petTypeId");
    console.log(petDescriptionEntity)
    return res.json({
      success: true,
      petDescription: {
        petDescriptionId: petDescriptionEntity._id,
        petDescription: petDescriptionEntity.petDescription,
        petTypeId: petDescriptionEntity.petTypeId,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const petDescriptions = await PetDescription.find({}).populate("petTypeId");
    res.json({
      totalCount: petDescriptions.length,
      entities: petDescriptions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const petDescriptionEntity = await PetDescription.findById(req.params.id).populate("petTypeId");
    res.json({
      success: true,
      petDescription: {
        petDescriptionId: petDescriptionEntity._id,
        petDescription: petDescriptionEntity.petDescription,
        petTypeId: petDescriptionEntity.petTypeId,
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await PetDescription.findOneAndDelete({ _id: req.params.id })
    res.json({
      state: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;