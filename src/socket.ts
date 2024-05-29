import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_APP_BACKEND_URL as string;
export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  upgrade: false,
});
