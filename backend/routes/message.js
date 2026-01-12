const express = require("express");
const router = express.Router();
const Message = require("../models/Message.js");
const auth = require("../middleware/auth.js");

router.get("/:conversationId", auth, async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  });
  res.json(messages);
});

module.exports = router;
