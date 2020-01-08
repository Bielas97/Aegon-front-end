import * as actions from './actionTypes';
import axios from '../../axios-api';

const customerActionStart = () => {
    return {
        type: actions.CUSTOMER_ACTION_START
    }
};

const fetchSuccess = customers => {
    return {
        type: actions.FETCH_CUSTOMERS_SUCCESS,
        customers: customers
    }
};

const customerActionFail = error => {
    return {
        type: actions.CUSTOMER_ACTION_FAIL,
        error: error
    }
};

const addCustomerSuccess = action => {
    return {
        type: actions.ADD_CUSTOMER_SUCCESS,
        message: action.message,
        timestamp: action.timestamp
    }
};

const updateCustomerSuccess = action => {
    return {
        type: actions.UPDATE_CUSTOMER_SUCCESS,
        message: action.message,
        timestamp: action.timestamp
    }
};

const deleteCustomerSuccess = action => {
    return {
        type: actions.DELETE_CUSTOMER_SUCCESS,
        message: action.message,
        timestamp: action.timestamp
    }
};

export const fetchCustomers = () => {
    return dispatch => {
        dispatch(customerActionStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.get("/customers", {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(fetchSuccess(response.data))
            })
            .catch(error => {
                console.log(error);
                dispatch(customerActionFail(error.response));
            })
    }
};

export const addCustomer = customer => {
    return dispatch => {
        dispatch(customerActionStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.post("/customers", customer, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                dispatch(addCustomerSuccess(response.data))
            })
            .catch(error => {
                dispatch(customerActionFail(error.response))
            })
    }
};

export const updateCustomer = customer => {
    return dispatch => {
        dispatch(customerActionStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.put("/customers", customer, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                dispatch(updateCustomerSuccess(response.data))
            })
            .catch(error => {
                dispatch(customerActionFail(error.response))
            })
    }
};

export const deleteCustomer = id => {
    return dispatch => {
        dispatch(customerActionStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        const url = "/customers/".concat(id);
        axios.delete(url, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                dispatch(deleteCustomerSuccess(response.data))
            })
            .catch(error => {
                dispatch(customerActionFail(error.response))
            })
    }
};
