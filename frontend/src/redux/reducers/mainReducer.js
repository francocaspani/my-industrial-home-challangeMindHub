import { combineReducers } from "redux";
import ambientsReducer from "./ambientReducers";
import productsReducer from "./productReducers";
import usersReducer from "./userReducers";
import basketReducer from "./basketReducer";

const mainReducer = combineReducers({
    ambientsReducer,
    productsReducer,
    usersReducer,
    basketReducer
})

export default mainReducer