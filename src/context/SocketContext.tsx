// src/context/SocketContext.tsx
import React, { ReactNode, createContext, useContext, useEffect } from "react";
import { socket } from "../socket";

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext(socket);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  useEffect(() => {
    // Additional setup if needed on mount

    return () => {
      // Cleanup on unmount
      // if the page url does not have a roomId, disconnect the socket
      if (!window.location.pathname.includes("room")) socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
