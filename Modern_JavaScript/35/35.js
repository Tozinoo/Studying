let grandeur = { engine: "gdi", cc: 3000 };
let aa = { name: "kildong", age: 20, car: grandeur };
let bb = JSON.parse(JSON.stringify(aa));

console.log(Object.is(aa, bb));
console.log(Object.is(aa.car, bb.car));
