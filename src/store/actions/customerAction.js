import * as actions from './actionTypes';
import axios from '../../axios-api';

const fetchStart = () => {
    return {
        type: actions.FETCH_CUSTOMERS_START
    }
};

const fetchSuccess = customers => {
    return {
        type: actions.FETCH_CUSTOMERS_SUCCESS,
        customers: customers
    }
};

const fetchFail = error => {
    return {
        type: actions.FETCH_CUSTOMERS_FAIL,
        error: error
    }
};

export const fetchCustomers = () => {
    return dispatch => {
        dispatch(fetchStart());
        const token = "Bearer ".concat(localStorage.getItem("token"));
        axios.get("/customers", {
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
