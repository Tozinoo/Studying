import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import { Block, generateNextBlock, getBlockchain } from "./block";
import { initP2PServer } from "./p2p";

const httpPort: number = parseInt(process.env.HTTP_PORT) || 3001;
const p2pPort: number = parseInt(process.env.P2P_PORT) || 6001;

const initHttpServer = (myHttpPort: number) => {
    const app = express();
    app.use(morgan("dev"));
    app.use(bodyParser.json());

    app.get("/", (req: any, res: any) => {
        res.send({ welcome: "welcome" });
    });

    app.get("/blocks", (req: any, res: any) => {
        res.send(getBlockchain());
    });

    app.post("/mineblock", (req: any, res: any) => {
        const newBlock: Block = generateNextBlock(req.body.data);
        res.send(newBlock);
    });

    app.listen(myHttpPort, () => {
        console.log("Listening http on port : " + myHttpPort);
    });
};

initHttpServer(httpPort);
initP2PServer(p2pPort);
