// test_merkleTree.js
const {MerkleTree} = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

console.log(SHA256('a').toString()) // ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb

const testSet = ['a', 'b', 'c', 'd', 'e']
const testArray = testSet.map((v) => SHA256(v).toString())

console.log(testArray) // testSet SHA256 해시값 변환한 것들 testArray에 담았음

const testMerkleTree = new MerkleTree(testArray, SHA256)
console.log(testMerkleTree) // testArray를 MerkleTree로 생성 트리로 값 반환

const merkleRoot = testMerkleTree.getRoot()
console.log(merkleRoot.toString('hex')) // 해당 트리의 hash 값 d71f8983ad4ee170f8129f1ebcdd7440be7798d8e1c80420bf11f1eced610dba

const trueTestValue = 'a'
const trueLeaf = SHA256(trueTestValue)
const trueProof = testMerkleTree.getProof(trueLeaf)
console.log(trueProof) // proof리턴 ( position, Buffer data )

const trueResult = testMerkleTree.verify(trueProof, trueLeaf, merkleRoot)
console.log(trueResult) // true

const falseTestValue = 'z'
const falseLeaf = SHA256(falseTestValue)
const falseProof = testMerkleTree.getProof(falseLeaf)
console.log(falseProof) // testMerkleTree에서 해당 Proof 가져올 수 없음 빈 배열 반환[]



