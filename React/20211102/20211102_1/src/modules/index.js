import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";

const rootReducer = combineReducers({
    counter,
});

export function* rootSaga() {
    yield all([counterSaga()]);
}
export default rootReducer;
