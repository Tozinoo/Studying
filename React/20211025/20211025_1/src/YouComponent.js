// import React, { useCallback, useState } from "react";

// const YouComponent = () => {
//     const [count, setCount] = useState(0);
//     const handleClick = () => {
//         console.log("클릭");
//     };

//     return (
//         <div>
//             <button onClick={() => setCount(count + 1)}>+</button>
//             <button onClick={() => handleClick}>click</button>
//         </div>
//     );
// };

// export default YouComponent;

////////////////////////////////////////////////////////////////////////////////////

import React, { useCallback, useMemo, useState } from "react";

const getCalculate = (num) => {
    console.log("계산중...");
    if (num.length === 0) return 0;
    const sum = num.reduce((a, b) => a + b);
    return sum / num.length;
};

const YouComponent = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState("");

    // const onInsert = (e) => {
    //     const nextList = list.concat(parseInt(number));
    //     setList(nextList);
    //     setNumber("");
    // };

    // useCallback
    const onChange = useCallback((e) => {
        setNumber(e.target.value);
    }, []);

    const onInsert = useCallback(() => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber("");
    }, [number, list]);

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
                {/* {getCalculate(list)} */}
                {cal}
            </div>
        </div>
    );
};

export default YouComponent;
