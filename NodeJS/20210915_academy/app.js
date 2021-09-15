const express = require("express");
const path = require("path");
const morgan = require("morgam");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: "session-cookie",
    })
);

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

app.use((req, res, next) => {
    console.log("모든 요청에 다 실행됩니다.");
    next();
});
app.get(
    "/",
    (req, res, next) => {
        console.log("GET / 요청시에만 실행됩니다.");
        next();
    },
    (req, res) => {
        throw new Error("에러는 에러 처리 미들웨어로 갑니다.");
    }
);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(8080, () => {
    console.log("대기");
});
