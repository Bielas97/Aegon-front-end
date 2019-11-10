import * as actions from '../actions/actionTypes'
import {formatTimestamp, updateObject} from "../../shared/utils";

const initialState = {
    users: [],
    loading: false,
    error: null,
    message: null,
    timestamp: null,
    currentUserTicketsLeft: null
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

const getUserInfoSuccess = (state, action) => {
    // const user = {
    //     username: action.username,
    //     ticketsLeft: action.ticketsLeft
    // };
    return updateObject(state, {
        currentUserTicketsLeft: action.ticketsLeft,
        loading: false
    })
};

const deleteUserSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        timestamp: formatTimestamp(action.timestamp),
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
        loading: false,
        message: action.message,
        timestamp: formatTimestamp(action.timestamp)
    })
};

const changePasswordForUser = (state, action) => {
    return updateObject(state, {
        loading: false,
        message: action.message,
        timestamp: formatTimestamp(action.timestamp)
    })
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.USER_ACTION_START:
            return userActionStart(state, action);
        case actions.FETCH_USERS_SUCCESS:
            return fetchUsersSuccess(state, action);
        case actions.USER_ACTION_FAIL:
            return userActionFail(state, action);
        case actions.REGISTER_USER_SUCCESS:
            return registerUserSuccess(state, action);
        case actions.DELETE_USER_SUCCESS:
            return deleteUserSuccess(state, action);
        case actions.CHANGE_PASSWORD_FOR_USER:
            return changePasswordForUser(state, action);
        case actions.GET_USER_INFO:
            return getUserInfoSuccess(state, action);
        default:
            return state;
    }
};

export default usersReducer;
