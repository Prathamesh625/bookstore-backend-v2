const mongoose = require("mongoose");
const booksSchema = require("./Schema");

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  Mobile: Number,
  email: { type: String, required: true },
  password: String,
  confpassword: String,
  code: String,
  address: String,
  date: { type: Date, default: Date.now },
  orderedHistory: [],
  searchedHistory: [],
  cart: [
    {
      id: String,
      name: String,
      information: String,
      url: String,
      quantity: Number,
      price: Number,
      updatedPrice: Number,
      discount: Number,
      updatedDiscount: Number,
    },
  ],
});

module.exports = mongoose.model("schema", userSchema);
