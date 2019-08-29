import * as actions from '../actions/actionTypes'
import {updateObject} from "../../shared/utils";

const initialState = {
    users: [],
    loading: false,
    error: null
};

const userActionStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
};

const fetchUsersSuccess = (state, action) => {
    return updateObject(state, {
        users: action.users,
        loading: false
    })
};

const userActionFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const registerUserSuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    })
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.USER_ACTION_START:
            return userActionStart(state, action);
        case actions.FETCH_USERS_SUCCESS:
            return fetchUsersSuccess(state, action);
        case actions.FETCH_CUSTOMERS_FAIL:
            return userActionFail(state, action);
        case actions.REGISTER_USER_SUCCESS:
            return registerUserSuccess(state, action);
        default:
            return state;
    }
};

export default usersReducer;
