const express = require('express')
const bodyParser = require('body-parser')
const {getVersion,nextBlock,getBlocks} = require('./chainedBlock')
const {addBlock} = require('./checkValidBlock')
const {connectToPeers,getSockets}=require('./p2pServer')

// export http_port=3001
// env | grep http_port

const http_port = process.env.HTTP_PORT || 3001

function initHttpServer(){
    const app = express()
    app.use(bodyParser.json())


    //curl -H "Content-type: application/json" --data "{\"data\":[\"ws://localhost:6002\", \"ws://localhost:6003\"]}" -X POST http://localhost:3001/addPeers
    app.post("/addPeers", (req,res)=>{
        const data = req.body.data || []
        connectToPeers(data);
        res.send(data)
    })

    // curl -X GET http://localhost:3001/peers | python3 -m json.tool
    app.get("/peers",(req,res)=>{
        let sockInfo = []
        getSockets().forEach(
            (s)=>{
                sockInfo.push(s._socket.remoteAddress + ":" + s._socket.remotePort)
                console.log(s._socket)
            }
        )
        //res.send(sockInfo)
         res.send(getSockets())
    })

    app.get("/blocks",(req,res)=>{
        res.send(getBlocks())
    })
    // curl로 GET 가져오기 및 python으로 json 형식으로 받아오기
    // curl -X GET http://localhost:3001/blocks | python3 -m json.tool


    // curl -H "Content-type: application/json" --data "{\"data\":[\"testBlock1\"]}" http://localhost:3001/mineBlock
    app.post("/mineBlock",(req,res)=>{
        const data = req.body.data || []
        const block = nextBlock(data)
        addBlock(block)
        res.send(block)
    })
    // curl -H "Content-type: application/json" --data "{\"data\":[\"Anything1\",\"Anything2\"]}" -X POST http://localhost:3001/mineBlock
    // -H 옵션이 있기때문에 -X POST 빼도 상관없음

    app.get("/version",(req,res)=>{
        res.send(getVersion())
    })

    app.post("/stop",(req,res)=>{
        res.send({"msg" : "Stop Server"})
        process.exit()
    })
    // curl -X POST http://localhost:3001/stop

    app.listen(http_port, ()=>{
        console.log("Listening Http Port : ", http_port)
    })
}

initHttpServer()

