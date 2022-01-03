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
	constructor (version, index, previousHash, timestamp, merkleRoot, difficulty, nonce){
		this.version = version
		this.index = index
		this.previousHash = previousHash
		this.timestamp = timestamp
		this.merkleRoot = merkleRoot
		this.difficulty = difficulty
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
	const timestamp = 1231006505 // 2009/01/03 6:15pm(UTC) 최초 비트코인이 만들어진 시각                 //parseInt(Date.now()/1000)
	const body = ['The Times 03/Jan/2009 Chancellor on brink of second bailout for banks']
	const tree = merkle('sha256').sync(body)
	const merkleRoot = tree.root() || '0'.repeat(64)
	const difficulty = 0
	const nonce = 0
	const index = 0

	const header = new BlockHeader(version, index, previousHash, timestamp, merkleRoot, difficulty, nonce)
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
	const {version,index, previousHash, timestamp, merkleRoot, difficulty, nonce} = data.header
	const blockString = version + index + previousHash + timestamp + merkleRoot + difficulty + nonce
	const hash = cryptojs.SHA256(blockString).toString()
	return hash
}

function calculateHash(version,index, previousHash, timestamp, merkleRoot, difficulty, nonce){
	const blockString = version + index + previousHash + timestamp + merkleRoot + difficulty + nonce
	const hash = cryptojs.SHA256(blockString).toString()
	return hash
}

const block = createGenesisBlock()
//const testHash = createHash(block)
//console.log("testHash",block)


function nextBlock(bodyData){
	const prevBlock = getLastBlock()

	const version = getVersion()
	const index = prevBlock.header.index + 1 
	const previousHash = createHash(prevBlock)
	const timestamp = parseInt(Date.now() / 1000)
	const tree = merkle('sha256').sync(bodyData)
	const merkleRoot = tree.root() || '0'.repeat(64)
	const difficulty = 0
	//const nonce = 0
	
	const header = findBlock(version, index,previousHash, timestamp, merkleRoot, difficulty)
	return new Block(header, bodyData)
}

// const block1 = nextBlock(['transaction1'])
// console.log('block1',block1)


function addBlock(bodyData){
	const newBlock = nextBlock(bodyData)
	Blocks.push(newBlock)
}

// addBlock(['transaction1'])
// addBlock(['transaction2'])
// addBlock(['transaction3'])
// addBlock(['transaction4'])
// addBlock(['transaction5'])


//module.exports ={getLastBlock,createHash,createGenesisBlock,nextBlock}

function hexToBinary(s){
	const lookupTable = {
		'0':'0000', '1':'0001','2':'0010','3':'0011',
		'4':'0100', '5':'0101','6':'0110','7':'0111',
		'8':'1000', '9':'1001','A':'1110','B':'1011',
		'C':'1100', 'D':'1101','E':'1110','F':'1111',
	}
	
	var ret = ""
	for(var i = 0; i < s.length; i++){
		if (lookupTable[s[i]]){
			ret += lookupTable[s[i]]
		}
		else {return null;}
	}
	return ret;
}

function hashMatchesDifficulty(hash, difficulty){
	const hashBinary = hexToBinary(hash.toUpperCase())
	const requirePrefix = '0'.repeat(difficulty)
	return hashBinary.startsWith(requirePrefix)
}

function findBlock(currentVersion, nextIndex, previousHash, nextTimestamp, merkleRoot, difficulty){
	var nonce = 0;

	while(true){
		var hash = calculateHash(currentVersion, nextIndex, previousHash, nextTimestamp, merkleRoot, difficulty, nonce)

		if (hashMatchesDifficulty(hash,difficulty)){
			return new BlockHeader(currentVersion, nextIndex, previousHash, nextTimestamp, merkleRoot, difficulty, nonce)
		}

		nonce++;
	}
}

module.exports={Blocks,getLastBlock,createHash, nextBlock,getVersion,getBlocks}