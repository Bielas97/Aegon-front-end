import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../../store/actions';
import axios from '../../../axios-api'
import '../users/Users.css';

class Tickets extends Component {

    state = {
        ticket: null,
        error: null,
        updatedShortName: null,
        updatedFullName: null,
        updatedUni: null,
        updatedTables: []
    };

    componentDidMount() {
        this.props.onFetchTickets();
    }

    inputChangeHandler = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    };

    getTicketById = id => {
        const url = '/tickets/'.concat(id);
        const token = "Bearer ".concat(localStorage.getItem("token"));
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

    render() {
        const tbody = this.props.tickets.map(el => {
            const uni = el.uni ? <span className="text-success fa fa-thumbs-o-up"/> :
                <span className="text-danger fa fa-thumbs-o-down"/>;
            const tables = el.tables.map(kvTable => kvTable['name']).join(",");
            return (
                <tbody key={el.id}>
                <tr>
                    <th scope="row">{el.id}</th>
                    <td>{el.shortName}</td>
                    <td>{el.fullName}</td>
                    <td>{uni}</td>
                    <td>{tables}</td>
                    <td>
                        <button className="btn btn-outline-info" onClick={() => this.getTicketById(el.id)}>Details</button>
                    </td>
                </tr>
                </tbody>
            )
        });

        let details = null;

        if (this.state.ticket) {
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
                                            name="optradio"
                                            checked={this.state.ticket.uni === 'true'}/><span className="text-success fa fa-thumbs-o-up ml-2 mr-3"/></label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            name="optradio"
                                            checked={this.state.ticket.uni !== 'true'}/><span className="text-danger fa fa-thumbs-o-down ml-2 mr-3"/></label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }

        return (
            <div className="container-fluid">
                <br/>
                <div className="row">
                    <div className="col-6">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Short name</th>
                                <th scope="col">Full name</th>
                                <th scope="col">University</th>
                                <th scope="col">Tables</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            {tbody}
                        </table>
                    </div>
                    <div className="col-6">
                        {details}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tickets: state.tickets.tickets,
        loading: state.tickets.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTickets: () => dispatch(actions.fetchTickets())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
