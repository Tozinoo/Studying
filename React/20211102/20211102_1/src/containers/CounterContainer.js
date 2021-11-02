import React from "react";
import { connect } from "react-redux";
import Counter from "../components/Counter";
import {
    decrease,
    decreaseAsync,
    increase,
    increaseAsync,
} from "../modules/counter";

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
    console.log(number);
    return (
        <Counter
            number={number}
            onIncrease={increaseAsync}
            onDecrease={decreaseAsync}
        />
    );
};

export default connect(
    (state) => ({
        number: state.counter,
    }),
    {
        increaseAsync,
        decreaseAsync,
    }
)(CounterContainer);
