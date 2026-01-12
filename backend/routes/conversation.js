const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const Conversation = require("../models/Conversation.js");

router.post("/", auth, async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body missing" });
  }

  const { recieverId } = req.body;
    if (!recieverId) {
    return res.status(400).json({ message: "receiverId required" });
  }

console.log(recieverId)
  let conversation = await Conversation.findOne({
    members: { $all: [req.user.id, recieverId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      members: [req.user.id, recieverId],
          
    
    });

    console.log("here is conversion ", conversation);
   
  } res.json(conversation);
});
module.exports = router;
