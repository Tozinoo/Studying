const p2p_port = process.env.P2P_PORT || 6001

const WebSocket = require("ws");
const { getLastBlock, getBlocks } = require("./chainedBlock");

function initP2PServer(test_port){
    const server = new WebSocket.Server({port:test_port})
    server.on("connection",(ws)=>{initConnection(ws);})
    console.log("Listening webSocket port : " + test_port)
}
initP2PServer(6004)
initP2PServer(6005)
initP2PServer(6006)

let sockets = []

function initConnection(ws){
    sockets.push(ws)
}

function getSockets(){
    return sockets;
}

function write(ws,message){
    ws.send(JSON.stringify(message))
}

function broadcast(message){
    sockets.forEach(
        (socket)=>{
            write(socket, message);
        }
    )
}

function connectToPeers(newPeers){
    newPeers.forEach(
        (peer)=>{
            const ws = new WebSocket(peer)
            ws.on
            ws.on("open", ()=>{ 
                initConnection(ws); 
            })
            ws.on("error", ()=>{ console.log("connection Failed!"); })
        }
        )
}

// Message Handler 
const MessageType = {
    QUERY_LATEST:0,
    QUERY_ALL:1,
    RESPONSE_BLOCKCHAIN:2
}

function initMessageHandler(ws){
    ws.on("message",(data)=>{
        const message = JSON.parse(data)
        switch (message.type) {
            case MessageType.QUERY_LATEST:
                write(ws, responseLatestMsg());
                break;
            case MessageType.QUERY_ALL:
                write(ws, responseAllChainMsg());
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:
                handleBlockChainResponse(message);
                break;
        
            default:
                break;
        }
    })
}

function responseLatestMsg() {
    return ({
        "type": RESPONSE_BLOCKCHAIN,
        "data": JSON.stringify([getLastBlock()]),
    })
}

function responseAllChainMsg() {
    return ({
        "type": RESPONSE_BLOCKCHAIN,
        "data": JSON.stringify(getBlocks()),
    })
}

function handleBlockChainResponse(){

}

function queryAllMsg(){
    return ({
        "type": QUERY_ALL,
        "data": null,
    })
}

function queryLatestMsg(){
    return ({
        "type": QUERY_LATEST,
        "data": null,
    })
}

module.exports = {getSockets,connectToPeers}
