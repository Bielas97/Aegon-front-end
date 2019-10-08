import * as actions from './actionTypes';
import axios from '../../axios-api';

const fetchStart = () => {
    return {
        type: actions.FETCH_TABLES_START
    }
};

const fetchAllTablesSuccess = allTablesForUser => {
    return {
        type: actions.FETCH_ALL_TABLES_SUCCESS,
        allTablesForUser: allTablesForUser
    }
};

const fetchFreeTablesForUserSuccess = freeTablesForUser => {
    return {
        type: actions.FETCH_TABLES_FOR_USER_SUCCESS,
        freeTablesForUser: freeTablesForUser
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

const fetchTablesWithoutTicketSuccess = tablesWithoutTicket => {
    return {
        type: actions.FETCH_TABLES_WITHOUT_TICKET,
        tablesWithoutTicket: tablesWithoutTicket
    }
};

export const fetchTables = () => {
    return dispatch => {
        dispatch(fetchStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.get("/tables/user", {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                dispatch(fetchAllTablesSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchFail(error));
            })
    }
};

export const fetchFreeTablesForUser = numberOfPeopleRequestingFreePlaces => {
    return dispatch => {
        dispatch(fetchStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        const url = "/tables/user/" + numberOfPeopleRequestingFreePlaces;
        axios.get(url, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                dispatch(fetchFreeTablesForUserSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchFail(error));
            })
    }
};


export const fetchFreePlaces = () => {
    return dispatch => {
        dispatch(fetchStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
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

export const fetchTablesWithoutTicket = () => {
    return dispatch => {
        dispatch(fetchStart());
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.get("/tables/ticket/free", {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                dispatch(fetchTablesWithoutTicketSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchFail(error))
            })
    }
};
