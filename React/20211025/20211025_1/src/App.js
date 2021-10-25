import React from "react";
//import Login from "./login/Login";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import SignIn from "./SignIn/SignIn";
import Chart from "./chart/Chart";
import Dashboard from "./chart/Dashboard";
import TryButton from "./button/TryButton";

// import StyleComponent from "./StyleComponent";
//import Mycomponent from "./Mycomponent";
//import YouComponent from "./YouComponent";

const App = () => {
    return (
        <div>
            {/* <Dashboard></Dashboard> */}
            <Button variant="contained">Hello World</Button>
            <TryButton></TryButton>
        </div>
    );
};

export default App;
