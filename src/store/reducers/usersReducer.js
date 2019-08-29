import * as actions from '../actions/actionTypes'
import {updateObject} from "../../shared/utils";

const initialState = {
    users: [],
    loading: false,
    error: null
};

const fetchUsersStart = (state, action) => {
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

const fetchUsersFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_USERS_START:
            return fetchUsersStart(state, action);
        case actions.FETCH_USERS_SUCCESS:
            return fetchUsersSuccess(state, action);
        case actions.FETCH_CUSTOMERS_FAIL:
            return fetchUsersFail(state, action);
        default:
            return state;
    }
};

export default usersReducer;
