import { io } from "socket.io-client";

export const socket = io.connect(import.meta.VITE_APP_SERVER);