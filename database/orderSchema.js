const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  personId: {
    type: String,
    required: true,
  },
  personName: {
    type: String,
    required: true,
  },
  personEmail: {
    type: String,
  },
  personMobileNo: {
    type: Number,
    required: true,
  },
  personAddress: {
    type: String,
    required: true,
  },
  orderDetails: {
    type: Array,
    required: true,
  },

  payment: {
    success: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },

  delivered: {
    type: Boolean,
  },

  date: {
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
});

module.exports = mongoose.model("order", orderSchema);
