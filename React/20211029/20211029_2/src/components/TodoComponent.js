import React from "react";

const TodoComponent = ({ todo, toggle, remove }) => {
    return (
        <div>
            <input type="checkbox" />
            <span>경일게임</span>
            <button>클릭</button>
        </div>
    );
};

const Todo = ({ input, todos, changeInput, insert, toggle, remove }) => {
    const submit = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <form onSubmit={submit}>
                <input />
                <button type="submit">제출</button>
            </form>
            <div>
                <TodoComponent />
                <TodoComponent />
                <TodoComponent />
                <TodoComponent />
            </div>
        </div>
    );
};

export default Todo;
