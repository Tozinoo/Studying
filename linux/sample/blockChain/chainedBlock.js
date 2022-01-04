const cryptojs = require('crypto-js')
const fs = require('fs')
const merkle = require('merkle')

// 블록이 10초마다 생성이 되고, 10개의 블록이 만들어 질 때마다 난이도 조정을 해준다.
const BLOCK_GENERATION_INTERVAL = 10 // second 블록 생성 간격
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10 // in blocks 난이도 조정 빈도

// 위 2개 곲한 값이 기대 시간

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
	const timestamp = 1231006505 // 2009/01/03 6:15pm(UTC) 최초 비트코인이 만들어진 시각                 // parseInt(Date.now()/1000)
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

// 현재 difficulty 가져오기
function getDifficulty(blocks){
	const lastBlock = blocks[blocks.length - 1];
	if (lastBlock.header.index !== 0 && lastBlock.header.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0){
		return getAdjustDifficulty(lastBlock,blocks);
	}
	return lastBlock.header.difficulty;
}

// 난이도 조정
function getAdjustDifficulty(lastBlock, blocks){
	const prevAdjustmentBlock = blocks[blocks.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
	const elapsedTime = lastBlock.header.timestamp - prevAdjustmentBlock.header.timestamp
	const expectedTime = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL

	// 실제 걸린 시간 보다 기대 시간 값이 클 때
	if (expectedTime / 2 > elapsedTime){
		return prevAdjustmentBlock.header.difficulty + 1;
	}
	// 실제 걸린 시간 보다 기대 시간 값이 작을 때
	else if (expectedTime * 2 < elapsedTime) {
		return prevAdjustmentBlock.header.difficulty - 1;
	}
	// 나머지
	else {
		return prevAdjustmentBlock.header.difficulty;
	}
}

// 현재 시간 구하기
function getCurrentTimeStamp(){
	return Math.round(Date.now()/1000); // 반올림
}

function isValidTimeStamp(newBlock, prevBlock){
	// 새로운 블럭의 생성 시간 - 이전 블럭의 생성시간 값이 60초보다 작을 때
	if (newBlock.header.timestamp - prevBlock.header.timestamp < 60) return false;
	console.log ( "getCurrent : " + getCurrentTimeStamp() + " newBlock : ", newBlock.header.timestamp)
	console.log (getCurrentTimeStamp() - prevBlock.header.timestamp )
	if (getCurrentTimeStamp() - prevBlock.header.timestamp < 60 ) return false;
	console.log(22)
	return true;
}

function replaceChain(newBlocks){
    //우선 유효성 검사부터
    if (isValidChain(newBlocks)) {
        // random.boolena 바꿔도 되고 안바꿔도 되는데 혹시 모르니까 원장 확보
        if ((newBlocks.length > Blocks.length) || (newBlocks.length === Blocks.length) && random.boolean()){
            Blocks=newBlocks
            broadcast(responseLatestMsg());
        }
        else{
            console.log("받은 원장에 문제가 있음")    
        }
    }
}

module.exports={Blocks,getLastBlock,createHash, nextBlock,getVersion,getBlocks,isValidTimeStamp,replaceChain,hashMatchesDifficulty}