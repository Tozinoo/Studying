/*
socket.io
socket.io 모듈의 메서드 
on : 소켓 이벤트 연결
emit : 소켓 이벤트를 발생


소켓 통신 종류
public : 자신을 포함한 모든 클라이언트에 데이터를 전달
broadcast : 자신을 제외한 모든 클라이언트에 데이터를 전달
private : 특정 클라이언트에 데이터를 전달
*/

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
    .listen(3000, () => {
        console.log("3000포트 사용중");
    });

//소켓 서버를 생성 및 실행
const io = socketio.listen(server);

let id = 0;
//connection -> 클라이언트가 웹 소켓 서버에 접속할 때 발생
io.sockets.on("connection", (socket) => {
    // 아이디 설정
    id = socket.id;

    socket.on("rint", (data) => {
        // console.log("클라이언트가 전송한 데이터 : ", data);
        // //클라이언트에 smart 이벤트를 발생시킴
        // socket.emit("smart", data);
        // public 통신
        // io.sockets.emit("smart", data);
        // broadcast 통신
        // socket.broadcast.emit("smart", data);

        io.sockets.to(id).emit("smart", data);
    });
});
