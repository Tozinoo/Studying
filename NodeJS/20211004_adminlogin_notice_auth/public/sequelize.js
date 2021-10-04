// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll("#user-list tr").forEach((el) => {
    el.addEventListener("click", function () {
        const id = el.querySelector("td").textContent;
        getClass(id);
    });
});
getUser();
// 사용자 로딩
async function getUser() {
    try {
        const res = await axios.get("/users");
        const users = res.data;

        const tbody = document.querySelector("#user-list tbody");
        tbody.innerHTML = "";
        users.map(function (user) {
            const row = document.createElement("tr");
            row.addEventListener("click", () => {
                getClass(user.userId);
            });
            // 로우 셀 추가
            let td = document.createElement("td");
            td.textContent = user.userId;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = user.userName;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = user.userTel;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = user.userMail;
            row.appendChild(td);

            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}
// 댓글 로딩

async function getClass(id) {
    try {
        const res = await axios.get(`/users/${id}/classes`);
        console.log(1);
        const classes = res.data;
        const tbody = document.querySelector("#classes-list tbody");
        tbody.innerHTML = "";

        classes.map(function (oclass) {
            // 로우 셀 추가
            const row = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = oclass.userId;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = oclass.classTitle;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = oclass.classAddr;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = oclass.classPrice;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = oclass.classQty;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = oclass.classContent;
            row.appendChild(td);

            const edit = document.createElement("button");
            edit.textContent = "수정";
            edit.addEventListener("click", async () => {
                // 수정 클릭 시
                const newoclass = prompt("바꿀 내용을 입력하세요");
                if (!newoclass) {
                    return alert("내용을 반드시 입력하셔야 합니다");
                }
                try {
                    // id
                    await axios.patch(`/classes/${oclass.userId}`, {
                        classcontent: newoclass,
                    });
                    getClass(id);
                } catch (err) {
                    console.error(err);
                }
            });
            const remove = document.createElement("button");
            remove.textContent = "삭제";
            remove.addEventListener("click", async () => {
                // 삭제 클릭 시
                try {
                    await axios.delete(`/classes/${oclass.classNum}`);
                    getClass(id);
                } catch (err) {
                    console.error(err);
                }
            });

            td = document.createElement("td");
            td.appendChild(edit);
            row.appendChild(td);
            td = document.createElement("td");
            td.appendChild(remove);
            row.appendChild(td);
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}
// 사용자 등록 시
document.getElementById("user-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const userid = e.target.userId.value;
    const username = e.target.userName.value;
    const usertel = e.target.userTel.value;
    const usermail = e.target.userMail.value;
    if (!userid) {
        return alert("아이디를 입력하세요");
    }
    if (!username) {
        return alert("이름을 입력하세요");
    }
    if (!usertel) {
        return alert("전화번호를 입력하세요");
    }
    if (!usermail) {
        return alert("메일을 입력하세요");
    }
    try {
        await axios.post("/users", { userid, username, usertel, usermail });
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.userId.value = "";
    e.target.userName.value = "";
    e.target.userTel.value = "";
    e.target.userMail.value = "";
});

// 클래스 등록 시
document.getElementById("class-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const userid = e.target.userId.value;
    const classtitle = e.target.classTitle.value;
    const classaddr = e.target.classAddr.value;
    const classprice = e.target.classPrice.value;
    const classqty = e.target.classQty.value;
    const classcontent = e.target.classContent.value;

    if (!userid) {
        return alert("아이디를 입력하세요");
    }
    if (!classtitle) {
        return alert("제목을 입력하세요");
    }
    if (!classaddr) {
        return alert("주소를 입력하세요");
    }
    if (!classprice) {
        return alert("가격을 입력하세요");
    }
    if (!classqty) {
        return alert("최대인원을 입력하세요");
    }
    if (!classcontent) {
        return alert("설명을 입력하세요");
    }
    try {
        console.log(10);
        await axios.post("/classes", {
            userid,
            classtitle,
            classaddr,
            classprice,
            classqty,
            classcontent,
        });
        getClass(userid);
    } catch (err) {
        console.error(err);
    }
    e.target.userId.value = "";
    e.target.classTitle.value = "";
    e.target.classAddr.value = "";
    e.target.classPrice.value = "";
    e.target.classQty.value = "";
    e.target.classContent.value = "";
});
