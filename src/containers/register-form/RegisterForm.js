import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import './RegisterForm.css';
import {NotificationManager} from 'react-notifications';
import errorHandler from "../../hoc/error-handler/ErrorHandler";
import axios from '../../axios-api';
import Backdrop from "../../components/UI/backdrop/Backdrop";
import Spinner from "../../components/UI/spinner/Spinner";

class RegisterForm extends Component {
    state = {
        //admin
        adminUsername: [],
        adminPassword: [],
        adminConfirmPassword: [],
        adminConfirmTouched: false,
        //user
        userUsername: [],
        userPassword: [],
        userRole: null,
        userNumberOfTickets: ["10"],
        userTickets: [],
        userConfirmPassword: [],
        userConfirmTouched: false,
    };

    clearState = event => {
        event.preventDefault();
        this.setState({
            //admin
            adminUsername: [],
            adminPassword: [],
            adminConfirmPassword: [],
            adminConfirmTouched: false,
            //user
            userUsername: [],
            userPassword: [],
            userRole: null,
            userNumberOfTickets: ["10"],
            userTickets: [],
            userConfirmPassword: [],
            userConfirmTouched: false,
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.msg !== this.props.msg && prevProps.timestamp !== this.props.timestamp) {
            NotificationManager.success(this.props.msg, this.props.timestamp);
        }
    }

    inputChangeHandler = (event) => {
        if (event.target.name === 'adminConfirmPassword') {
            this.setState({
                ...this.state,
                [event.target.name]: [event.target.value],
                adminConfirmTouched: true
            })
        } else if (event.target.name === 'userConfirmPassword') {
            this.setState({
                ...this.state,
                [event.target.name]: [event.target.value],
                userConfirmTouched: true
            })
        } else if (event.target.name.startsWith('ticket_')) {
            let updatedTickets = [...this.state.userTickets];
            const ticketId = {
                id: [event.target.value].join()
            };
            if(event.target.checked){
                updatedTickets.push(ticketId)
            } else {
                updatedTickets = updatedTickets.filter(ticket => ticket.id !== ticketId.id)
            }
            this.setState({
                ...this.state,
                userTickets: updatedTickets
            })
        } else {
            this.setState({
                ...this.state,
                [event.target.name]: [event.target.value]
            })
        }
    };

    registerAdmin = event => {
        event.preventDefault();
        const admin = {
            username: this.state.adminUsername.join(),
            password: this.state.adminPassword.join(),
            role: 'ADMIN'
        };
        this.props.onRegister(admin);
        this.clearState(event);
    };

    registerUser = event => {
        event.preventDefault()
        const user = {
            username: this.state.userUsername.join(),
            password: this.state.userPassword.join(),
            role: 'USER',
            tickets: this.state.userTickets,
            numberOfTickets: this.state.userNumberOfTickets.join()
        };
        this.props.onRegister(user);
        this.clearState(event);
    };

    submitDisable = (passwordTheSame, type) => {
        if (type === 'admin') {
            if (this.state.adminUsername.join() === '' || this.state.adminConfirmPassword.join() === '' || this.state.adminPassword.join() === '' || !passwordTheSame) {
                return true
            } else if (passwordTheSame) {
                return false
            }
        } else if (type === 'user') {
            if (this.state.userUsername.join() === '' || this.state.userConfirmPassword.join() === '' || this.state.userPassword.join() === '' ||
                !passwordTheSame || this.state.userNumberOfTickets === 0 || this.state.userTickets.length === 0 || this.state.userNumberOfTickets.join() === '0') {
                return true
            } else if (passwordTheSame) {
                return false
            }
        }
    };

    render() {
        const adminPasswordTheSame = JSON.stringify(this.state.adminConfirmPassword) === JSON.stringify(this.state.adminPassword);
        const userPasswordTheSame = JSON.stringify(this.state.userConfirmPassword) === JSON.stringify(this.state.userPassword);
        const adminConfirmStyle = this.state.adminConfirmTouched && (!adminPasswordTheSame) ? "form-control my-background" : "form-control";
        const userConfirmStyle = this.state.userConfirmTouched && (!userPasswordTheSame) ? "form-control my-background" : "form-control";
        const adminForm = (
            <div className="row">
                <span className="float-left text-info fa fa-user-secret my-fa-13x mr-3 ml-3"/>
                <form className="ml-3" onSubmit={(event) => this.registerAdmin(event)}>
                    <div className="float-right form-group">
                        <div className="row">
                            <div className="col-3 col-form-label">
                                <label htmlFor="adminUsername">Username:</label>
                            </div>
                            <div className="col-9">
                                <input type="text"
                                       name="adminUsername"
                                       id="adminUsername"
                                       className="form-control"
                                       value={this.state.adminUsername}
                                       onChange={this.inputChangeHandler}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 col-form-label">
                                <label htmlFor="adminPassword">Password:</label>
                            </div>
                            <div className="col-9">
                                <input type="password"
                                       name="adminPassword"
                                       id="adminPassword"
                                       className="form-control"
                                       value={this.state.adminPassword}
                                       onChange={this.inputChangeHandler}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor="adminConfirmPassword">Confirm:</label>
                            </div>
                            <div className="col-9">
                                <input type="password"
                                       name="adminConfirmPassword"
                                       id="adminConfirmPassword"
                                       className={adminConfirmStyle}
                                       value={this.state.adminConfirmPassword}
                                       onChange={this.inputChangeHandler}/>
                            </div>
                        </div>
                        <br/>
                        <div className="float-right">
                            <span className="btn btn-outline-info mr-3"
                                  onClick={event => this.clearState(event)}>Clear
                            </span>
                            <button
                                className="btn btn-outline-success submitButton"
                                type="submit"
                                disabled={this.submitDisable(adminPasswordTheSame, 'admin')}
                            >Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );

        const ticketsOptions = (
            this.props.tickets.map(ticket => {
                return (
                    <div className="form-check form-check-inline" key={ticket.shortName}>
                        <input className="form-check-input"
                               type="checkbox" id={ticket.shortName}
                               value={ticket.id}
                               name={'ticket_'.concat(ticket.shortName)}
                               onChange={this.inputChangeHandler}/>
                        <label className="form-check-label" htmlFor={ticket.shortName}>{ticket.shortName}</label>
                    </div>
                )
            })
        );

        const userForm = (
            <div className="row">
                <span className="float-left text-info fa fa-user my-fa-13x mr-3 ml-3"/>
                <form className="ml-3" onSubmit={(event) => this.registerUser(event)}>
                    <div className="float-right form-group">
                        <div className="row">
                            <div className="col-3 col-form-label">
                                <label htmlFor="userUsername">Username:</label>
                            </div>
                            <div className="col-9">
                                <input type="text"
                                       name="userUsername"
                                       id="userUsername"
                                       className="form-control"
                                       value={this.state.userUsername}
                                       onChange={this.inputChangeHandler}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 col-form-label">
                                <label htmlFor="userPassword">Password:</label>
                            </div>
                            <div className="col-9">
                                <input type="password"
                                       name="userPassword"
                                       id="userPassword"
                                       className="form-control"
                                       value={this.state.userPassword}
                                       onChange={this.inputChangeHandler}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 form-label">
                                <label htmlFor="userConfirmPassword">Confirm:</label>
                            </div>
                            <div className="col-9">
                                <input type="password"
                                       name="userConfirmPassword"
                                       id="userConfirmPassword"
                                       className={userConfirmStyle}
                                       value={this.state.userConfirmPassword}
                                       onChange={this.inputChangeHandler}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3 form-label">
                                <label htmlFor="userNumberOfTickets">Customers to account:</label>
                            </div>
                            <div className="col-9">
                                <input type="number"
                                       name="userNumberOfTickets"
                                       id="userNumberOfTickets"
                                       className="form-control mt-2"
                                       value={parseInt(this.state.userNumberOfTickets.join())}
                                       onChange={this.inputChangeHandler}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <label>Tickets:</label>
                            </div>
                            <div className="col-9">
                                {ticketsOptions}
                            </div>
                        </div>
                        <br/>
                        <div className="float-right">
                            <span className="btn btn-outline-info mr-3"
                                  onClick={event => this.clearState(event)}>Clear
                            </span>
                            <button
                                className="btn btn-outline-success submitButton"
                                type="submit"
                                disabled={this.submitDisable(userPasswordTheSame, 'user')}
                            >Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );

        let registerComponent = (
            <div className="row">
                <div className="col-6 vl">
                    <div className="text-center">
                        <h3>Register Admin:</h3>
                    </div>
                    <br/>
                    {adminForm}
                </div>
                <div className="col-6">
                    <div className="text-center">
                        <h3>Register User:</h3>
                        <br/>
                        {userForm}
                    </div>
                </div>
            </div>
        );
        if(this.props.loading){
            registerComponent = (
                <Backdrop show>
                    <Spinner/>
                </Backdrop>
            )
        }

        return (
            <div className="container-fluid">
                <br/>
                {registerComponent}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.users.loading,
        msg: state.users.message,
        timestamp: state.users.timestamp,
        tickets: state.tickets.tickets
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: user => dispatch(actions.registerUser(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(RegisterForm, axios))
