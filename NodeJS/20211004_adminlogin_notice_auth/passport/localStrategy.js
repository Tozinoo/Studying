const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Admin = require("../models/admin");

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "adminid",
                passwordField: "adminpwd",
            },
            async (adminid, adminpwd, done) => {
                try {
                    const exUser = await Admin.findOne({ where: { adminid } });
                    if (exUser) {
                        const result = await bcrypt.compare(
                            adminpwd,
                            exUser.adminPwd
                        );
                        if (result) {
                            done(null, exUser);
                        } else {
                            done(null, false, {
                                message: "비밀번호가 일치하지 않습니다.",
                            });
                        }
                    } else {
                        done(null, false, {
                            message: "가입되지 않은 회원입니다.",
                        });
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
