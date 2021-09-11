function findAndSaveUser(Users) {
    Users.findOne({}, (err, user) => {
        //첫 번째 콜백
        if (err) {
            return console.error(err);
        }
        user.name = "zero";
        user.save((err) => {
            // 두 번째 콜백
            if (err) {
                return console.error(err);
            }
            Users.findOne({ gender: "m" }, (err, user) => {
                //세 번째 콜백
                //생략
            });
        });
    });
}

// findOne과 save 메서드가 내부적으로 프로미스 객체를 가지고 있다고 가정해야함.
function findAndSaveUser2(Users2) {
    Users2.findOne({})
        .then((user) => {
            user.name = "zero";
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: "m" });
        })
        .then((user) => {})
        .catch((err) => {
            console.error(err);
        });
}
