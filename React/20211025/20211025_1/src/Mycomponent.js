import React, { useMemo, useState } from "react";

const getCalculate = (num) => {
    console.log("계산중...");
    if (num.length === 0) return 0;
    const sum = num.reduce((a, b) => a + b);
    return sum / num.length;
};

const Mycomponent = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState("");

    const onChange = (e) => {
        setNumber(e.target.value);
    };
    const onInsert = (e) => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber("");
    };

    const cal = useMemo(() => getCalculate(list), [list]);

    return (
        <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}>클릭</button>
            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <h3>계산</h3>
                {getCalculate(list)}
                {/* {cal} */}
            </div>
        </div>
    );
};

export default Mycomponent;
