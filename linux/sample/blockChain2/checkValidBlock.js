// 블록구조가 유효한지 
// 현재 블록의 인덱스가 이전 블록의 인덱스보다 1만큼 큰지
// 이전 블록의 해시값과 현재 블록의 이전 해시가 같은지
// 데이터 필드로부터 계산한 머클루트와 블록 헤더의 머클루트가 동일한 지

// const {getLastBlock,createHash,createGenesisBlock,nextBlock} =require('./chainedBlock')
const merkle = require('merkle')
const {Blocks,getLastBlock,createHash,nextBlock} = require('./chainedBlock')

function isValidBlockStructure(block){
	return typeof(block.header.version) === 'string' 
			&& typeof(block.header.index) ==='number'
			&& typeof(block.header.previousHash) ==='string'
			&& typeof(block.header.timestamp) ==='number'
			&& typeof(block.header.merkleRoot) ==='string'
			&& typeof(block.body) ==='object'
}

// function isValidNewBlock(newBlock, previousBlock){
// 	if (isValidBlockStructure(newBlock)===false){
// 		console.log('Invalid Block Structure')
// 		return false;
// 	}
// 	else if (newBlock.header.index !== previousBlock.header.index + 1){
// 		console.log('Invalid Index')
// 		return false;
// 	}
// 	else if (createHash(previousBlock) !== newBlock.header.previousHash){
// 		console.log('Invalid previousHash')
// 		return false;
// 	}
// 	else if ((newBlock.body.length === 0 && ('0'.repeat(64) !== newBlock.header.merkleRoot))
// 			|| 
// 			(newBlock.body.length !== 0 && (merkle('sha256').sync(newBlock.body).root() !== newBlock.header.merkleRoot))){
// 				console.log('Invalid merkleRoot')
// 				return false;
// 			}
// 	return true;
// }
// let Blocks = [createGenesisBlock()]

function isValidNewBlock(newBlock, previousBlock){
	// 새로운 블록 구조 유효성 검사를 실패 하였을 때 return false
	if (!isValidBlockStructure(newBlock)){
		console.log('Invalid Block Structure');
		return false;
	}
	// 새로운 블록의 인덱스가 이전 블록의 인덱스보다 1만큼 큰지. 아닐 시 return false
	else if (newBlock.header.index !== previousBlock.header.index +1){
		console.log('Invalid Index');
		return false;
	}
	// 새로운 블록의 이전 해시값이 이전 블록의 해시 값이 아닐 때 return false
	else if (newBlock.header.previousHash !== createHash(previousBlock)){
		console.log('Invalid previousHash');
		return false;
	}
	// 데이터 필드로부터 계산한 머클루트와 블록 헤더의 머클루트가 동일하지 않으면 return false
	else if (
		// 새로운 블록안의 body 데이터가 없을 때 머클 루트 비교
		(newBlock.body.length === 0 && ('0'.repeat(64) !== newBlock.header.merkleRoot))
		||
		// 새로운 블록안의 body 데이터가 있을 때 해당 데이터의 머클 루트 비교
		(newBlock.body.length !== 0 && (merkle('sha256').sync(newBlock.body).root() !== newBlock.header.merkleRoot))
	) {
		console.log('Invalid merkleRoot');
		return false;
	}

	// 해당 블록 검증 완료
	return true
}

function addBlock(newBlock){
	if(isValidNewBlock(newBlock, getLastBlock())){
		console.log('valid block!!')
		Blocks.push(newBlock)
		return true;
	}
	return false
}

const afterBlock = nextBlock(['new Transaction'])
addBlock(afterBlock)
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