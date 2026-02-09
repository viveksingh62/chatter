import { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { createSocket } from "../utils/Socket";
import { AuthContext } from "./AuthContext";


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const {user} = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user?.token) return;
  console.log(" Sending token:", user.token);
    const newSocket = createSocket(user.token);
    newSocket.connect();
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user?.token]);


  return (
    <SocketContext.Provider value={ socket }>
      {children}
    </SocketContext.Provider>
  );
};
