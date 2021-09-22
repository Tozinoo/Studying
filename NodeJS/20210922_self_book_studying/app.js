const express = require("express");
const morgan = require("morgan");
const path = require("path");
const ejs = require("ejs");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.set("port", process.env.PORT || 8080);
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "chlgustjr1",
    database: "moviedb",
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected");
});

app.get("/", (req, res, next) => {
    const sql = "select * from movietbl";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render("index", { movietbl: result });
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
