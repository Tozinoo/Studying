const path = require("path");
const express = require("express");
const app = express();
const WebSocket = require("ws");

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html")); // index.html 파일 응답
});

app.use("/", (req, res) => {
    res.sendFile("./index.html");
}); // index.html 파일 응답 })

const HTTPServer = app.listen(3001, () => {
    console.log("Server is open at port:3001");
});

const server = new WebSocket.Server({
    port: 3002,
});

server.on("connection", (ws, req) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(`새로운 클라이언트 [${ip}] 접속`);

    if (ws.readyState === ws.OPEN) {
        ws.send(`클라이언트[${ip}] 접속을 환영합니다. from 서버`);
    }

    ws.on("message", (msg) => {
        console.log(`클라이언트 [${ip}]에게서 수신한 메시지 : ${msg}`);
        ws.send("메시지 잘 받았습니다! from 서버");
    });

    ws.on("error", (err) => {
        console.log(err);
    });

    ws.on("close", () => {
        console.log(`클라이언트 [${ip}] 웹소켓 연결 종료`);
    });
});
