import * as actions from '../actions/actionTypes'
import {updateObject} from "../../shared/utils";

const initialState = {
    tables: [],
    freePlaces: null,
    loading: false,
    error: null
};

const fetchStart = (state, action) =>{
    return updateObject(state, {
        error: null,
        loading: true
    })
};

const fetchTablesSuccess = (state, action) => {
    return updateObject(state, {
        tables: action.tables,
        loading: false,
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
        case actions.FETCH_TABLES_SUCCESS:
            return fetchTablesSuccess(state, action);
        case actions.FETCH_TABLES_FAIL:
            return fetchFail(state, action);
        case actions.FETCH_FREE_PLACES_SUCCESS:
            return fetchFreePlacesSuccess(state, action);
        default:
            return state
    }
};

export default tablesReducer;

