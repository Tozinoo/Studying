import * as WebSocket from "ws";
import { Server } from "ws";

const sockets: WebSocket[] = [];

enum MessageType {
    QUERY_LATEST,
    QUERY_ALL,
    RESPONSE_BLOCKCHAIN,
}

class Message {
    public type: MessageType;
    public data: any;
    constructor(type: MessageType, data: any) {
        (this.type = type), (this.data = data);
    }
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

    console.log("listening websocket p2p port on: " + p2pPort);
};

const initConnection = (ws: WebSocket) => {
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

const write = (ws: WebSocket, message: Message): void => {
    ws.send(JSON.stringify(message));
};

const broadcast = (message: Message): void => {
    sockets.forEach((socket) => {
        write(socket, message);
    });
};

export { initP2PServer };
