import * as bodyParser from "body-parser";
import * as express from "express";
import { Block, generateNextBlock, getBlockchain } from "./block";

const httpPort: number = parseInt(process.env.HTTP_PORT) || 3001;
const p2pPort: number = parseInt(process.env.P2P_PORT) || 6001;

const initHttpServer = (myHttpPort: number) => {
    const app = express();
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
        res.send({ welcome: "welcome" });
    });

    app.get("/blocks", (req, res) => {
        res.send(getBlockchain());
    });

    app.post("/mineblock", (req, res) => {
        const newBlock: Block = generateNextBlock(req.body.data);
        res.send(newBlock);
    });

    app.listen(myHttpPort, () => {
        console.log("Listening http on port : " + myHttpPort);
    });
};

initHttpServer(httpPort);
