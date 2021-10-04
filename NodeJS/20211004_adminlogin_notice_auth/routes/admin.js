const express = require("express");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

// const a = () => {
//     const password = 1234;
//     const hash = bcrypt.hash(password, 12);
//     Admin.create({
//         adminId: "admin",
//         adminPwd: hash,
//         adminName: "비대면수업",
//         adminTel: "010-1234-4567",
//         adminMail: "gg@naver.com",
//     });
// };
// a;
router
    .get("/", isNotLoggedIn, async (req, res, next) => {
        const password = "a1234";
        try {
            const hash = await bcrypt.hash(password, 12);
            Admin.create({
                adminId: "admin",
                adminPwd: hash,
                adminName: "비대면수업",
                adminTel: "010-1234-4567",
                adminMail: "gg@naver.com",
            });
            res.render("adminLogin", { title: "관리자로그인" });
        } catch (error) {
            console.error(err);
            next(err);
        }
    })
    .post("/", isNotLoggedIn, async (req, res, next) => {
        try {
            // console.log(admin);
            res.status(201).json(admin);
        } catch (error) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
