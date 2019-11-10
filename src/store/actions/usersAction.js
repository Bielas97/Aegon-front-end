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
        type: actions.USER_ACTION_FAIL,
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

const deleteUserSuccess = action => {
    return {
        type: actions.DELETE_USER_SUCCESS,
        message: action.message,
        timestamp: action.timestamp
    }
};

const changePasswordForUserSuccess = action => {
    return {
        type: actions.CHANGE_PASSWORD_FOR_USER,
        message: action.message,
        timestamp: action.timestamp
    }
};

const getUserInfoSuccess = action => {
    return {
        type: actions.GET_USER_INFO,
        username: action.username,
        ticketsLeft: action.numberOfTickets
    }
};

export const fetchUsers = () => {
    return dispatch => {
        dispatch(userActionStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
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
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.delete(url, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                dispatch(deleteUserSuccess(response.data))
            })
            .catch(error => {
                dispatch(userActionFail(error.response));
            })
    }
};

export const registerUser = user => {
    return dispatch => {
        dispatch(userActionStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.post("/users", user, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                dispatch(registerUserSuccess(response.data))
            })
            .catch(error => {
                dispatch(userActionFail(error.response));
            })
    }
};

export const getUserInfo = () => {
    return dispatch => {
        dispatch(userActionStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.get("/users/info", {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                dispatch(getUserInfoSuccess(response.data))
            })
            .catch(error => {
                dispatch(userActionFail(error.response));
            })
    }
};

export const changePasswordForUser = userPasswordChangeDto => {
    return dispatch => {
        dispatch(userActionStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.post("/users/password", userPasswordChangeDto, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                dispatch(changePasswordForUserSuccess(response.data))
            })
            .catch(error => {
                dispatch(userActionFail(error.response))
            })
    }
};
