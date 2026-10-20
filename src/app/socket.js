import { io } from "socket.io-client";

export const socket = io.connect(import.meta.env.VITE_APP_SERVER, {
    transports: ["polling", "websocket"],
    withCredentials: true,
    autoConnect: true,
    reconnectionAttempts: 5,
    rememberUpgrade: true
});