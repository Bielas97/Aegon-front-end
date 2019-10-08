import * as actions from '../actions/actionTypes'
import {updateObject} from "../../shared/utils";

const initialState = {
    allTablesForUser: [],
    freeTablesForUser: [],
    tablesWithoutTicket: [],
    freePlaces: null,
    loading: false,
    error: null
};

const fetchStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
};

const fetchAllTablesSuccess = (state, action) => {
    return updateObject(state, {
        allTablesForUser: action.allTablesForUser,
        loading: false,
    })
};

const fetchTablesWithoutTicket = (state, action) => {
    return updateObject(state, {
        loading: false,
        tablesWithoutTicket: action.tablesWithoutTicket
    })
};

const fetchTablesForUserSuccess = (state, action) => {
    return updateObject(state, {
        freeTablesForUser: action.freeTablesForUser,
        loading: false
    })
};

const fetchFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const fetchFreePlacesSuccess = (state, action) => {
    return updateObject(state, {
        freePlaces: action.freePlaces,
        loading: false,
    })
};

const tablesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_TABLES_START:
            return fetchStart(state, action);
        case actions.FETCH_ALL_TABLES_SUCCESS:
            return fetchAllTablesSuccess(state, action);
        case actions.FETCH_TABLES_FOR_USER_SUCCESS:
            return fetchTablesForUserSuccess(state, action);
        case actions.FETCH_TABLES_FAIL:
            return fetchFail(state, action);
        case actions.FETCH_FREE_PLACES_SUCCESS:
            return fetchFreePlacesSuccess(state, action);
        case actions.FETCH_TABLES_WITHOUT_TICKET:
            return fetchTablesWithoutTicket(state, action);
        default:
            return state
    }
};

export default tablesReducer;

