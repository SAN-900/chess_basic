import { useEffect, useState } from "react";

export const useSocket = () => {
    const ws_url = process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:8080"; // Replace with your WebSocket URL

    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws = new WebSocket(ws_url);
        ws.onopen = () => {
            console.log("WebSocket connection established");
            setSocket(ws);
        }
        ws.onclose = () => {
            console.log("WebSocket connection closed");
            setSocket(null);
        }
        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        }
        return () => {
            if (ws) {
                ws.close();
            }
        }
    },[])


    return socket;
    }