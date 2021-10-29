import React from "react";
import { connect } from "react-redux";
import NumberCounter from "../components/NumberCounter";

const counterContainer = ({ number, increase, decrease }) => {
    return (
        <NumberCounter
            number={number}
            increase={increase}
            decrease={decrease}
        />
    );
};

const mapStateToProps = (state) => ({
    number: state.counter.number,
});

const mapDispatchToProps = (dispatch) => ({
    increase: () => {
        console.log(111);
    },
    decrease: () => {
        console.log(222);
    },
});

// export default connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트);
export default connect(mapStateToProps, mapDispatchToProps)(counterContainer);

// export default counterContainer;
