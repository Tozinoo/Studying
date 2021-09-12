const fs = require("fs");

console.log("시작");
let data = fs.readFileSync("./readme2.txt");
console.log("1번", data.toString());
console.log("끝");
