import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import './RegisterForm.css';

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
        event.preventDefault();
        const admin = {
            username: this.state.username.join(),
            password: this.state.password.join(),
            role: 'ADMIN'
        };
        this.props.onRegister(admin);
    };

    submitDisable = (passwordTheSame) => {
        if(this.state.username === '' || this.state.confirmPassword === '' || this.state.password === '' || !passwordTheSame){
            return true
        } else if(passwordTheSame){
            return false
        }
    };

    render() {
        const passwordTheSame = JSON.stringify(this.state.confirmPassword ) === JSON.stringify(this.state.password);
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
                            <button className="btn btn-outline-info mr-3"
                                    onClick={event => this.clearState(event)}>Clear
                            </button>
                            <span className="d-inline-block" data-toggle="popover" data-content="Disabled popover">
                                <button
                                    className="btn btn-outline-success submitButton"
                                    type="submit"
                                    disabled={this.submitDisable(passwordTheSame)}
                                >Submit</button>
                            </span>
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
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.users.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: user => dispatch(actions.registerUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
