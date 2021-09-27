const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const fs = require("fs");

// 0빈 공간, 1은 예약가능 좌석, 2는 예약완료 좌석으로 구분
let seats = [
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

// 웹 서버 생성
const app = express();
const server = http.createServer(app);

// 라우트
app.get("/", (req, res, next) => {
    fs.readFile("Page.html", (error, data) => {
        res.send(data.toString());
    });
});

app.get("/seats", (req, res, next) => {
    res.send(seats);
});

server.listen(3000, () => {
    console.log("3000포트 사용");
});

// 소켓 서버 실행
// 소켓 서버는 reserve 이벤트를 받으면 변수 seat 변경
const io = socketio.listen(server);
io.sockets.on("connection", (socket) => {
    socket.on("reserve", (data) => {
        seats[data.y][data.x] = 2;
        io.sockets.emit("reserve", data);
    });
});
