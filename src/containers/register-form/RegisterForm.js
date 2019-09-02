import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import './RegisterForm.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import errorHandler from "../../hoc/error-handler/ErrorHandler";
import axios from '../../axios-api';

class RegisterForm extends Component {
    state = {
        username: "",
        password: "",
        role: null,
        numberOfTickets: null,
        tickets: null,

        confirmPassword: "",
        confirmTouched: false
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.msg !== this.props.msg && prevProps.timestamp !== this.props.timestamp) {
            console.log('registerForm', this.props.msg);
            NotificationManager.success(this.props.msg, this.props.timestamp);
        }
    }

    createNotification = (type, msg, timestamp) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success(msg, timestamp);
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };

    inputChangeHandler = (event) => {
        if (event.target.name === 'confirmPassword') {
            this.setState({
                ...this.state,
                [event.target.name]: [event.target.value],
                confirmTouched: true
            })
        } else {
            this.setState({
                ...this.state,
                [event.target.name]: [event.target.value]
            })
        }
    };

    clearState = event => {
        event.preventDefault();
        console.log("clear state")
        this.setState({
            username: '',
            password: '',
            role: null,
            numberOfTickets: null,
            tickets: null,

            confirmPassword: '',
            confirmTouched: false
        })
    };

    registerAdmin = event => {
        //event.preventDefault();
        const admin = {
            username: this.state.username.join(),
            password: this.state.password.join(),
            role: 'ADMIN'
        };
        this.props.onRegister(admin);
        this.clearState(event);
    };

    submitDisable = (passwordTheSame) => {
        if (this.state.username === '' || this.state.confirmPassword === '' || this.state.password === '' || !passwordTheSame) {
            return true
        } else if (passwordTheSame) {
            return false
        }
    };

    render() {
        const passwordTheSame = JSON.stringify(this.state.confirmPassword) === JSON.stringify(this.state.password);
        const confirmStyle = this.state.confirmTouched && (!passwordTheSame) ? "form-control my-background" : "form-control";
        const adminForm = (
            <div className="row">
                <span className="float-left text-info fa fa-user-secret my-fa-13x mr-3 ml-3"/>
                <form className="ml-3" onSubmit={(event) => this.registerAdmin(event)}>
                    <div className="float-right form-group">
                        <div className="row">
                            <div className="col-3 col-form-label">
                                <label htmlFor="username">Username:</label>
                            </div>
                            <div className="col-9">
                                <input type="text"
                                       name="username"
                                       id="username"
                                       className="form-control"
                                       value={this.state.username}
                                       onChange={this.inputChangeHandler}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 col-form-label">
                                <label htmlFor="password">Password:</label>
                            </div>
                            <div className="col-9">
                                <input type="password"
                                       name="password"
                                       id="password"
                                       className="form-control"
                                       value={this.state.password}
                                       onChange={this.inputChangeHandler}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor="password">Confirm:</label>
                            </div>
                            <div className="col-9">
                                <input type="password"
                                       name="confirmPassword"
                                       id="confirmPassword"
                                       className={confirmStyle}
                                       value={this.state.confirmPassword}
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
                                disabled={this.submitDisable(passwordTheSame)}
                            >Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );

        const userForm = (
            <div className="row">
                <span className="float-left text-info fa fa-user my-fa-13x mr-3 ml-3"/>
            </div>
        );


        return (

            <div className="container-fluid">
                <br/>
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
                <NotificationContainer/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.users.loading,
        msg: state.users.message,
        timestamp: state.users.timestamp
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: user => dispatch(actions.registerUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(RegisterForm, axios))
