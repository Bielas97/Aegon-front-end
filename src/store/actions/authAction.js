import * as actions from './actionTypes';
import axios from '../../axios-api';

export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
};

export const authSuccess = token => {
    return {
        type: actions.AUTH_SUCCESS,
        token: token
    }
};

export const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    sessionStorage.removeItem('token');
    return {
        type: actions.AUTH_LOGOUT
    }
};

export const auth = (login, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            "username": login.join(""),
            "password": password.join("")
        };
        axios.post('/login', authData)
            .then(response => {
                sessionStorage.setItem("token", response.data.token);
                dispatch(authSuccess(response.data.token));
            })
            .catch(err => {
                dispatch(authFail(err.response))
            })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const jwtData = token.split('.')[1];
            const decodedJwtJsonData = window.atob(jwtData);
            const decodedJwtData = JSON.parse(decodedJwtJsonData);
            if (decodedJwtData.roles) {
                dispatch(authSuccess(token, decodedJwtData.roles))
            }
        } else {
            dispatch(logout())
        }
    }
};

export const setAuthRedirectPath = path => {
    return {
        type: actions.AUTH_SET_REDIRECT_PATH,
        path: path
    }
};
