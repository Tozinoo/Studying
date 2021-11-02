import React from "react";
import { connect } from "react-redux";
import Change from "../components/Change";
import { ccolor, colorAsync } from "../modules/changeColor";
import { getRandomColor } from "../utils";

const ChangeContainer = ({ color, ccolor, colorAsync }) => {
    console.log(color);
    return (
        <Change color={color} onChange={ccolor} onChangeAsync={colorAsync} />
    );
};

export default connect(
    (state) => ({
        color: state.changeColor.color,
    }),
    { ccolor, colorAsync }
)(ChangeContainer);
