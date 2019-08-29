import * as actions from '../actions/actionTypes'
import {updateObject} from "../../shared/utils";

const initialState = {
    tickets: [],
    loading: false,
    error: null
};

const fetchTicketsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
};

const fetchTicketsSuccess = (state, action) => {
    return updateObject(state, {
        tickets: action.tickets,
        loading: false
    })
};

const fetchTicketsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_TICKETS_START:
            return fetchTicketsStart(state, action);
        case actions.FETCH_TICKETS_SUCCESS:
            return fetchTicketsSuccess(state, action);
        case actions.FETCH_TICKETS_FAIL:
            return fetchTicketsFail(state, action);
        default:
            return state;
    }
};

export default ticketReducer;
