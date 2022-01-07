"use strict";
exports.__esModule = true;
var CryptoJS = require("crypto-js");
var merkletreejs_1 = require("merkletreejs");
var fs = require("fs");

// block class
var Block = /** @class */ (function () {
    function Block(
        height,
        hash,
        version,
        previousBlockHeaderHash,
        merklerootHash,
        time,
        nbits,
        nonce,
        data
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
    return Block;
})();
// get version from package.json
var getVersion = function () {
    var version = fs.readFileSync("package.json");
    return JSON.parse(version).version;
};
// calculate Hash from block's header data
var calculateHash = function (
    version,
    previousBlockHeaderHash,
    merklerootHash,
    time,
    nbits,
    nonce
) {
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
var calculateHashForBlock = function (block) {
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
var makeMerkleRoot = function (blockData) {
    var leaves = blockData.map(function (x) {
        return CryptoJS.SHA256(x);
    });
    var tree = new merkletreejs_1.MerkleTree(leaves, CryptoJS.SHA256);
    var root = tree.getRoot().toString("hex");
    return root;
};
// make genesis block
var genesisBlock = new Block(
    1,
    "0".repeat(64),
    1,
    "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7",
    makeMerkleRoot(["my genesis block!!"]),
    1231006505,
    1,
    0,
    ["my genesis block!!"]
);
// init blockchain
var blockchain = [genesisBlock];
// get whole block
var getBlockchain = function () {
    return blockchain;
};
// get latest block
var getLatestBlock = function () {
    var latestBlock = blockchain[blockchain.length - 1];
    return latestBlock;
};
// generarte next Block
var generateNextBlock = function (blockData) {
    var previousBlock = getLatestBlock();
    var version = getVersion();
    var nextHeight = previousBlock.height + 1;
    var nextMerklerootHash = makeMerkleRoot(blockData);
    var nextTime = Math.round(new Date().getTime() / 1000);
    var nextnBits = 1;
    var nextNonce = 1;
    var nextHash = calculateHash(
        version,
        previousBlock.hash,
        nextMerklerootHash,
        nextTime,
        nextnBits,
        nextNonce
    );
    var newBlock = new Block(
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
var isValidBlockStructure = function (block) {
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
var isValidNewBlock = function (newBlock, previousBlock) {
    if (!isValidBlockStructure(newBlock)) {
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
var addBlock = function (bodyData) {
    var newBlock = generateNextBlock(bodyData);
    blockchain.push(newBlock);
};
addBlock(["transaction1"]);
addBlock(["transaction2"]);
addBlock(["transaction3"]);
// const addBlock = (newBlock: Block) => {
//     if (isValidNewBlock(newBlock, getLatestBlock())) {
//         blockchain.push(newBlock);
//     }
// };
console.log(getLatestBlock());
console.log(getBlockchain());
