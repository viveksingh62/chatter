import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

const Chatpage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/user");
      const filtered = res.data.filter((u) => u._id !== user._id);
      setUsers(filtered);
    };
    fetchUsers();
  }, [user]);
  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  };
  const handleSelectuser = async (reciever) => {
    const res = await api.post("/conversation", {
      recieverId: reciever._id,
    });
    setConversationId(res.data._id);

    console.log(res);
  };

  return (
    <div>
      <Sidebar users={users} onSelect={handleSelectuser} />
      <h3>Conversation ID: {conversationId}</h3>
      {conversationId && <Chat conversationId={conversationId} />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Chatpage;
