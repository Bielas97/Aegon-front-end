import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../../store/actions';
import './Users.css'
import axios from '../../../axios-api'
import {NotificationManager} from "react-notifications";

class Users extends Component {

    state = {
        user: null,
        error: null,
        updatedUsername: null,
        updatedRole: null,
        updatedNumberOfTickets: null,
        updatedTickets: []
    };

    componentDidMount() {
        this.props.onFetchUsers()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.msg !== this.props.msg && prevProps.timestamp !== this.props.timestamp) {
            this.props.onFetchUsers();
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
            [event.target.name]: [event.target.value]
        })
    };

    getUserById = id => {
        const url = '/users/'.concat(id);
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.get(url, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    user: response.data,
                    updatedUsername: response.data.username,
                    updatedRole: response.data.role,
                    updatedNumberOfTickets: response.data.numberOfTickets,
                    updatedTickets: response.data.tickets
                })
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    error: error
                })
            })
    };

    deleteUserById = id => {
        this.props.onDeleteUser(id);
        if(this.state.user !== null && id === this.state.user.id){
            this.setState({...this.state, user: null});
        }
    };

    render() {
        const tbody = this.props.users.map(el => {
            const tickets = el.numberOfTickets === null ?
                <span className="text-info fa fa-diamond"/> : el.numberOfTickets;
            return (
                <tbody key={el.id}>
                <tr>
                    <th scope="row">{el.id}</th>
                    <td>{el.username}</td>
                    <td>{el.role}</td>
                    <td>{tickets}</td>
                    <td>
                        <button className="btn btn-outline-info" onClick={() => this.getUserById(el.id)}>Details</button>
                        <button className="btn btn-outline-danger ml-2"
                                onClick={() => this.deleteUserById(el.id)}>Delete
                        </button>
                    </td>
                </tr>
                </tbody>
            )
        });

        let details = null;

        if (this.state.user) {
            const iconStyle = this.state.user.role === 'ADMIN' ? "float-left text-info fa fa-user-secret my-fa-13x mr-3" : "float-left text-info fa fa-user my-fa-13x mr-3";
            details = (
                <div className="row">
                    <span className={iconStyle}/>
                    <form>
                        <div className="float-right form-group">
                            <label htmlFor="updatedUsername">Username:</label>
                            <input type="text"
                                   name="updatedUsername"
                                   id="updatedUsername"
                                   className="form-control"
                                   value={this.state.updatedUsername}
                                   onChange={this.inputChangeHandler}/>
                            <label htmlFor="noTickets">Amount of tickets:</label>
                            <input type="number"
                                   name="updatedNumberOfTickets"
                                   id="updatedNumberOfTickets"
                                   className="form-control"
                                   value={this.state.updatedNumberOfTickets ? this.state.updatedNumberOfTickets : -1}
                                   onChange={this.inputChangeHandler}/>
                            <small className="form-text text-muted">-1 means infinite</small>
                            <br/>
                            <label>Role</label>
                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="optradio"
                                        checked={this.state.user.role === 'ADMIN'}/>Admin</label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="optradio"
                                        checked={this.state.user.role !== 'ADMIN'}/>User</label>
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
                                <th scope="col">Username</th>
                                <th scope="col">Role</th>
                                <th scope="col">Tickets</th>
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
        users: state.users.users,
        loading: state.users.loading,
        msg: state.users.message,
        timestamp: state.users.timestamp,
        error: state.users.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(actions.fetchUsers()),
        onDeleteUser: id => dispatch(actions.deleteUserById(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
