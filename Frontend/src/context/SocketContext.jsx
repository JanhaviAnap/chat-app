import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const socketContext = createContext();

// Custom hook to use socket context
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const URL = "http://3.111.213.157:5002";
    const SOCKET_URL = URL || "http://backend-service:5002" || "http://backend:5002" || "http://localhost:5002";

    // Retrieve user info from localStorage
    const storedUser = localStorage.getItem("ChatApp");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (parsedUser?.user?._id) {
      const socketInstance = io(SOCKET_URL, {
        query: {
          userId: parsedUser.user._id,
        },
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socketInstance.close();
    } else {
      // Cleanup if no user is found
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
