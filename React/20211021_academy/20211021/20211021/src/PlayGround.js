import React, { useState } from "react";

/*
클래스형 -> this.state: 객체의 형태로...
함수형 -> useState 사용
- 배열로 리턴
매개변수는 자유롭다. 객체,number,string 

*/

const PlayGround = () => {
    // m : 현재 상태 값
    // setM : 상태를 바꿔주는 함수
    const [m, setM] = useState(0);

    const click1 = () => setM(m + 1);
    const click2 = () => setM(m - 1);

    const [c, setC] = useState("red");

    return (
        <div>
            <button onClick={click1}>+</button>
            <button onClick={click2}>-</button>
            <h1 style={{ color: `${c}` }}>{m}</h1>

            <button onClick={() => setC("yellow")}>yellow</button>
        </div>
    );
};

export default PlayGround;
