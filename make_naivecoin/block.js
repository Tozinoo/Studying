"use strict";
exports.__esModule = true;
exports.generateNextBlock = exports.addBlockToChain = exports.getBlockchain = exports.Block = void 0;
var CryptoJS = require("crypto-js");
var merkletreejs_1 = require("merkletreejs");
var fs = require("fs");
// block class
var Block = /** @class */ (function () {
    function Block(height, hash, version, previousBlockHeaderHash, merklerootHash, time, nbits, nonce, data) {
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
}());
exports.Block = Block;
// in seconds
var BLOCK_GENERATION_INTERVAL = 10;
// in blocks
var NBITS_ADJUSTMENT_INTERVAL = 10;
// get version from package.json
var getVersion = function () {
    var version = fs.readFileSync("package.json");
    var versionToInt = JSON.parse(version).version;
    return parseInt(versionToInt);
};
// calculate Hash from block's header data
var calculateHash = function (version, previousBlockHeaderHash, merklerootHash, time, nbits, nonce) {
    return CryptoJS.SHA256(version +
        previousBlockHeaderHash +
        merklerootHash +
        time +
        nbits +
        nonce).toString();
};
// calculate Hash for block
var calculateHashForBlock = function (block) {
    return calculateHash(block.version, block.previousBlockHeaderHash, block.merklerootHash, block.time, block.nbits, block.nonce);
};
// make merkleroot
var makeMerkleRoot = function (blockData) {
    var leaves = blockData.map(function (x) { return CryptoJS.SHA256(x); });
    var tree = new merkletreejs_1.MerkleTree(leaves, CryptoJS.SHA256);
    var root = tree.getRoot().toString("hex");
    return root;
};
// make genesis block
var genesisBlock = new Block(1, "0".repeat(64), 1, "0".repeat(64), makeMerkleRoot(["my genesis block!!"]), 1231006505, 1, 0, ["my genesis block!!"]);
// init blockchain
var blockchain = [genesisBlock];
// get whole block
var getBlockchain = function () {
    return blockchain;
};
exports.getBlockchain = getBlockchain;
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
    var nextnBits = getnBits(getBlockchain());
    var newBlock = findBlock(nextHeight, version, previousBlock.hash, nextMerklerootHash, nextTime, nextnBits, blockData);
    addBlockToChain(newBlock);
    return newBlock;
};
exports.generateNextBlock = generateNextBlock;
// check block structure
var isValidBlockStructure = function (block) {
    return (typeof block.height === "number" &&
        typeof block.hash === "string" &&
        typeof block.version === "number" &&
        typeof block.previousBlockHeaderHash === "string" &&
        typeof block.merklerootHash === "string" &&
        typeof block.time === "number" &&
        typeof block.nbits === "number" &&
        typeof block.nonce === "number" &&
        typeof block.data === "object");
};
// check validation of block
var isValidNewBlock = function (newBlock, previousBlock) {
    if (isValidBlockStructure(newBlock) === false) {
        console.log(typeof newBlock.version);
        console.log("Invalid Block Structure");
        return false;
    }
    else if (previousBlock.height + 1 !== newBlock.height) {
        console.log("Invalid height");
        return false;
    }
    else if (previousBlock.hash !== newBlock.previousBlockHeaderHash) {
        console.log("Invalid hash");
        return false;
    }
    else if ((newBlock.data.length === 0 &&
        "0".repeat(64) !== newBlock.merklerootHash) ||
        (newBlock.data.length !== 0 &&
            makeMerkleRoot(newBlock.data) !== newBlock.merklerootHash)) {
        console.log("Invalid Merkleroot");
        return false;
    }
    else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log("Invalid hash");
        return false;
    }
    else if (!isValidTime(newBlock, previousBlock)) {
        console.log("n:", newBlock.time, "p:", previousBlock.time);
        console.log("Invalid Time");
        return false;
    }
    return true;
};
// add block to blockchain
var addBlockToChain = function (newBlock) {
    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
    }
};
exports.addBlockToChain = addBlockToChain;
var isValidChain = function (blockchain) {
    var isValidGenesis = function (block) {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    }; // is that parameter's block is genesis?
    if (!isValidGenesis(blockchain[0])) {
        return false;
    } // if it's not genesis block, return false
    for (var i = 1; i < blockchain.length; i++) {
        if (!isValidNewBlock(blockchain[i], blockchain[i - 1])) {
            return false;
        }
    } // check chain loop
    return true;
};
var replaceChain = function (newBlockChains) {
    if (isValidChain(newBlockChains) &&
        newBlockChains.length > getBlockchain().length) {
        console.log("Received blockchain is valid. Replacing current blockchain with received blockchain");
        blockchain = newBlockChains;
    }
    else {
        console.log("Received blockchain invalid!");
    }
};
var hashMatchesnBits = function (hash, nbits) {
    var requiredPrefix = "0".repeat(nbits);
    return hash.startsWith(requiredPrefix);
};
var findBlock = function (nextHeight, version, previousBlockHeaderHash, merklerootHash, time, nbits, blockData) {
    var nonce = 0;
    while (true) {
        var hash = calculateHash(version, previousBlockHeaderHash, merklerootHash, time, nbits, nonce);
        if (hashMatchesnBits(hash, nbits)) {
            return new Block(nextHeight, hash, version, previousBlockHeaderHash, merklerootHash, time, nbits, nonce, blockData);
        }
        nonce++;
    }
};
var getnBits = function (aBlockChain) {
    var latestBlock = aBlockChain[aBlockChain.length - 1];
    if (latestBlock.height % BLOCK_GENERATION_INTERVAL === 0 &&
        latestBlock.height !== 0) {
        return getAdjustednBits(latestBlock, aBlockChain);
    }
    else {
        return latestBlock.nbits;
    }
};
var getAdjustednBits = function (latestBlock, aBlockChain) {
    if (aBlockChain.length <= 10) {
        return latestBlock.nbits;
    }
    var prevAdjustmentBlock = aBlockChain[aBlockChain.length - 10];
    var timeExpected = BLOCK_GENERATION_INTERVAL * NBITS_ADJUSTMENT_INTERVAL;
    var timeTaken = latestBlock.time - prevAdjustmentBlock.time;
    if (timeTaken < timeExpected / 2) {
        return prevAdjustmentBlock.nbits + 1;
    }
    else if (timeTaken > timeExpected * 2) {
        return prevAdjustmentBlock.nbits - 1;
    }
    else {
        return prevAdjustmentBlock.nbits;
    }
};
var isValidTime = function (newBlock, prevBlock) {
    if (newBlock.time - prevBlock.time < 1) {
        return false;
    }
    return true;
};
console.log(getBlockchain());
