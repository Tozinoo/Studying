import { connect } from "react-redux";
import Todo from "../components/TodoComponent";
import { changeInput, insert, remove, toggle } from "../modules/todos";

const TodosContainer = ({
    input,
    todos,
    changeInput,
    insert,
    remove,
    toggle,
}) => {
    return (
        <Todo
            input={input}
            todos={todos}
            changeInput={changeInput}
            insert={insert}
            toggle={toggle}
            remove={remove}
        />
    );
};

export default connect(
    ({ todos }) => ({
        input: todos.input,
        todos: todos.todos,
    }),
    {
        changeInput,
        insert,
        remove,
        toggle,
    }
)(TodosContainer);
