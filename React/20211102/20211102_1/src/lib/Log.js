const Log = (store) => (next) => (action) => {
    console.group(action && action.type);
    console.log("prev State", store.getState());
    console.log("action", action);
    next(action);
    console.log("next State", store.getState());
    console.groupEnd();
};

export default Log;
