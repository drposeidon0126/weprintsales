const express = require("express");
const router = express.Router();

// Load User model
const Baby = require("../../../models/old/Baby");

// @route POST api/babies/
// @desc Register user
// @access Public
router.post("/", async (req, res) => {
  const { literId, babyName, babyDOB, babyGender, petDescriptionId, babyPic1,
    babyPic2, babyPic3, babyPic4, babyPic5, babyPic6, babyPrice, babyStatus } = req.body;
  console.log(req.body)
  try {
    let baby = new Baby({
      literId,
      babyName,
      babyDOB,
      babyGender,
      petDescriptionId,
      babyPic1,
      babyPic2,
      babyPic3,
      babyPic4,
      babyPic5,
      babyPic6,
      babyPrice,
      babyStatus
    });
    console.log(baby);
    await baby.save();

    baby = await Baby.findById(baby._id).populate(
      {
        path: "literId", populate:
        {
          path: "literDad", populate:
          {
            path: "petTypeId"
          }
        }
      }).populate("petDescriptionId").populate("petTypeId")

    return res.json({
      success: true,
      baby: {
        babyId: baby._id,
        literId: baby.literId,
        babyName: baby.babyName,
        babyDOB: baby.babyDOB,
        babyGender: baby.babyGender,
        petDescriptionId: baby.petDescriptionId,
        babyPic1: baby.babyPic1,
        babyPic2: baby.babyPic2,
        babyPic3: baby.babyPic3,
        babyPic4: baby.babyPic4,
        babyPic5: baby.babyPic5,
        babyPic6: baby.babyPic6,
        babyPrice: baby.babyPrice,
        babyStatus: baby.babyStatus,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/", async (req, res) => {
  const { babyId, literId, babyName, babyDOB, babyGender, petDescriptionId, babyPic1,
    babyPic2, babyPic3, babyPic4, babyPic5, babyPic6, babyPrice, babyStatus } = req.body;
  try {
    let baby = await Baby.findById(babyId);
    if (baby) {
      baby.literId = literId
      baby.babyName = babyName
      baby.babyDOB = babyDOB
      baby.babyGender = babyGender
      baby.petDescriptionId = petDescriptionId
      baby.babyPic1 = babyPic1
      baby.babyPic2 = babyPic2
      baby.babyPic3 = babyPic3
      baby.babyPic4 = babyPic4
      baby.babyPic5 = babyPic5
      baby.babyPic6 = babyPic6
      baby.babyPrice = babyPrice
      baby.babyStatus = babyStatus
      await baby.save()
    }

    baby = await Baby.findById(baby._id).populate(
      {
        path: "literId", populate:
        {
          path: "literDad", populate:
          {
            path: "petTypeId"
          }
        }
      }).populate("petDescriptionId");

    return res.json({
      success: true,
      baby: {
        babyId: baby._id,
        literId: baby.literId,
        babyName: baby.babyName,
        babyDOB: baby.babyDOB,
        babyGender: baby.babyGender,
        petDescriptionId: baby.petDescriptionId,
        babyPic1: baby.babyPic1,
        babyPic2: baby.babyPic2,
        babyPic3: baby.babyPic3,
        babyPic4: baby.babyPic4,
        babyPic5: baby.babyPic5,
        babyPic6: baby.babyPic6,
        babyPrice: baby.babyPrice,
        babyStatus: baby.babyStatus,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/", async (req, res) => {
  try {
    const babies = await Baby.find({}).populate(
      {
        path: "literId", populate:
        {
          path: "literDad", populate:
          {
            path: "petTypeId"
          }
        }
      }).populate("petDescriptionId");
    res.json({
      totalCount: babies.length,
      entities: babies
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const baby = await Baby.findById(req.params.id).populate(
      {
        path: "literId", populate:
        {
          path: "literDad", populate:
          {
            path: "petTypeId"
          }
        }
      }).populate("petDescriptionId");
    res.json({
      success: true,
      baby: {
        babyId: baby._id,
        literId: baby.literId,
        babyName: baby.babyName,
        babyDOB: baby.babyDOB,
        babyGender: baby.babyGender,
        petDescriptionId: baby.petDescriptionId,
        babyPic1: baby.babyPic1,
        babyPic2: baby.babyPic2,
        babyPic3: baby.babyPic3,
        babyPic4: baby.babyPic4,
        babyPic5: baby.babyPic5,
        babyPic6: baby.babyPic6,
        babyPrice: baby.babyPrice,
        babyStatus: baby.babyStatus,
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Baby.findOneAndDelete({ _id: req.params.id })
    res.json({
      state: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
