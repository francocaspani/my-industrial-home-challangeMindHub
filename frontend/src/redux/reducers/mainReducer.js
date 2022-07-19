import { combineReducers } from "redux";
import ambientsReducer from "./ambientReducers";
import productsReducer from "./productReducers";
import usersReducer from "./userReducers";

const mainReducer = combineReducers({
    ambientsReducer,
    productsReducer,
    usersReducer
})

export default mainReducer