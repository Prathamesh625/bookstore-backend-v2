const express = require("express");
const orderSchema = require("../database/orderSchema");
const router = express.Router();
router.get("/All/Orders", async (req, res) => {
  try {
    const orders = await orderSchema.find();
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
});
router.get("/:id/yourOrders/details", async (req, res) => {
  try {
    const orders = await orderSchema.findById(req.params.id);
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
});
router.post("/yourOrders/details", async (req, res) => {
  try {
    const orders = await orderSchema.find({
      personId: req.body.personId,
    });
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
});

router.post("/create/new/order", async (req, res) => {
  let datetime = new Date();

  var time = datetime.toLocaleTimeString("en-GB", {
    timeStyle: "short",
  });
  var date = datetime.toLocaleString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const orders = new orderSchema({
    personName: req.body.personName,
    personId: req.body.personId,
    personEmail: req.body.personEmail,
    personMobileNo: req.body.personMobileNo,
    personAddress: req.body.personAddress,
    orderDetails: req.body.orderDetails,
    payment: req.body.payment,
    delivered: req.body.delivered,
    date: {
      date: date,
      time: time,
    },
  });
  try {
    const newOrder = await orders.save();
    console.log(newOrder);
    res.json(newOrder);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
