/*
socekt.join() : 클라이언트를 방에 넣는다.
io.sockets.in() : 특정 방에 있는 클라이언트를 추출한다.
*/

// const fs = require("fs");
// const server = require("http").createServer();
// const io = require("socket.io").listen(server);

// server.listen("3000", (req, res) => {
//     console.log("3000사용");
// });

// server.on("request", (req, res) => [
//     fs.readFile("page.html", (error, data) => {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(data);
//     }),
// ]);

// io.sockets.on("connection", (socket) => {
//     // 방이름 저장용
//     let roomName = null;

//     socket.on("join", (data) => {
//         roomName = data;
//         socket.join(data);
//     });
//     socket.on("message", (data) => {
//         io.sockets.in(roomName).emit("message", "test");
//     });
// });

const http = require("http");
const fs = require("fs");
const socketio = require("socket.io");

const server = http
    .createServer((req, res) => {
        fs.readFile("page.html", (error, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    })
    .listen("3000", (req, res) => {
        console.log("3000사용");
    });

const io = socketio.listen(server);
io.sockets.on("connection", (socket) => {
    socket.on("message", (data) => {
        io.sockets.emit("message", data);
    });
});
