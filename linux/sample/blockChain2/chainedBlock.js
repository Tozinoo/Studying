const cryptojs = require('crypto-js')
const fs = require('fs')
const merkle = require('merkle')

class Block{
	constructor(header, body){
		this.header = header
		this.body = body
	}
}

class BlockHeader {
	constructor (version, index, previousHash, timestamp, merkleRoot, bit, nonce){
		this.version = version
		this.index = index
		this.previousHash = previousHash
		this.timestamp = timestamp
		this.merkleRoot = merkleRoot
		this.bit = bit
		this.nonce = nonce
	}
}

function getVersion() {
	const package = fs.readFileSync("package.json")
	return JSON.parse(package).version
}

function createGenesisBlock() {
	const version = getVersion()
	const previousHash = '0'.repeat(64)
	const timestamp = parseInt(Date.now()/1000)
	const body = ['hello block']
	const tree = merkle('sha256').sync(body)
	const merkleRoot = tree.root() || '0'.repeat(64)
	const bit = 0
	const nonce = 0
	const index = 0

	const header = new BlockHeader(version, index, previousHash, timestamp, merkleRoot, bit, nonce)
	
	return new Block(header, body)
}

let Blocks = [createGenesisBlock()]

function getBlocks(){
	return Blocks
}

function getLastBlock(){
	return Blocks[Blocks.length-1]
}

function createHash(data){
	const {version,index, previousHash, timestamp, merkleRoot, bit, nonce} = data.header
	const blockString = version + index + previousHash + timestamp + merkleRoot + bit + nonce
	const hash = cryptojs.SHA256(blockString).toString()
	return hash
}

function nextBlock(bodyData){
	const prevBlock = getLastBlock()

	const version = getVersion()
	const index = prevBlock.header.index + 1 
	const previousHash = createHash(prevBlock)
	const timestamp = parseInt(Date.now() / 1000)
	const tree = merkle('sha256').sync(bodyData)
	const merkleRoot = tree.root() || '0'.repeat(64)
	const bit = 0
	const nonce = 0

	const header = new BlockHeader(version, index, previousHash, timestamp, merkleRoot, bit, nonce)
	
	return new Block(header, bodyData)
}

function addBlock(bodyData){
	const newBlock = nextBlock(bodyData)
	Blocks.push(newBlock)
}
// addBlock(['transaction'])

// const blockChain = getBlocks()
// console.log(blockChain)

module.exports={Blocks,getLastBlock,createHash, nextBlock,getVersion,getBlocks}