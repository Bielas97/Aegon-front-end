import * as actions from '../actions/actionTypes'
import {formatTimestamp, updateObject} from "../../shared/utils";

const initialState = {
    customers: [],
    loading: false,
    error: null,
    message: '',
    timestamp: ''
};

const customersActionStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
};

const fetchCustomersSuccess = (state, action) => {
    return updateObject(state, {
        customers: action.customers,
        loading: false
    })
};

const customersActionFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const addCustomerSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        message: action.message,
        timestamp: formatTimestamp(action.timestamp)
    })
};

const updateCustomerSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        message: action.message,
        timestamp: formatTimestamp(action.timestamp)
    })
};

const deleteCustomerSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        message: action.message,
        timestamp: formatTimestamp(action.timestamp)
    })
};

const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CUSTOMER_ACTION_START:
            return customersActionStart(state, action);
        case actions.FETCH_CUSTOMERS_SUCCESS:
            return fetchCustomersSuccess(state, action);
        case actions.CUSTOMER_ACTION_FAIL:
            return customersActionFail(state, action);
        case actions.ADD_CUSTOMER_SUCCESS:
            return addCustomerSuccess(state, action);
        case actions.UPDATE_CUSTOMER_SUCCESS:
            return updateCustomerSuccess(state, action);
        case actions.DELETE_CUSTOMER_SUCCESS:
            return deleteCustomerSuccess(state, action);
        default:
            return state
    }
};

export default customersReducer;
