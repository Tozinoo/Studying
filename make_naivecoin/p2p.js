"use strict";
exports.__esModule = true;
exports.initP2PServer = void 0;
var WebSocket = require("ws");
var sockets = [];
var MessageType;
(function (MessageType) {
    MessageType[MessageType["QUERY_LATEST"] = 0] = "QUERY_LATEST";
    MessageType[MessageType["QUERY_ALL"] = 1] = "QUERY_ALL";
    MessageType[MessageType["RESPONSE_BLOCKCHAIN"] = 2] = "RESPONSE_BLOCKCHAIN";
})(MessageType || (MessageType = {}));
var Message = /** @class */ (function () {
    function Message(type, data) {
        (this.type = type), (this.data = data);
    }
    return Message;
}());
var getSockets = function () {
    return sockets;
};
getSockets();
var initP2PServer = function (p2pPort) {
    var server = new WebSocket.Server({ port: p2pPort });
    server.on("connection", function (ws) {
        initConnection(ws);
    });
    console.log("listening websocket p2p port on: " + p2pPort);
};
exports.initP2PServer = initP2PServer;
var initConnection = function (ws) {
    sockets.push(ws);
    //initMessageHandler(ws);
};
// const JSONToObject = <T>(data: string): T => {
//     try {
//         return JSON.parse(data);
//     } catch (err) {
//         console.log(err);
//         return null;
//     }
// };
// const initMessageHandler = (ws: WebSocket) => {
//     ws.on("message", (data: string) => {
//         const message: Message = JSONToObject<Message>(data);
//     });
// };
var write = function (ws, message) {
    ws.send(JSON.stringify(message));
};
var broadcast = function (message) {
    sockets.forEach(function (socket) {
        write(socket, message);
    });
};
