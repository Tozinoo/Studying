import React from "react";
import NumberCounter from "./components/NumberCounter";
import Todo from "./components/TodoComponent";
import CounterContainer from "./containers/counterContainer";
import TodosContainers from "./containers/TodosContainers";

const App = () => {
    return (
        <div>
            <CounterContainer />
            <TodosContainers />
        </div>
    );
};

export default App;
