const condition = true;

const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve("성공");
    } else {
        reject("실패");
    }
});
// 다른 코드가 들어갈 수 있음
promise
    .then((message) => {
        console.log(message);
        return new Promise((resolve, reject) => {
            resolve(message);
        }); // resolve(성공)한 경우 실행
    })
    .then((message2) => {
        console.log(message2);
        return new Promise((resolve, reject) => {
            resolve(message2);
        });
    })
    .then((message3) => {
        console.log(message3);
    })
    .catch((error) => {
        console.error(error); // reject(실패)한 경우 실행
    })
    .finally(() => {
        console.log("무조건");
    }); // 끝나고 무조건 실행
