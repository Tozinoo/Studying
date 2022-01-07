import * as WebSocket from "ws";
import { Server } from "ws";

const sockets: WebSocket[] = [];

enum MessageType {
    QUERY_LATEST,
    QUERY_ALL,
    RESPONSE_BLOCKCHAIN,
}
console.log(sockets);

class Message {
    public type: MessageType;
    public data: any;
}

const getSockets = (): WebSocket[] => {
    return sockets;
};

getSockets();

const initP2PServer = (p2pPort: number) => {
    const server: Server = new WebSocket.Server({ port: p2pPort });
    server.on("connection", (ws: WebSocket) => {
        initConnection(ws);
    });
    server.on("open", function open() {
        server.send("something");
    });
    server.on("message", function message(data) {
        console.log("data,", data);
    });
    console.log("listening websocket p2p port on: " + p2pPort);
};

const initConnection = (ws: WebSocket) => {
    sockets.push(ws);
};
