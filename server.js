// /* eslint-disable @typescript-eslint/no-require-imports */
// // server.js
// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   ws.on("message", (message) => {
//     console.log("Received:", message);
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected");
//   });
// });

// const sendNotification = (notification) => {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(notification));
//     }
//   });
// };

// module.exports = { sendNotification };
