const express = require("express");
const userSchema = require("../database/user");
const booksSchema = require("../database/Schema");
const router = express.Router();

router.get("/:id/myCart/all/items", async (req, res) => {
  try {
    const cart = await userSchema.findById(req.params.id);
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id/post", async (req, res) => {
  try {
    const cart = await userSchema.find(req.params.id);
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:userid/remove/item/:itemId/cart", async (req, res) => {
  const cart = await userSchema.updateOne(
    { _id: req.params.userid },
    { $pull: { cart: { id: req.params.itemId } } }
  );
  try {
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id/update/item/qty/cart", async (req, res) => {
  const bookid = req.query.bookid;
  const quantity = req.query.quantity;
  var updatedPrice = req.query.price;
  const price = req.query.price;
  var discount = req.query.discount;
  var updatedDiscount = req.query.discount;
  const updation = req.body.updation;
  console.log(updatedPrice);
  updatedPrice = price * quantity;
  updatedDiscount = discount * quantity;
  console.log(updatedPrice);
  console.log(updatedDiscount);
  console.log(price);
  try {
    const updateCart = await userSchema.updateOne(
      { _id: req.params.id, "cart.id": bookid },
      {
        $set: {
          "cart.$.quantity": quantity,
          "cart.$.price": price,
          "cart.$.updatedPrice": updatedPrice,
          "cart.$.discount": discount,
          "cart.$.updatedDiscount": updatedDiscount,
        },
      }
    );

    res.json(updateCart);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put("/:id/update/cart", async (req, res) => {
  try {
    const updateCart = await userSchema.updateOne(
      { _id: req.params.id },
      { $push: { cart: req.body.cart } }
    );
    res.json(updateCart);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
