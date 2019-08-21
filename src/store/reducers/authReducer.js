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

const authStart = (state, action) => {
    return updateObject(state,{
        error: null,
        loading: true
    })
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        admin: action.role === 'ROLE_ADMIN',
        loading: false
    })
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const authLogout = (state, action) => {
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
            return authStart(state, action);
        case actions.AUTH_SET_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        case actions.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
};

export default authReducer;
