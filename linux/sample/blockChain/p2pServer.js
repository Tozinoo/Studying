// p2pServer.js

// p2pServer.js의 replaceChain부터 만들어보자
// 가장 긴 체인(가장 최신의 원장)을 찾아서 

const WebSocket = require("ws");
const { getLastBlock, getBlocks, createHash, Blocks, replaceChain } = require("./chainedBlock");
const { addBlock } = require("./checkValidBlock");

function initP2PServer(test_port){
    const server = new WebSocket.Server({port:test_port})
    server.on("connection",(ws)=>{initConnection(ws);})
    console.log("Listening webSocket port : " + test_port)
}
initP2PServer(6001)
initP2PServer(6002) 
initP2PServer(6003)

let sockets = []

function initConnection(ws){
    sockets.push(ws) 
    initMessageHandler(ws)
    initErrorHandler(ws)
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

function handleBlockChainResponse(message){
    const receiveBlocks = JSON.parse(message.data)
    const latestReceiveBlock = receiveBlocks[receiveBlocks.length - 1]
    const latestMyBlock = getLastBlock()

    // 데이터로 받은 블럭 중에 마지막 블럭의 인덱스가 
    // 내가 보유 중인 마지막 블럭의 인덱스보다 클 때 / 작을 때
    if (latestReceiveBlock.header.index > latestMyBlock.header.index){
        // 받은 마지막 블록의 이전 해시 값이 내 마지막 블럭일 때 
        if (createHash(latestMyBlock)===latestReceiveBlock.header.previousHash){
            if (addBlock(latestReceiveBlock)){
                broadcast(responseLatestMsg())
            }
            else {
                console.log("Invalid Block!")
            }
        }

        // 받은 블록의 전체 크기가 1일 때
        else if (receiveBlocks.length===1){
            broadcast(queryAllMsg())
        }
        else {
            replaceChain(receiveBlocks)
        }
    } 
    else{
        console.log("My block is longer than You! Do nothing!")
    }
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

function initErrorHandler(ws){
    ws.on("close", ()=>{ closeConnection(ws); } )
    ws.on("error", ()=>{ closeConnection(ws); } )
}

function closeConnection(ws){
    console.log(`Connection close ${ws.url}`)
    sockets.splice(sockets.indexOf(ws), 1)
}

module.exports = {replaceChain,getSockets,connectToPeers}
