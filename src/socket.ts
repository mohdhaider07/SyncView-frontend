// src/socket.ts
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Adjust if your backend is on a different URL or port

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  upgrade: false,
});
