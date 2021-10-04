const express = require("express");
const User = require("../models/user");
const Oclass = require("../models/oclass");

const router = express.Router();

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const user = await User.create({
                userId: req.body.userid,
                userName: req.body.username,
                userTel: req.body.usertel,
                userMail: req.body.usermail,
            });
            console.log(user);
            res.status(201).json(user);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.get("/:id/classes", async (req, res, next) => {
    try {
        console.log(2);
        const classes = await Oclass.findAll({
            include: {
                model: User,
                where: { userId: req.params.id },
            },
        });
        console.log(classes);
        res.json(classes);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
