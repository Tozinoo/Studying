const isIterable = (v) => v != null && typeof v[Symbol.iterator] === "function";
console.log(isIterable([]));
console.log(isIterable(""));
console.log(isIterable(new Map()));
console.log(isIterable(new Set()));
console.log(isIterable({}));

const array = [1, 2, 3];

console.log(Symbol.iterator in array);

for (const item of array) {
  console.log(item);
}

const [a, ...rest] = array;
console.log(a, rest);

const obj = { a: 1, b: 2 };
console.log(Symbol.iterator in obj);

const obj2 = { 0: 1, 1: 2, length: 2 };
console.log(Symbol.iterator in obj2);

const iterator = array[Symbol.iterator]();
console.log("next" in iterator);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
