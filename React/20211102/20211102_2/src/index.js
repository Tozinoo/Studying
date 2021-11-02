import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules";
import ChangeContainer from "./containers/ChangeContainer";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const logger = createLogger();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <ChangeContainer />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
