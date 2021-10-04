const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");

dotenv.config();
//여기부터
//const PageRouter = require("./routes/page");
const passportConfig = require("./passport");
const authRouter = require("./routes/auth");
//여기까지
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const classesRouter = require("./routes/classes");

const app = express();
//여기부터
passportConfig();
//여기까지
app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
});
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//여기부터
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
//app.use("/admin1", pageRouter);
app.use("/auth", authRouter);
//여기까지

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/classes", classesRouter);

const adminsRouter = require("./routes/admin");
app.use("/admin", adminsRouter);

const noticeRouter = require("./routes/notice");
app.use("/notice", noticeRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
