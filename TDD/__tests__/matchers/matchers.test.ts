// test("two plus two is four", () => {
//     expect(2 + 2).toBe(4);
// });

// test("object assignment", () => {
//     const data: { [key: string]: number } = { one: 1 };
//     data.two = 2;
//     expect(data).toEqual({ one: 1, two: 2 });
// });

// test("adding positive numbers is not zero", () => {
//     for (let i: number = 0; i < 10; i++) {
//         for (let j: number = 0; j < 0; j++) {
//             expect(i + j).not.toBe(0);
//         }
//     }
// });

// test("null", () => {
//     const n = null;
//     expect(n).toBeNull();
//     expect(n).toBeDefined();
//     expect(n).not.toBeUndefined();
//     expect(n).not.toBeTruthy();
//     expect(n).toBeFalsy();
// });

// test("zero", () => {
//     const z = 0;
//     expect(z).not.toBeNull();
//     expect(z).toBeDefined();
//     expect(z).not.toBeUndefined();
//     expect(z).not.toBeTruthy(); // 0은 false!
//     expect(z).toBeFalsy();
// });

// test("two plus two", () => {
//     const value: number = 2 + 2;
//     expect(value).toBeGreaterThan(3);
//     expect(value).toBeGreaterThanOrEqual(4);
//     expect(value).toBeLessThan(5);
//     expect(value).toBeLessThanOrEqual(4.5);
// });

// test("adding floating point numbers", () => {
//     const value: number = 0.1 * 0.2;
//     expect(value).toBeCloseTo(0.02);
// });

// test("no I", () => {
//     expect("team").not.toMatch(/I/);
// });

// test("but there is a Stop in ", () => {
//     expect("Christoph").toMatch(/stop/);
// });

// const shoppingList = [
//     "diapers",
//     "kleenex",
//     "trash bags",
//     "paper towels",
//     "milk",
// ];

// const set = new Set("abc");
// console.log(set.has("abc"));

// test("the shopping list has milk on it", () => {
//     expect(shoppingList).toContain("milk");
//     expect(new Set(shoppingList)).toContain("milk");
// });

// function compileAndroidCode() {
//     throw new Error("you are using the wrong JDK");
// }

// try {
// } catch (error) {
//     throw new Error("you are using the wrong JDK");
// }

// test("compiling android goes as expected", () => {
//     expect(() => compileAndroidCode()).toThrow();
//     expect(() => compileAndroidCode()).toThrow(Error);

//     expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
//     expect(() => compileAndroidCode()).toThrow(/JDK/);
// });
const fetchData = (cb: Function) => {
    const string: string = "peanut butter";
    setTimeout(() => {
        cb(string);
    }, 100);
};

test("the data is peanut butter", () => {
    function callback(data: string) {
        try {
            expect(data).toBe("11 butter");
            //done();
        } catch (error) {
            //done(error);
        }
    }
    fetchData(callback);
});
