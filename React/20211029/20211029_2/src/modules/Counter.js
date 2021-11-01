import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = {
    number: 0,
};

// handleActions를 이용한 리듀서 함수
const counter = handleActions(
    // 액션에 대한 업데이트 함수
    {
        [INCREASE]: (state, action) => ({ number: state.number + 1 }),
        [DECREASE]: (state, action) => ({ number: state.number - 1 }),
    },
    initialState
);

// function counter(state = initialState, action) {
//     switch (action.type) {
//         case INCREASE:
//             return { number: state.number + 1 };
//         case DECREASE:
//             return { number: state.number - 1 };
//         default:
//             return state;
//     }
// }

export default counter;
