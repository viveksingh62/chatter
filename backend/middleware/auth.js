const jwt = require("jsonwebtoken");



const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log("AUTH HEADER:", authHeader)
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded._id, email: decoded.email }; // ✅ attach user
      
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
