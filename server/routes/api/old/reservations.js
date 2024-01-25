const express = require("express");
const router = express.Router();

// Load User model
const Reservation = require("../../../models/old/Reservation");
const Baby = require("../../../models/old/Baby");
// @route POST api/reservations/
// @desc Register user
// @access Public
router.post("/", async (req, res) => {
  const { babyId, reservationDate, reservationFirstName, reservationLastName, reservationEmail,
    reservationPhone, reservationLocation, domainId, reservationPaymentStatus, city } = req.body;
  console.log(req.body)
  try {
    let reservation = new Reservation({
      babyId,
      reservationDate,
      reservationFirstName,
      reservationLastName,
      reservationEmail,
      reservationPhone,
      reservationLocation,
      domainId,
      reservationPaymentStatus,
      city
    });

    await reservation.save();

    let baby = await Baby.findById(reservation.babyId)
    baby.babyStatus = "reserved"
    await baby.save()

    reservation = await Reservation.findById(reservation._id).populate({
      path: "babyId", populate:
      {
        path: "literId", populate:
        {
          path: "literDad", populate:
          {
            path: "petTypeId"
          }
        }
      }
    }).populate({ path: "domainId", populate: { path: "petTypeId" } })

    return res.json({
      success: true,
      reservation: {
        reservationId: reservation._id,
        babyId: reservation.babyId,
        reservationDate: reservation.reservationDate,
        reservationFirstName: reservation.reservationFirstName,
        reservationLastName: reservation.reservationLastName,
        reservationEmail: reservation.reservationEmail,
        reservationPhone: reservation.reservationPhone,
        reservationLocation: reservation.reservationLocation,
        domainId: reservation.domainId,
        reservationPaymentStatus: reservation.reservationPaymentStatus,
        city: reservation.city
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/", async (req, res) => {
  const { reservationId, babyId, reservationDate, reservationFirstName, reservationLastName, reservationEmail,
    reservationPhone, reservationLocation, domainId, reservationPaymentStatus, city } = req.body;

  try {
    let reservation = await Reservation.findById(reservationId);
    if (reservation) {
      reservation.babyId = babyId
      reservation.reservationDate = reservationDate
      reservation.reservationFirstName = reservationFirstName
      reservation.reservationLastName = reservationLastName
      reservation.reservationEmail = reservationEmail
      reservation.reservationPhone = reservationPhone
      reservation.reservationLocation = reservationLocation
      reservation.domainId = domainId
      reservation.reservationPaymentStatus = reservationPaymentStatus
      reservation.city = city
      await reservation.save()
      let baby = await Baby.findById(reservation.babyId)
      baby.babyStatus = "reserved"
      await baby.save()
    }

    reservation = await Reservation.findById(reservationId).populate({
      path: "babyId", populate:
      {
        path: "literId", populate:
        {
          path: "literDad", populate:
          {
            path: "petTypeId"
          }
        }
      }
    }).populate({ path: "domainId", populate: { path: "petTypeId" } })

    return res.json({
      success: true,
      reservation: {
        reservationId: reservation._id,
        babyId: reservation.babyId,
        reservationDate: reservation.reservationDate,
        reservationFirstName: reservation.reservationFirstName,
        reservationLastName: reservation.reservationLastName,
        reservationEmail: reservation.reservationEmail,
        reservationPhone: reservation.reservationPhone,
        reservationLocation: reservation.reservationLocation,
        domainId: reservation.domainId,
        reservationPaymentStatus: reservation.reservationPaymentStatus,
        city: reservation.city
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find({}).populate({
      path: "babyId", populate:
      {
        path: "literId", populate:
        {
          path: "literDad", populate:
          {
            path: "petTypeId"
          }
        }
      }
    }).populate({ path: "domainId", populate: { path: "petTypeId" } })

    res.json({
      totalCount: reservations.length,
      entities: reservations
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate({
      path: "babyId", populate:
      {
        path: "literId", populate:
        {
          path: "literDad", populate:
          {
            path: "petTypeId"
          }
        }
      }
    }).populate({ path: "domainId", populate: { path: "petTypeId" } })
    res.json({
      success: true,
      reservation: {
        reservationId: reservation._id,
        babyId: reservation.babyId,
        reservationDate: reservation.reservationDate,
        reservationFirstName: reservation.reservationFirstName,
        reservationLastName: reservation.reservationLastName,
        reservationEmail: reservation.reservationEmail,
        reservationPhone: reservation.reservationPhone,
        reservationLocation: reservation.reservationLocation,
        domainId: reservation.domainId,
        reservationPaymentStatus: reservation.reservationPaymentStatus,
        city: reservation.city
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let reservation = await Reservation.findOneAndDelete({ _id: req.params.id })
    let baby = await Baby.findById(reservation.babyId)
    baby.babyStatus = "available"
    await baby.save()

    res.json({
      state: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
