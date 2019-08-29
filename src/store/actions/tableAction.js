import * as actions from './actionTypes';
import axios from '../../axios-api';

const fetchStart = () => {
    return {
        type: actions.FETCH_TABLES_START
    }
};

const fetchSuccess = tables => {
    return {
        type: actions.FETCH_TABLES_SUCCESS,
        tables: tables
    }
};

const fetchFail = error => {
    return {
        type: actions.FETCH_TABLES_FAIL,
        error: error
    }
};

const fetchFreePlacesSuccess = freePlaces => {
    return {
        type: actions.FETCH_FREE_PLACES_SUCCESS,
        freePlaces: freePlaces
    }
};

export const fetchTables = () => {
    return dispatch => {
        dispatch(fetchStart());
        const token = "Bearer ".concat(localStorage.getItem("token"));
        axios.get("/tables/user", {
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

export const fetchFreePlaces = () => {
    return dispatch => {
        dispatch(fetchStart());
        const token = "Bearer ".concat(localStorage.getItem("token"));
        axios.get("/tables/free/places", {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                dispatch(fetchFreePlacesSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchFail(error));
            })
    }
};
