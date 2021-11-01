import React, { useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import NumberCounter from "../components/NumberCounter";
import { decrease, increase } from "../modules/counter";

// const CounterContainer = ({ number, increase, decrease }) => {
//     return (
//         <NumberCounter
//             number={number}
//             increase={increase}
//             decrease={decrease}
//         />
//     );
// };
// 1.
// const mapStateToProps = (state) => ({
//     number: state.counter.number,
// });

// const mapDispatchToProps = (dispatch) => ({
//     increase: () => {
//         dispatch(increase());
//     },
//     decrease: () => {
//         dispatch(decrease());
//     },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트);
//export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

// export default counterContainer;

// 2. bindActionCreators
// export default connect(
//     // mapStateToProps
//     (state) => ({
//         number: state.counter.number,
//     }),
//     // mapDispatchToProps
//     (dispatch) => bindActionCreators({ increase, decrease }, dispatch)
// )(CounterContainer);

// 3. mapDispatchToProps -> 이 부분을 액션생성함수로 만들어진 객체의 형태로 넘김
// export default connect(
//     // mapStateToProps
//     (state) => ({
//         number: state.counter.number,
//     }),
//     // 객체의 형태로 넘겨주면 connect가 bindActionCreators의 역할을 수행
//     {
//         increase,
//         decrease,
//     }
// )(CounterContainer);

// useSelector
const CounterContainer = () => {
    const number = useSelector((state) => state.counter.number);
    const dispatch = useDispatch();

    // useCallback(
    //     () => {
    //         callback
    //     },
    //     [input],
    // )

    const Onincrease = useCallback(() => dispatch(increase()), [dispatch]);
    const Ondecrease = useCallback(() => dispatch(decrease()), [dispatch]);

    return (
        <NumberCounter
            number={number}
            // increase={() => dispatch(increase())}
            // decrease={() => dispatch(decrease())}
            increase={Onincrease}
            decrease={Ondecrease}
        />
    );
};

export default CounterContainer;
