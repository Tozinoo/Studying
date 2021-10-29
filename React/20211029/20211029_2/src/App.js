import "./App.css";
import NumberCounter from "./components/NumberCounter";
import Todo from "./components/TodoComponent";

function App() {
    return (
        <div>
            <NumberCounter number={0} />
            <Todo />
        </div>
    );
}

export default App;
