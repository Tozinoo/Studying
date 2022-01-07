import * as WebSocket from "ws";
import { Server } from "ws";

const sockets: WebSocket[] = [];

const initP2PServer = (p2pPort: number) => {
    const server: Server = new WebSocket.Server({ port: p2pPort });
};
