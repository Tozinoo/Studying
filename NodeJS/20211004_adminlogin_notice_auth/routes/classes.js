const express = require("express");
const { Oclass } = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const oclass = await Oclass.create({
            userId: req.body.userid,
            classTitle: req.body.classtitle,
            classAddr: req.body.classaddr,
            classPrice: req.body.classprice,
            classQty: req.body.classqty,
            classContent: req.body.classcontent,
        });
        console.log(oclass);
        res.status(201).json(oclass);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router
    .route("/:id")
    .patch(async (req, res, next) => {
        try {
            const result = await Oclass.update(
                {
                    classContent: req.body.classcontent,
                },
                {
                    where: { userId: req.params.id },
                }
            );
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Oclass.destroy({
                where: {
                    classNum: req.params.id,
                },
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
