import React, { useEffect, useState } from "react";
import api from "../utils/api";
import socket from "../pages/Socket";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Chat({ conversationId }) {


  const [socketid, SetSockedID] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  console.log("Auth user:", user);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      SetSockedID(socket.id);
    });
    socket.on("receive-message", (data) => {
      console.log("message received", data);
      // setChatMessage(data);
     
      setMessages(prev=>{
        if(prev.some(m=>m._id==data._id)) return prev;
        return [...prev,data]
      })
    });

    return () => {
      socket.off("disconnect");
       socket.off("connect");
       
  socket.off("receive-message");
    };
  }, []);
  useEffect(() => { 
    
    if (conversationId) {
      socket.emit("join-room", conversationId);
    }
  }, [conversationId]);
  useEffect(() => {
    if(!conversationId) return;
    const fetchMessages = async()=>{
    const res = await api.get(`/message/${conversationId}`)
      setMessages(res.data)
    }
      fetchMessages();
  },[conversationId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!conversationId) {
      return alert("select a user first ");
    }
  //    const newMessage = {
  //   _id: Date.now(), // temporary id
  //   text: message,
  //   senderId: user._id,
  // };
  //  setMessages(prev => [...prev, newMessage]);
    socket.emit("message", {  
      text:message,
      conversationId,
      senderId:user._id,
    });
    console.log("sender",user._id)
     
  };

  // const handleJoin = (e) => {
  //   e.preventDefault();
  //   // socket.emit("join-room", joinroom);
  //   // setJoinRoom("");
  // };
  return (
 <>
      <h4>Socket ID: {socketid}</h4>

      {/* Messages */}
      <div style={{ minHeight: "300px" }}>
        {messages.map((msg) => (
          
          <div
            key={msg._id}
            style={{
              textAlign: msg.senderId && msg.senderId.toString() === user._id.toString()? "right" : "left",
              margin: "10px",
            }}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message"
          style={{ padding: "10px", width: "70%" }}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
export default Chat;
