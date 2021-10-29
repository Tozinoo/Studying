import colorContext from "../context/color";
import React, { useContext } from "react";

const ColorBox = () => {
    const { color } = useContext(colorContext);

    return (
        // <colorContext.Consumer>
        //     {(value) => (
        //         <div
        //             style={{
        //                 width: "100px",
        //                 height: "100px",
        //                 background: value.color,
        //             }}
        //         />
        //     )}
        // </colorContext.Consumer>
        <div>
            <div
                style={{
                    width: "100px",
                    height: "100px",
                    background: color,
                }}
            />
        </div>
    );
};

export default ColorBox;
