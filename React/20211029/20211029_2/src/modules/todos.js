// 액션 타입

const CHANGE_INPUT = "todos/CHANGE_INPUT";
const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

let num = 3;

export const changeInput = (input) => ({
    type: CHANGE_INPUT,
    input,
});
export const insert = (text) => ({
    type: INSERT,

    todo: {
        num: num++,
        text,
        done: false,
    },
});
export const toggle = (num) => ({
    type: TOGGLE,
    num,
});
export const remove = (num) => ({
    type: REMOVE,
    num,
});

const initialState = {
    input: "",
    todos: [
        {
            num: 1,
            text: "a",
            done: true,
        },
        {
            num: 2,
            text: "b",
            done: false,
        },
    ],
};

function todos(state = initialState, action) {
    switch (action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                input: action.input,
            };
        case INSERT:
            return {
                ...state,
                todos: state.todos.concat(action.todo),
            };
        case TOGGLE:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.num === action.num
                        ? { ...todo, done: !todo.done }
                        : todo
                ),
            };
        case REMOVE:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.num !== action.num),
            };

        default:
            return state;
    }
}

export default todos;
