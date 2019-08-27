import * as actions from '../actions/actionTypes'
import {updateObject} from "../../shared/utils";

const initialState = {
    customers: [],
    loading: false,
    error: null
};

const fetchCustomersStart = (state, action) => {
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

const fetchCustomersFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_CUSTOMERS_START:
            return fetchCustomersStart(state, action);
        case actions.FETCH_CUSTOMERS_SUCCESS:
            return fetchCustomersSuccess(state, action);
        case actions.FETCH_CUSTOMERS_FAIL:
            return fetchCustomersFail(state, action);
        default:
            return state
    }
};

export default customersReducer;
