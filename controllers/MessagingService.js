const express = require("express");
const router = express.Router();

const messages = router.post("/msg", async (req, res) => {
  try {
    const sendMessage = await twilio.messages.create({
      body: "Hello there!",
      from: "+19123015531",
      to: "+917822820841",
    });

    console.log(sendMessage);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
