import * as actions from '../actions/actionTypes';
import {updateObject} from "../../shared/utils";

const initialState = {
    user: null,
    token: null,
    admin: null,
    error: null,
    loading: false,
    authRedirectPath: null
};

const authStart = (state) => {
    return updateObject(state,{
        error: null,
        loading: true
    })
};

const authSuccess = (state, action) => {
    const token = action.token;
    const jwtData = token.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    const isAdmin = decodedJwtData.roles === "ROLE_ADMIN";
    return updateObject(state, {
        token: token,
        admin: isAdmin,
        loading: false
    })
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        loading: false
    })
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actions.AUTH_FAIL:
            return authFail(state, action);
        case actions.AUTH_START:
            return authStart(state);
        case actions.AUTH_SET_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        case actions.AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
};

export default authReducer;
