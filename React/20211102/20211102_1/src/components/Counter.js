import React from "react";

const Counter = ({ onIncrease, onDecrease, number }) => {
    console.log(number);
    return (
        <div>
            <h2>{number}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
        </div>
    );
};

export default Counter;
