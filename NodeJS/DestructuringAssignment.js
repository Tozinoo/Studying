// 구조분해 할당
var candyMachine1 = {
    status: {
        name: "node",
        count: 5,
    },
    getCandy: function () {
        this.status.count--;
        return this.status.count;
    },
};
console.log(candyMachine1.status.count); // 5
var getCandy = candyMachine1.getCandy();
getCandy;
console.log(candyMachine1.status.count); // 4

const candyMachine2 = {
    status: {
        name: "node",
        count2: 5,
    },
    getCandy2() {
        this.status.count2--;
        return this.status.count2;
    },
};
console.log(candyMachine2.status.count2); // 5
// 구조분해 할당
const {
    getCandy2,
    status: { count2 },
} = candyMachine2;
candyMachine2.getCandy2();
console.log(candyMachine2.status.count2); //4

var array = ["nodejs", {}, 10, true];
var node = array[0]; // node = 'nodejs'
var obj = array[1]; // obj = {}
var bool = array[3]; // bool = true

var array2 = ["nodejs", {}, 10, true];
const [node2, obj2, , bool2] = array2;
// node2 = 'nodejs', obj2 = {}, bool2 = true
