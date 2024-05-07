import VideoBox from "@/components/VideoBox";
import React, { useState, useEffect, useRef } from "react";
import socket from "../socket";
export default function ChatRoom() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
      console.log("connected" + socket);
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <section className="bg-gray-800 text-white w-screen h-screen flex justify-between">
      <p className="text-white">
        Status: {isConnected ? "connected" : "disconnected"}
      </p>
      <p className="text-white">Transport: {transport}</p>
    </section>
  );
}
