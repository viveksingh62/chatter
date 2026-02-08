    const jwt = require("jsonwebtoken");

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.userId = decoded._id;      // ✅ attach userId
    socket.email = decoded.email;     // optional

    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});
