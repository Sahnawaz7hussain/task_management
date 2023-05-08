import React from "react";
import { io } from "socket.io-client";
const socket_url = import.meta.env.VITE_SOCKET_CONNECTION_URL;

export const socket = io(socket_url);

// app context
export const AppContext = React.createContext();
