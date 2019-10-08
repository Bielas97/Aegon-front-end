import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../../store/actions';
import axios from '../../../axios-api'
import '../users/Users.css';
import {NotificationManager} from "react-notifications";
import {updateObject} from "../../../shared/utils";
import NewTicket from "./NewTicket";

class Tickets extends Component {

    state = {
        ticket: null,
        error: false,
        updatedShortName: null,
        updatedFullName: null,
        updatedUni: null,
        updatedTables: [],
        clearDetails: false
    };

    componentDidMount() {
        this.props.onFetchTickets();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.msg !== this.props.msg || prevProps.timestamp !== this.props.timestamp) {
            this.props.onFetchTickets();
            NotificationManager.success(this.props.msg, this.props.timestamp);
        }
        if (this.props.error !== null && prevProps.error !== this.props.error) {
            if (this.props.error.data !== null) {
                NotificationManager.error(this.props.error.data.message, this.props.error.data.error);
            }
        }
    }

    inputChangeHandler = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    };

    boolInputHandler = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value === 'true'
        })
    };

    getTicketById = id => {
        const url = '/tickets/'.concat(id);
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.get(url, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    ticket: response.data,
                    updatedShortName: response.data.shortName,
                    updatedFullName: response.data.fullName,
                    updatedUni: response.data.uni,
                    updatedTables: response.data.tables
                })
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    error: error
                })
            })
    };

    deleteTicketById = id => {
        this.props.onDeleteTicket(id);
        if (this.state.ticket !== null && id === this.state.ticket.id) {
            this.setState({...this.state, ticket: null});
        }
    };

    updateTicket = event => {
        event.preventDefault();
        console.log('shortname', this.state.updatedShortName);
        console.log('fullname', this.state.updatedFullName);
        const ticket = {
            id: this.state.ticket.id,
            shortName: this.state.updatedShortName,
            fullName: this.state.updatedFullName,
            uni: this.state.updatedUni,
            tables: this.state.ticket.tables
        };
        this.props.onUpdateTicket(ticket);
    };

    render() {
        const tbody = this.props.tickets.map(el => {
            const uni = el.uni ? <span className="text-success fa fa-thumbs-o-up"/> :
                <span className="text-danger fa fa-thumbs-o-down"/>;
            return (
                <tbody key={el.id}>
                <tr>
                    <th scope="row">{el.id}</th>
                    <td>{el.shortName}</td>
                    <td>{el.fullName}</td>
                    <td>{uni}</td>
                    <td>
                        <button className="btn btn-outline-info"
                                onClick={() => this.getTicketById(el.id)}>Details
                        </button>
                        <button className="btn btn-outline-danger ml-2"
                                onClick={() => this.deleteTicketById(el.id)}>Delete
                        </button>
                    </td>
                </tr>
                </tbody>
            )
        });

        let details = null;
        if (this.state.ticket) {
            const tables = this.state.updatedTables.map(kvTable => kvTable['name']).join(",");
            details = (
                <div className="row">
                    <span className="text-info fa fa-ticket my-fa-13x mr-3"/>
                    <form>
                        <div className="float-right form-group">
                            <label htmlFor="updatedShortName">Short Name:</label>
                            <input type="text"
                                   name="updatedShortName"
                                   id="updatedShortName"
                                   className="form-control"
                                   value={this.state.updatedShortName}
                                   onChange={this.inputChangeHandler}/>
                            <label htmlFor="updatedFullName">Full Name:</label>
                            <input type="text"
                                   name="updatedFullName"
                                   id="updatedFullName"
                                   className="form-control"
                                   value={this.state.updatedFullName}
                                   onChange={this.inputChangeHandler}/>
                            <label htmlFor="updatedUni">Is University:</label>
                            <div className="row offset-1">
                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            name="updatedUni"
                                            value={true}
                                            checked={this.state.updatedUni}
                                            onChange={this.boolInputHandler}/><span
                                        className="text-success fa fa-thumbs-o-up ml-2 mr-3"/></label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            name="updatedUni"
                                            value={false}
                                            checked={!this.state.updatedUni}
                                            onChange={this.boolInputHandler}/><span
                                        className="text-danger fa fa-thumbs-o-down ml-2 mr-3"/></label>
                                </div>
                            </div>
                            <label>Tables:</label>
                            <p>{tables}</p>
                            <button className="btn btn-outline-success" onClick={event => this.updateTicket(event)}>update</button>
                            <button className="btn btn-outline-danger ml-2"
                                    onClick={() => this.deleteTicketById(this.state.ticket.id)}>delete
                            </button>
                        </div>
                    </form>
                </div>
            )
        }
        if (this.state.clearDetails) {
            details = null;
            updateObject(this.state, {
                clearDetails: false
            })
        }

        return (
            <div className="container-fluid">
                <br/>
                <div className="row">
                    <div className="col-7">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Short name</th>
                                <th scope="col">Full name</th>
                                <th scope="col">University</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            {tbody}
                        </table>
                    </div>
                    <div className="col-5">
                        {details}
                    </div>
                </div>
                <br/>
                <h3>New Ticket</h3>
                <NewTicket/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tickets: state.tickets.tickets,
        loading: state.tickets.loading,
        msg: state.tickets.message,
        timestamp: state.tickets.timestamp,
        error: state.tickets.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTickets: () => dispatch(actions.fetchTickets()),
        onDeleteTicket: id => dispatch(actions.deleteTicketById(id)),
        onUpdateTicket: ticket => dispatch(actions.updateTicket(ticket))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
