//mysql 모듈 추출
const mysql = require("mysql2");

/*
createConnection 옵션
host : 연결할 호스트를 나타냄
port : 연결할 포트
user : 사용자 이름 (필수)
password : 사용자 비밀번호 (필수)
database : 연결할 데이터베이스
debug : 디버그 모드를 사용할지?

*/

const client = mysql.createConnection({
    user: "root",
    password: "chlgustjr1",
    host: "localhost",
    database: "shopdb",
});

// query : mysql 쿼리 문장을 직접 입력할 수 있다.
// Node.js의 다른 메서드와 마찬가지로 이벤트 기반 비동기 처리 방식을 사용함.
client.query("SELECT * FROM membertbl", (error, result, fields) => {
    if (error) {
        console.log("에러");
    } else {
        console.log(result);
    }
});

// mysql모듈을 사용해서 데이터를 입력할 때 ?토큰을 사용할 수 있다.
// client.query("INSERT INTO membertbl (memberID,memberName,memberAddress) VALUES(?,?,?)",[''])
