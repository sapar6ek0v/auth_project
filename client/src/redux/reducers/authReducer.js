import Cookies from "js-cookie";
import {SIGN_IN, SIGN_OUT} from "../types/authTypes.js";


const initialState = {
    user : null,
    token : Cookies.get('token'),
    isAuth : null,
    isLoading : true
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SIGN_IN :
            return {
                ...state,
                user: action.user,
                token: action.token,
                isAuth: !!action.token,
                isLoading: false
            }
        case SIGN_OUT :
            return {
                ...state,
                user: null,
                token: null,
                isAuth: false
            }
        default: return state
    }
}


export default reducer