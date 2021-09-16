const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "styles")));

// 라우터 설정
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/login", (req, res) => {
    fs.readFile("login.html", (error, data) => {
        res.send(data.toString());
    });
});
app.post("/login", (req, res) => {
    // 쿠키 생성
    let login = req.body.login;
    let password = req.body.password;

    console.log(login, password);
    console.log(req.body);

    if ((login == "rint") & (password == "1234")) {
        res.cookie("auth", true);
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
});
app.listen(port, () => console.log(port, `대기중`));

/*
메인 페이지가 있고 -> 버튼 클릭 -> 로그인 페이지 이동. 로그인 하면 콘솔 창이 메인페이지로 이동하든..
로그인 페이지 만들어 보기
*/
