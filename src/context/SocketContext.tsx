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
    return () => {
      if (!window.location.pathname.includes("room")) socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
