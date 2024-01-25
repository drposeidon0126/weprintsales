const express = require("express");
const router = express.Router();

// Load User model
const Domain = require("../../../models/old/Domain");

// @route POST api/domains/
// @desc Register user
// @access Public
router.post("/", async (req, res) => {
  const { domainName, petTypeId } = req.body;
  console.log(req.body)
  try {
    let domain = await Domain.findOne({ domainName });

    if (domain) {
      return res.status(400).json({ domain: "Domain already exists" });
    }

    domain = new Domain({
      domainName,
      petTypeId
    });

    await domain.save();

    domain = await Domain.findOne({ _id: domain._id }).populate("petTypeId");

    return res.json({
      success: true,
      domain: {
        domainId: domain._id,
        domainName: domain.domainName,
        petTypeId: domain.petTypeId,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/", async (req, res) => {
  const { domainId, domainName, petTypeId } = req.body;

  try {
    let domain = await Domain.findById(domainId);
    if (domain) {
      domain.domainName = domainName
      domain.petTypeId = petTypeId
      await domain.save()
    }
    domain = await Domain.findById(domain._id).populate("petTypeId");
    return res.json({
      success: true,
      domain: {
        domainId: domain._id,
        domainName: domain.domainName,
        petTypeId: domain.petTypeId,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/", async (req, res) => {
  try {
    const domains = await Domain.find({}).populate("petTypeId");
    res.json({
      totalCount: domains.length,
      entities: domains
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const domain = await Domain.findOne({ _id: req.params.id }).populate("petTypeId");
    res.json({
      success: true,
      domain: {
        domainId: domain._id,
        domainName: domain.domainName,
        petTypeId: domain.petTypeId,
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Domain.findOneAndDelete({ _id: req.params.id })
    res.json({
      state: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
