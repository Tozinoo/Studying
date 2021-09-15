const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const dotenv = require("dotenv");

// dotenv.config();
const app = express();

// app.use((req, res, next) => {
//     console.log("첫번째 미들웨어");
//     next();
// });
// app.use((req, res, next) => {
//     console.log("두번째 미들웨어");
//     next();
// });
// app.use((req, res, next) => {
//     console.log("세번째 미들웨어");
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//     res.end("<h1>express!!!</h1>");
//     next();
// });

// morgan 미들웨어 설정
// app.use(morgan(''));
app.use(morgan("common"));
//app.use(morgan(":method + :date"));
app.use((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>express!!!</h1>");
});

// cookie-parser 미들웨어 설정
app.use(cookieParser(""));
// 라우터
app.get("/getCookie", (req, res) => {
    //응답
    res.send(req.cookies);
});

app.get("/setCookie", (req, res) => {
    res.cookie("string", "cookie");
    res.cookie("json", {
        name: "cookie",
        property: "delicious",
    });
    res.redirect("/getCookie");
});

app.listen(8080, () => {
    console.log("대기");
});

/*

router : 페이지 라우트 수행
static : 특정 폴더를 서버의 루트 폴더에 올림
morgan : 로그 정보 출력
cookie-parser : 요청 쿠키를 추출, req, res 객체에 cookies 속성, cookie()메소드 부여
body-parser : body 분해
express-session : 세션 처리 수행

*/

// app.use(morgan("dev"));
// app.use("/", express.static(path.join(__dirname, "public")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(
//     session({
//         resave: false,
//         saveUninitialized: false,
//         secret: process.env.COOKIE_SECRET,
//         cookie: {
//             httpOnly: true,
//             secure: false,
//         },
//         name: "session-cookie",
//     })
// );

// app.get("/", (req, res) => {
//     fs.readFile(async);
// });

// app.use(express.static(__dirname + "/public"));

// app.use((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html, charset=utf-8" });
//     res.write("<img src=img.png width=20%><img src=img.png width=20%>");
//     res.end("<img src=img.png width=20%>");
// });

// app.get("/", (req, res) => {
//     app.use(express.static("public"));

//     res.sendFile(path.join(__dirname, "/index.html"));
// });

// app.use((req, res, next) => {
//     console.log("모든 요청에 다 실행됩니다.");
//     next();
// });
// app.get(
//     "/",
//     (req, res, next) => {
//         console.log("GET / 요청시에만 실행됩니다.");
//         next();
//     },
//     (req, res) => {
//         throw new Error("에러는 에러 처리 미들웨어로 갑니다.");
//     }
// );

// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).send(err.message);
// });
