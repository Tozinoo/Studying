import React from "react";
import "./ScssComponent.scss";

const StyleComponent = () => {
    return (
        <div>
            <div className="ScssComponent">
                <div className="box red" />
                <div className="box yellow" />
                <div className="box orange" />
                <div className="box green" />
                <div className="box black" />
            </div>
        </div>
    );
};

export default StyleComponent;
