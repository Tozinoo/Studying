import _ from "lodash";

const cloneObject = (obj) => {
  let clone = {};
  for (let key in obj) {
    if (typeof obj[key] == "object" && obj[key] != null) {
      clone[key] = cloneObject(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }

  return clone;
};

let grandeur = { engine: "gdi", cc: 3000 };
let aa = { name: "kildong", age: 20, car: grandeur };
let bb = JSON.parse(JSON.stringify(aa));
let cc = _.cloneDeep(aa);
let dd = cloneObject(aa);

console.log(Object.is(aa, bb));
console.log(Object.is(aa.car, bb.car));
console.log(Object.is(aa.car, cc.car));
console.log(Object.is(aa.car, dd.car));
