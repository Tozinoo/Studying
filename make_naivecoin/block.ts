import * as CryptoJS from "crypto-js";
import { MerkleTree } from "merkletreejs";
import * as fs from "fs";

// block class
class Block {
    public height: number;
    public hash: string;

    public version: number;
    public previousBlockHeaderHash: string;
    public merklerootHash: string;
    public time: number;
    public nbits: number;
    public nonce: number;

    public data: string[];

    constructor(
        height: number,
        hash: string,
        version: number,
        previousBlockHeaderHash: string,
        merklerootHash: string,
        time: number,
        nbits: number,
        nonce: number,
        data: string[]
    ) {
        this.hash = hash;
        this.height = height;
        this.version = version;
        this.previousBlockHeaderHash = previousBlockHeaderHash;
        this.merklerootHash = merklerootHash;
        this.time = time;
        this.nbits = nbits;
        this.nonce = nonce;
        this.data = data;
    }
}

// get version from package.json
const getVersion = (): number => {
    const version: any = fs.readFileSync("package.json");
    return JSON.parse(version).version;
};

// calculate Hash from block's header data
const calculateHash = (
    version: number,
    previousBlockHeaderHash: string,
    merklerootHash: string,
    time: number,
    nbits: number,
    nonce: number
): string => {
    return CryptoJS.SHA256(
        version +
            previousBlockHeaderHash +
            merklerootHash +
            time +
            nbits +
            nonce
    ).toString();
};

// calculate Hash for block
const calculateHashForBlock = (block: Block): string => {
    return calculateHash(
        block.version,
        block.previousBlockHeaderHash,
        block.merklerootHash,
        block.time,
        block.nbits,
        block.nonce
    );
};

// make merkleroot
const makeMerkleRoot = (blockData: string[]): string => {
    const leaves: any = blockData.map((x: string) => CryptoJS.SHA256(x));
    const tree: MerkleTree = new MerkleTree(leaves, CryptoJS.SHA256);
    const root: any = tree.getRoot().toString("hex");
    return root;
};

// make genesis block
const genesisBlock: Block = new Block(
    1,
    "0".repeat(64),
    1,
    "0".repeat(64),
    makeMerkleRoot(["my genesis block!!"]),
    1231006505,
    1,
    0,
    ["my genesis block!!"]
);

// init blockchain
let blockchain: Block[] = [genesisBlock];

// get whole block
const getBlockchain = (): Block[] => {
    return blockchain;
};

// get latest block
const getLatestBlock = (): Block => {
    const latestBlock: Block = blockchain[blockchain.length - 1];
    return latestBlock;
};

// generarte next Block
const generateNextBlock = (blockData: string[]): Block => {
    const previousBlock: Block = getLatestBlock();
    const version = getVersion();

    const nextHeight: number = previousBlock.height + 1;
    const nextMerklerootHash: string = makeMerkleRoot(blockData);
    const nextTime: number = Math.round(new Date().getTime() / 1000);
    const nextnBits: number = 1;
    const nextNonce: number = 1;
    const nextHash: string = calculateHash(
        version,
        previousBlock.hash,
        nextMerklerootHash,
        nextTime,
        nextnBits,
        nextNonce
    );

    const newBlock: Block = new Block(
        nextHeight,
        nextHash,
        version,
        previousBlock.hash,
        nextMerklerootHash,
        nextTime,
        nextnBits,
        nextNonce,
        blockData
    );

    return newBlock;
};

// check block structure
const isValidBlockStructure = (block: Block): boolean => {
    return (
        typeof block.height === "number" &&
        typeof block.hash === "string" &&
        typeof block.version === "number" &&
        typeof block.previousBlockHeaderHash === "string" &&
        typeof block.merklerootHash === "string" &&
        typeof block.time === "number" &&
        typeof block.nbits === "number" &&
        typeof block.nonce === "number" &&
        typeof block.data === "object"
    );
};

// check validation of block
const isValidNewBlock = (newBlock: Block, previousBlock: Block) => {
    if (isValidBlockStructure(newBlock) === false) {
        console.log(typeof newBlock.version);
        console.log("Invalid Block Structure");
        return false;
    } else if (previousBlock.height + 1 !== newBlock.height) {
        console.log("Invalid height");
        return false;
    } else if (previousBlock.hash !== newBlock.previousBlockHeaderHash) {
        console.log("Invalid hash");
        return false;
    } else if (
        (newBlock.data.length === 0 &&
            "0".repeat(64) !== newBlock.merklerootHash) ||
        (newBlock.data.length !== 0 &&
            makeMerkleRoot(newBlock.data) !== newBlock.merklerootHash)
    ) {
        console.log("Invalid Merkleroot");
        return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log("Invalid hash");
    }

    return true;
};

// add block to blockchain
const addBlockToChain = (bodyData: string[]) => {
    const newBlock: Block = generateNextBlock(bodyData);
    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
    }
};

const isValidChain = (blockchain: Block[]): boolean => {
    const isValidGenesis = (block: Block): boolean => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    }; // is that parameter's block is genesis?

    if (!isValidGenesis(blockchain[0])) {
        return false;
    } // if it's not genesis block, return false

    for (let i = 1; i < blockchain.length; i++) {
        if (!isValidNewBlock(blockchain[i], blockchain[i - 1])) {
            return false;
        }
    } // check chain loop

    return true;
};

const replaceChain = (newBlockChains: Block[]) => {
    if (
        isValidChain(newBlockChains) &&
        newBlockChains.length > getBlockchain().length
    ) {
        console.log(
            "Received blockchain is valid. Replacing current blockchain with received blockchain"
        );
        blockchain = newBlockChains;
    } else {
        console.log("Received blockchain invalid!");
    }
};

console.log(getBlockchain());
