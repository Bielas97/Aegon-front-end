import * as actions from '../actions/actionTypes'
import {formatTimestamp, updateObject} from "../../shared/utils";

const initialState = {
    tickets: [],
    loading: false,
    error: null,
    message: null,
    timestamp: null
};

const ticketsActionStart = (state, action) => {
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

const ticketActionFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const deleteTicketSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        timestamp: formatTimestamp(action.timestamp),
        loading: false
    })
};

const addTicketSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        timestamp: formatTimestamp(action.timestamp),
        loading: false
    })
};

const updateTicketSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        timestamp: formatTimestamp(action.timestamp),
        loading: false
    })
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.TICKET_ACTION_START:
            return ticketsActionStart(state, action);
        case actions.TICKET_ACTION_FAIL:
            return ticketActionFail(state, action);
        case actions.FETCH_TICKETS_SUCCESS:
            return fetchTicketsSuccess(state, action);
        case actions.DELETE_TICKET_SUCCESS:
            return deleteTicketSuccess(state, action);
        case actions.UPDATE_TICKET_SUCCESS:
            return updateTicketSuccess(state, action);
        case actions.ADD_TICKET_SUCCESS:
            return addTicketSuccess(state, action);
        default:
            return state;
    }
};

export default ticketReducer;
