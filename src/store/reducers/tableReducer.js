import * as actions from '../actions/actionTypes'
import {updateObject} from "../../shared/utils";

const initialState = {
    tables: [],
    loading: false,
    error: null
};

const fetchTablesStart = (state, action) =>{
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

const fetchTablesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const tablesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_TABLES_START:
            return fetchTablesStart(state, action);
        case actions.FETCH_TABLES_SUCCESS:
            return fetchTablesSuccess(state, action);
        case actions.FETCH_TABLES_FAIL:
            return fetchTablesFail(state, action);
        default:
            return state
    }
};

export default tablesReducer;

