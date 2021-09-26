const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql2");
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const client = mysql.createConnection({
    user: "root",
    password: "chlgustjr1",
    host: "localhost",
    database: "shopdb",
    dateStrings: "date",
});

const app = express();
app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    fs.readFile("list.html", "utf-8", (error, data) => {
        client.query("SELECT * FROM producttbl", (error, results) => {
            res.send(ejs.render(data, { data: results }));
        });
    });
});
app.get("/delete/:id", (req, res) => {
    client.query(
        "DELETE FROM producttbl WHERE productName=?",
        [req.params.id],
        () => {
            res.redirect("/");
        }
    );
});
app.get("/insert", (req, res) => {
    fs.readFile("insert.html", "utf-8", (error, data) => {
        res.send(data);
    });
});
app.post("/insert", (req, res) => {
    let body = req.body;
    client.query(
        "INSERT INTO producttbl (productName,cost,makeDate,company,amount)VALUES(?,?,now(),?,?)",
        [body.productName, body.cost, body.company, body.amount],
        () => {
            res.redirect("/");
        }
    );
});
app.get("/edit/:id", (req, res) => {
    fs.readFile("edit.html", "utf-8", (error, data) => {
        client.query(
            "SELECT * FROM producttbl WHERE productName =?",
            [req.params.id],
            (error, results) => {
                res.send(ejs.render(data, { data: results[0] }));
            }
        );
    });
});
app.post("/edit/:id", (req, res) => {
    let body = req.body;
    client.query(
        "UPDATE producttbl SET cost=?, amount=? WHERE productName=?",
        [body.cost, body.amount, req.params.id],
        () => {
            res.redirect("/");
        }
    );
});

// app.get("/edit/:id/plus", (req, res) => {
//     req.data2 = req.data1;
//     client.query(
//         "UPDATE producttbl SET amount=amount+1 WHERE productName=?",

//         [req.data2],
//         () => {
//             res.redirect("/edit/:id");
//         }
//     );
// });

app.listen(3000, () => {
    console.log("3000포트 사용중");
});
