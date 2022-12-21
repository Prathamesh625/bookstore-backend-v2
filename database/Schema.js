const mongoose = require("mongoose");
const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  publications: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
  },
  information: {
    type: String,
    // required: true,
  },
  imgurl: String,
  discount: Number,
});

module.exports = mongoose.model("book", booksSchema);
