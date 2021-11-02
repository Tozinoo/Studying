import React from "react";
import "./Change.css";

const Change = ({ color, onChange, onChangeAsync }) => {
    return (
        <div>
            <div className="box" style={{ backgroundColor: color }}></div>
            <button onClick={onChange}>변경</button>
            <button onClick={onChangeAsync}>느리게변경</button>
        </div>
    );
};

export default Change;
