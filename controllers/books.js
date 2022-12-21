const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const booksSchema = require("../database/Schema");

router.get("/booklist", async (req, res) => {
  try {
    const books = await booksSchema.find();
    res.json(books);
  } catch (err) {
    res.status(400).json(err, console.log("internal server error"));
  }
});

router.post("/newBook", async (req, res) => {
  const newBook = new booksSchema({
    name: req.body.name,
    category: req.body.category,
    publications: req.body.publications,
    price: req.body.price,
    rating: req.body.rating,
    information: req.body.information,
    imgurl: req.body.imgurl,
    discount: req.body.discount,
  });
  const book = await newBook.save();
  res.json(book);
});

router.get("/book/search", async (req, res) => {
  var search = req.query.book;
  try {
    const books = await booksSchema.find({
      name: { $regex: search, $options: "i" },
    });
    res.json(books);
  } catch (error) {
    res.json(error);
  }
});

router.get("/searchAbook", async (req, res) => {
  const searchBook = await booksSchema.find();

  try {
    res.json(searchBook);
  } catch (error) {
    res.json(error);
  }
});

router.get("/searchbook/mpsc", async (req, res) => {
  const books = await booksSchema.find({ category: "Mpsc" });

  try {
    res.json(books);
  } catch (error) {
    res.json(error);
  }
});
router.get("/searchbook/novels", async (req, res) => {
  const novels = await booksSchema.find({ category: "Novel" });

  try {
    res.json(novels);
  } catch (error) {
    res.json(error);
  }
});
router.get("/searchbook/biographies", async (req, res) => {
  const biographies = await booksSchema.find({ category: "Biographies" });

  try {
    res.json(biographies);
  } catch (error) {
    res.json(error);
  }
});
router.get("/searchbook/religious/books", async (req, res) => {
  const religious = await booksSchema.find({ category: "religious books" });

  try {
    res.json(religious);
  } catch (error) {
    res.json(error);
  }
});
router.get("/searchbook/others", async (req, res) => {
  const others = await booksSchema.find({ category: "others" });

  try {
    res.json(others);
  } catch (error) {
    res.json(error);
  }
});

router.post("/updateBookDetails", async (req, res) => {
  const update = await booksSchema.updateOne(
    { _id: req.body._id },
    {
      name: req.body.name,
      title: req.body.title,
      publications: req.body.publications,
      price: req.body.price,
      stars: req.body.stars,
      information: req.body.information,
      imgurl: req.body.imgurl,
      discount: req.body.discount,
    }
  );

  try {
    if (update.matchedCount === 1) {
      res.json("updated Succesfully");
    } else {
      res.json("not Updated");
    }
  } catch (error) {
    res.json(error);
  }
});

router.get("/SortBookByName", async (req, res) => {
  const sortByName = await booksSchema.find().sort({ name: 1 });

  try {
    res.json(sortByName);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/deleteBook", async (req, res) => {
  const deleteBook = await booksSchema.deleteOne({
    _id: req.body._id,
  });

  try {
    res.json(deleteBook);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
