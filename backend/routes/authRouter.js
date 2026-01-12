const express = require("express");
const { googlelogin } = require("../controllers/authController");
const router = express.Router();
const auth = require("../middleware/auth.js");

router.get("/test", (req, res) => {

  console.log(req.user) 
   res.send("test");
});
router.get("/google", googlelogin);

module.exports = router;
