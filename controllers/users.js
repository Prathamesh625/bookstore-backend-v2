const express = require("express");
const shortid = require("short-id");
const nodemailer = require("nodemailer");
const accountSid = "AC24ab154f1508ebd2f389ec9d5c33e3d2";
const authToken = "d4e370d28ce518083fe729c43348e704";
const twilio = require("twilio")(accountSid, authToken);

const router = express.Router();
const userSchema = require("../database/user");

const { messages, sendMessageFun } = require("./MessagingService");

router.get("/users", async (req, res) => {
  const userlist = await userSchema.find();
  try {
    res.json(userlist);
  } catch (error) {
    res.json(error);
  }
});
router.get("/:id", async (req, res) => {
  const user = await userSchema.findById(req.params.id);

  try {
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.get("/userSort", async (req, res) => {
  const userlist = await userSchema.find().sort({ fname: 1, lname: 1 });

  try {
    res.json(userlist);
  } catch (error) {
    res.json(error);
  }
});

router.post("/search", async (req, res) => {
  const abook = await userSchema.updateOne(
    { _id: req.body._id },
    { $push: { History: req.body.History } }
  );

  try {
    res.json(abook);
  } catch (error) {
    res.json(error);
  }
});

router.post("/recent/search/history", async (req, res) => {
  const recentSearch = await userSchema.updateOne(
    { _id: req.body._id },
    { $push: { searchedHistory: req.body.searchedHistory } }
  );

  try {
    res.json(recentSearch);
  } catch (error) {
    res.json(error);
  }
});

router.put("/:id/post/data", async (req, res) => {
  const postData = await userSchema.updateOne(
    { _id: req.params.id },
    {
      address: req.body.address,
    }
  );

  try {
    res.json(postData);
  } catch (error) {
    res.json(error);
  }
});

router.post("/data", async (req, res) => {
  const id = shortid.generate();

  const newUser = new userSchema({
    Mobile: req.body.Mobile,
    email: req.body.email,
    password: req.body.password,
    code: id,
    fname: req.body.fname,
    lname: req.body.lname,
    confpassword: req.body.confpassword,
  });

  const Save = await newUser.save();

  res.json(Save);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "prathameshthorat625@gmail.com",
      pass: "lbbv vtuj musu gfon",
    },
  });

  var mailOptions = {
    from: "prathameshthorat625@gmail.com",
    to: `${Save.email}`,
    subject: `Email verifiaction`,
    text: `verification code for email is ${id}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sented succesfully" + info.response);
    }
  });

  try {
    const sendMessage = await twilio.messages.create({
      body: `Your OTP for verification of Bookstore is ${id}`,
      from: "+19123015531",
      to: `+91${Save.Mobile}`,
    });

    console.log(sendMessage);
    res.json(sendMessage);
  } catch (error) {
    console.log(error);
  }
});

router.post("/verification", async (req, res) => {
  const codeVerify = await userSchema.findOne({ code: req.body.code });

  if (codeVerify) {
    res.send(codeVerify);
  } else {
    res.send("invalid code");
  }
});

router.post("/update/password", async (req, res) => {
  const update = await userSchema.updateOne(
    { email: req.body.email },
    { $set: { password: req.body.password } }
  );
  if (update.matchedCount === 1) {
    res.json("updated");
  } else {
    res.json("not updated");
  }
  res.json(update);
});

router.post("/purchased", async (req, res) => {
  const purchased = await userSchema.findByIdAndUpdate(
    { _id: req.body._id },
    {
      $push: {
        orderedHistory: req.body.orderedHistory,
      },
    }
  );
  res.json(purchased);
});

router.post("/login", async (req, res) => {
  const userLogin = await userSchema.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (userLogin) {
    res.json(userLogin);
  } else {
    res.json("User does not exist");
  }
});

router.post("/deleteMany", async (req, res) => {
  const deleUser = await userSchema.deleteMany([{ _id: req.body._id }]);
  res.json(deleUser);
});

module.exports = router;
