const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const Admin = require("../models/admin");

module.exports = () => {
    passport.serializeUser((admin, done) => {
        done(null, admin.adminId);
    });

    passport.deserializeUser((adminId, done) => {
        Admin.findOne({ where: { adminId } })
            .then((admin) => done(null, admin))
            .catch((err) => done(err));
    });

    local();
    kakao();
};
