const razorpay = require("razorpay");
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
var instance = new Razorpay({
  key_id: "rzp_test_JqUdq6ytoMlBPu",
  key_secret: "8WP8bbJoDL0FereSFekzAroA",
});

router.post("/pay", async (req, res) => {
  const { amount, currency, receipt } = req.body;

  await instance.orders.create({ amount, currency, receipt }, (err, order) => {
    if (order) {
      res.json(order);
      console.log(order);
    } else {
      res.json(err);
      console.log(err);
    }
  });
});

router.post("/verifyOrder", async (req, res) => {
  const order_id = req.body.order_id;
  const payment_id = req.body.payment_id;
  const razorpay_signature = req.body.razorpay_signature;
  const key_secret = "8WP8bbJoDL0FereSFekzAroA";
  let hmac = crypto.createHmac("sha256", key_secret);
  hmac.update(order_id + "|" + payment_id);
  const generated_signature = hmac.digest("hex");
  if (razorpay_signature === generated_signature) {
    res.json({ success: true, message: "Payment has been verified" });
  } else res.json({ success: false, message: "Payment verification failed" });
});

module.exports = router;
