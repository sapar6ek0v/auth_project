import Cookies from 'js-cookie'
import {SIGN_IN, SIGN_OUT} from "../types/authTypes.js";


export const signIn = (data) => {
    return {
        type: SIGN_IN,
        user: data.user,
        token: data.token,
    }
}

export const signOut = () => {
    Cookies.remove('token', {path: ''})
    return { type : SIGN_OUT }
}