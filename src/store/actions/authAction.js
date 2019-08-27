import * as actions from './actionTypes';
import axios from '../../axios-api';

export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
};

export const authSuccess = (token, role) => {
    return {
        type: actions.AUTH_SUCCESS,
        token: token,
        role: role
    }
};

export const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    }
};

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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
                console.log(response);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                dispatch(authSuccess(response.data.token, response.data.role));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if(token && role){
            dispatch(authSuccess(token, role))
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
