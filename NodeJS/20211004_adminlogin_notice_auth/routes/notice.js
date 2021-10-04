const express = require("express");
const Notice = require("../models/notice");
const Admin = require("../models/admin");
//여기부터
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
//여기까지

const router = express.Router();

router.use((req, res, next) => {
    res.locals.admin = req.user;
    next();
});

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const admins = await Admin.findAll({});
            const notices = await Notice.findAll({
                order: [["noticeNum", "desc"]],
            });
            res.render("notice", {
                notices,
                title: "공지사항",
            });
        } catch (error) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            console.log(1);
        } catch (error) {
            console.error(err);
            next(err);
        }
    });

router.get("/post", (req, res, next) => {
    try {
        res.render("noticePost");
    } catch (error) {}
});
router.post("/post", (req, res, next) => {
    let body = req.body;
    Notice.create({
        noticeTitle: body.title,
        noticeContent: body.contents,
        //adminId: req.login.adminid
    })
        .then((result) => {
            console.log("데이터추가 완료");
            res.redirect("/notice");
        })
        .catch((err) => {
            console.log("데이터추가 실패");
        });
});

router.get("/:id", async (req, res, next) => {
    try {
        const notice = await Notice.findAll({
            where: { noticeNum: req.params.id },
        });

        res.render("noticeDetail", { notice });
    } catch (error) {
        console.error(err);
        next(err);
    }
});

router
    .route("/:id/edit")
    .get(async (req, res, next) => {
        try {
            const notice = await Notice.findAll({
                where: { noticeNum: req.params.id },
            });

            res.render("noticeUpdate", { notice });
        } catch (error) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            let body = req.body;
            const notice = await Notice.update(
                {
                    noticeTitle: body.title,
                    noticeContent: body.content,
                },
                {
                    where: { noticeNum: req.params.id },
                }
            );
            res.redirect("/notice/" + req.params.id);
        } catch (error) {
            console.error(err);
            next(err);
        }
    });

router.get("/:id/delete", async (req, res, next) => {
    try {
        const notice = await Notice.destroy({
            where: { noticeNum: req.params.id },
        });

        res.redirect("/notice");
    } catch (error) {
        console.error(err);
        next(err);
    }
});
module.exports = router;
