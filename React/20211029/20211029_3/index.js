import { createStore } from "redux";

const divcount = document.querySelector("h2");
const buttonIncrease = document.querySelector("#increase");
const buttonDecrease = document.querySelector("#decrease");
const divToggle = document.querySelector(".toggle");

// 액션 이름
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 생성 함수
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (dif) => ({ type: INCREASE, dif });
const decrease = () => ({ type: DECREASE });

// 초기값
const initialState = {
    toggle: false,
    count: 0,
};

// 리듀서 함수
function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state,
                toggle: !state.toggle,
            };
        case INCREASE:
            return {
                ...state,
                count: state.count + action.dif,
            };
        case DECREASE:
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

const render = () => {
    const state = store.getState();

    if (state.toggle) divToggle.classList.add("active");
    else divToggle.classList.remove("active");
    console.log(state.toggle);

    divcount.innerText = state.count;
};

render();

store.subscribe(render);

buttonIncrease.onclick = () => {
    store.dispatch(increase(1));
};
buttonDecrease.onclick = () => {
    store.dispatch(decrease());
};
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};
