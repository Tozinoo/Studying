// 블록구조가 유효한지 
// 현재 블록의 인덱스가 이전 블록의 인덱스보다 1만큼 큰지
// 이전 블록의 해시값과 현재 블록의 이전 해시가 같은지
// 데이터 필드로부터 계산한 머클루트와 블록 헤더의 머클루트가 동일한 지

// const {getLastBlock,createHash,createGenesisBlock,nextBlock} =require('./chainedBlock')
const merkle = require('merkle')
const {Blocks,getLastBlock,createHash,isValidTimeStamp, hashMatchesDifficulty} = require('./chainedBlock')

function isValidBlockStructure(block){
	return typeof(block.header.version) === 'string' 
			&& typeof(block.header.index) ==='number'
			&& typeof(block.header.previousHash) ==='string'
			&& typeof(block.header.timestamp) ==='number'
			&& typeof(block.header.merkleRoot) ==='string'
			&& typeof(block.header.difficulty) ==='number'
			&& typeof(block.header.nonce) ==='number'
			&& typeof(block.body) ==='object'
}

function isValidNewBlock(newBlock, previousBlock){
	if (isValidBlockStructure(newBlock)===false){
		console.log('Invalid Block Structure')
		return false;
	}
	else if (newBlock.header.index !== previousBlock.header.index + 1){
		console.log('Invalid Index')
		return false;
	}
	else if (createHash(previousBlock) !== newBlock.header.previousHash){
		console.log('Invalid previousHash')
		return false;
	}
	else if ((newBlock.body.length === 0 && ('0'.repeat(64) !== newBlock.header.merkleRoot))
			|| 
			(newBlock.body.length !== 0 && (merkle('sha256').sync(newBlock.body).root() !== newBlock.header.merkleRoot))){
				console.log('Invalid merkleRoot')
				return false;
			}
	// 유효하지 않은 타임 스탬프
	else if (!isValidTimeStamp(newBlock, previousBlock)){
		console.log("Invalid TimeStamp")
		return false;
	}
	// 유효하지 않은 해시
	else if (!hashMatchesDifficulty(createHash(newBlock),newBlock.header.difficulty)){
		console.log("Invalid hash")
		return false;
	}
	return true;
}
// let Blocks = [createGenesisBlock()]

function isValidChain(newBlocks){
	if (JSON.stringify(newBlocks[0]) !== JSON.stringify(Blocks[0])){
		return false;
	}
	
	var tempBlocks = [newBlocks[0]]
	for(var i =1; i< newBlocks.length; i++){
		if(isValidNewBlock(newBlocks[i], tempBlocks[i-1])){
			tempBlocks.push(newBlocks[i])
		}
		else{
			return false;
		}
	}
	return true;
}

function addBlock(newBlock){
	if(isValidNewBlock(newBlock, getLastBlock())){
		Blocks.push(newBlock)
	}
	return false
}

// const afterBlock = nextBlock(['new Transaction'])
// addBlock(afterBlock)
console.log(Blocks)



// function addBlock(bodyData){
// 	const newBlock = nextBlock(bodyData)
// 	console.log('뉴블럭',typeof(newBlock.header))
// 	console.log('data값', newBlock.header)
// 	addBlock1(newBlock)
// }

// addBlock(['asdfasdf'])
// addBlock(['asdfasdf1'])

// console.log("Blocks",Blocks)



module.exports={addBlock}