
require("dotenv").config();
console.log("JWT_SECRET IN MIDDLEWARE:", process.env.JWT_SECRET);
const express = require("express");
const User = require("../models/userModel.js");
const router = express.Router();
const auth = require("../middleware/auth.js")

router.get("/", auth ,async (req, res) => {
  const users = await User.find({
    _id: { $ne: req.user.id }
  });



  res.json(users);
});


module.exports = router;
