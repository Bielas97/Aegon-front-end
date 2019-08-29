import * as actions from './actionTypes';
import axios from '../../axios-api';

const fetchStart = () => {
    return {
        type: actions.FETCH_USERS_START
    }
};

const fetchSuccess = users => {
    return {
        type: actions.FETCH_USERS_SUCCESS,
        users: users
    }
};

const fetchFail = error => {
    return {
        type: actions.FETCH_USERS_FAILED,
        error: error
    }
};

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchStart());
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
                dispatch(fetchFail(error));
            })
    }
};


export const deleteUserById = id => {
    return dispatch => {
        dispatch(fetchStart());
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
                dispatch(fetchFail(error));
            })
    }
};

export const registerUser = user => {
    return dispatch => {
        dispatch(fetchStart());
        const token = "Bearer ".concat(localStorage.getItem("token"));
        axios.post("/users", user, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                dispatch(fetchSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchFail(error));
            })
    }
};
