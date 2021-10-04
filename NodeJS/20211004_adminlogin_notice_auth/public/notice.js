getNotice();
// 사용자 로딩
async function getNotice() {
    try {
        const res = await axios.get("/notice");
        const notices = res.data;

        const tbody = document.querySelector("#notice-list tbody");
        tbody.innerHTML = "";
        users.map(function (notice) {
            // 로우 셀 추가
            let td = document.createElement("td");
            td.textContent = notice.noticeNum;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = notice.noticeTitle;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = notice.adminId;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = notice.noticeCreated;
            row.appendChild(td);

            td = document.createElement("td");
            td.textContent = "1";
            row.appendChild(td);

            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}
