import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const httpServer = createServer();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    path: "/ChatRoom/",
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Access specific properties of the socket
    console.log("Socket ID:", socket.id);
    console.log("Rooms:", socket.rooms);
    console.log("Handshake:", socket.handshake);
  });

  // Handle connection errors
  io.on("connect_error", (err) => {
    console.error("Connection error:", err);

    // If there's a connection error, revert to classic upgrade
    io.opts.transports = ["polling", "websocket"];
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
