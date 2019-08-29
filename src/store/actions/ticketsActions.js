import * as actions from './actionTypes';
import axios from '../../axios-api';

const fetchStart = () => {
    return {
        type: actions.FETCH_TICKETS_START
    }
};

const fetchSuccess = tickets => {
    return {
        type: actions.FETCH_TICKETS_SUCCESS,
        tickets: tickets
    }
};

const fetchFail = error => {
    return {
        type: actions.FETCH_TICKETS_FAIL,
        error: error
    }
};

export const fetchTickets = () => {
    return dispatch => {
        dispatch(fetchStart());
        const token = "Bearer ".concat(localStorage.getItem("token"));
        axios.get('/tickets', {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(fetchSuccess(response.data))
            })
            .catch(err => {
                dispatch(fetchFail(err))
            })
    }
};
