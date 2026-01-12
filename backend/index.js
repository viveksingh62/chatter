require("dotenv").config();

const express = require("express");
const app = express();
const authRouter = require("./routes/authRouter");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
require("./models/dbConnection");
const { Server } = require("socket.io");
const cors = require("cors");
const { createServer } = require("http");
const userRouter = require("./routes/User");
const conversationRouter = require("./routes/conversation");
const Message = require("./models/Message.js")
const messageRouter = require("./routes/message.js")
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json()); // 👈 MUST
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/conversation", conversationRouter);
app.use("/message",messageRouter);
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("message", async ({ text, conversationId ,senderId}) => {
    console.log({ conversationId, text,senderId});

    const newMessage = await Message.create({
     
       senderId,
      conversationId,
      text
    })
    console.log(newMessage);
//     const populatedMessage = await newmessage.populate(
//   "senderId",
//   "_id name email image"
// );
    io.to(conversationId).emit("receive-message", {  _id: newMessage._id,
    text: newMessage.text,
    senderId: newMessage.senderId.toString(),
    conversationId: newMessage.conversationId.toString(),
    createdAt: newMessage.createdAt,});
  });
  socket.on("join-room", (conversationId) => {
    socket.join(conversationId);
    console.log(`user join the ${conversationId}`);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
