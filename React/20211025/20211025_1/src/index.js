import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import * as React from "react";
// import ReactDOM from "react-dom";
// import Button from "@mui/material/Button";

// function App() {
//     return (
//         <div>
//             <ListItemButton component="a" href="#simple-list">
//                 <ListItemText primary="Spam" />
//             </ListItemButton>
//             <Button variant="contained">Hello World</Button>
//         </div>
//     );
// }

// ReactDOM.render(<App />, document.querySelector("#app"));
