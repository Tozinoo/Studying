import React from "react";

const NumberCounter = ({ number, increase, decrease }) => {
    return (
        <div>
            <h3>{number}</h3>
            <div>
                <button onClick={increase}>더</button>
                <button onClick={decrease}>빼</button>
            </div>
        </div>
    );
};

export default NumberCounter;
