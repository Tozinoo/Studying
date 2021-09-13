//process.setMaxListeners(15);

// process.on("exit", () => {});
// process.on("exit", () => {});
// process.on("exit", () => {});
// process.on("exit", () => {});
// process.on("exit", () => {});
// process.on("exit", () => {});
// process.on("exit", () => {});
// process.on("exit", () => {});
// process.on("exit", () => {});
// process.on("exit", () => {});
// process.on("exit", () => {});

// process.on("uncaughtExeption", (error) => {
//     console.log("예외가 발생했따~!");
// });

// on
// emit

//이벤트 연결
// process.on("exit", () => {
//     console.log("안녕히 게세요~");
// });

//프로그램 종료
//process.exit();

//이벤트를 강제로 발생
// process.emit("exit");
// process.emit("exit");
// process.emit("exit");
// process.emit("exit");

// console.log("프로그램 실행중");
const EventEmitter = require("events");

const e = new EventEmitter();

e.addListener("event1", () => {
    console.log("1");
});

//on(이벤트,콜백)
e.on("event2", () => {
    console.log("2");
});

e.on("event2", () => {
    console.log("2ㅁㄴㅇㄻㄴㅇㄹ");
});
e.once("event3", () => {
    console.log("2");
});

e.emit("event1");
e.emit("event2");
e.emit("event3");
e.emit("event3");
