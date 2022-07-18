import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { VacationFollowersReducer } from "./VacationFollowersState";
import { VacationReducer } from "./VacationsState";

const reducers = combineReducers({
    authState: authReducer,
    VacationsFollowersState: VacationFollowersReducer,
    VacationsState: VacationReducer
});

const store = createStore(reducers);

export default store;