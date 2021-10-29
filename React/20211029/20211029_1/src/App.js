import "./App.css";
import ColorBox from "./components/ColorBox";
import colorContext from "./context/color";

function App() {
    return (
        <colorContext.Provider value={{ color: "black" }}>
            <ColorBox />
        </colorContext.Provider>
    );
}

export default App;
