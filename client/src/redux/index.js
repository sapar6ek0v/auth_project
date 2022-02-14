import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import authReducer from "./reducers/authReducer.js";


const initialState = {}

const rootReducer = combineReducers({
    auth : authReducer
})

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))


export default store
