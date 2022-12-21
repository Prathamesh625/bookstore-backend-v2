const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
mongo =
  "mongodb+srv://bookstore123:E5sMR70ZkRG5Cp5d@book-store.ykf2jaj.mongodb.net/?retryWrites=true&w=majority";

//mongo =
//"mongodb+srv://625PrathameshAdmin:sLQzhiZkszKVQuca@bookcluster.o6gck.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", () => console.log("something wrong"));
db.once("open", () => {
  console.log("connected to database");
});

app.use("/new", require("./controllers/users"));
app.use("/book", require("./controllers/books"));
app.use("/messages", require("./controllers/MessagingService"));
app.use("/orders", require("./controllers/orders"));
app.use("/payments", require("./controllers/payment"));
app.use("/cart", require("./controllers/cart"));
app.listen(PORT, console.log("working succesfully at " + PORT));
