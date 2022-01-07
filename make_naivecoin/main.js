"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var express = require("express");
var block_1 = require("./block");
var httpPort = parseInt(process.env.HTTP_PORT) || 3001;
var p2pPort = parseInt(process.env.P2P_PORT) || 6001;
var initHttpServer = function (myHttpPort) {
    var app = express();
    app.use(bodyParser.json());
    app.get("/", function (req, res) {
        res.send({ welcome: "welcome" });
    });
    app.get("/blocks", function (req, res) {
        res.send((0, block_1.getBlockchain)());
    });
    app.post("/mineblock", function (req, res) {
        var newBlock = (0, block_1.generateNextBlock)(req.body.data);
        res.send(newBlock);
    });
    app.listen(myHttpPort, function () {
        console.log("Listening http on port : " + myHttpPort);
    });
};
initHttpServer(httpPort);
