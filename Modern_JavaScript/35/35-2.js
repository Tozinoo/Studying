const arr1 = [1, 4];
const arr2 = [2, 3];

arr1.splice(1, 0, ...arr2);
console.log(arr1);

const origin = [1, 2];
const copy = [...origin]; // 얕은 복사

console.log(copy);
console.log(copy === origin);
