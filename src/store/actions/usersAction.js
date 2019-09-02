import * as actions from './actionTypes';
import axios from '../../axios-api';

const userActionStart = () => {
    return {
        type: actions.USER_ACTION_START
    }
};

const fetchSuccess = users => {
    return {
        type: actions.FETCH_USERS_SUCCESS,
        users: users
    }
};

const userActionFail = error => {
    return {
        type: actions.USER_ACTOIN_FAIL,
        error: error
    }
};

const registerUserSuccess = (action) => {
    return {
        type: actions.REGISTER_USER_SUCCESS,
        message: action.message,
        timestamp: action.timestamp
    }
};

export const fetchUsers = () => {
    return dispatch => {
        dispatch(userActionStart());
        const token = "Bearer ".concat(localStorage.getItem("token"));
        axios.get("/users", {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                dispatch(fetchSuccess(response.data))
            })
            .catch(error => {
                dispatch(userActionFail(error));
            })
    }
};


export const deleteUserById = id => {
    return dispatch => {
        dispatch(userActionStart());
        const url = '/users/'.concat(id);
        const token = "Bearer ".concat(localStorage.getItem("token"));
        axios.delete(url, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(fetchSuccess(response.data))
            })
            .catch(error => {
                dispatch(userActionFail(error));
            })
    }
};

export const registerUser = user => {
    return dispatch => {
        dispatch(userActionStart());
        const token = "Bearer ".concat(localStorage.getItem("token"));
        axios.post("/users", user, {
            headers: {
                "Authorization": token,
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => {
                dispatch(registerUserSuccess(response.data))
            })
            .catch(error => {
                console.log('eeeeeeeeeeeeeror:', error.response)
                dispatch(userActionFail(error));
            })
    }
};
