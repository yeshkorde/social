import { createContext, useEffect, useMemo } from "react";

import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const socket = io("http://localhost:3000", {
    withCredentials: true,
    transports: ["websocket"], // Force WebSocket transport
  });

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

const value = {
  socket
}

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
