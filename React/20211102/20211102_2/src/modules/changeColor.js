import { handleActions, createAction } from "redux-actions";
import { getRandomColor } from "../utils";

const COLOR = "color/COLOR";

export const ccolor = createAction(COLOR);
export const colorAsync = () => (dispatch) => {
    setTimeout(() => {
        dispatch(ccolor());
    }, 1000);
};

const initialState = {
    color: "black",
};

const changeColor = handleActions(
    {
        [COLOR]: (state) => {
            const reColor = getRandomColor();
            return {
                ...state,
                color: reColor,
            };
        },
    },
    initialState
);

export default changeColor;
