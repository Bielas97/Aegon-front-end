import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Redirect} from "react-router-dom";
import Backdrop from "../../components/UI/backdrop/Backdrop";
import Spinner from "../../components/UI/spinner/Spinner";
import Auxiliary from "../../hoc/Auxiliary";

class Auth extends Component {
    state = {
        login: '',
        password: ''
    };

    inputChangeHandler = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    };

    formSubmitHandler = () => {
        this.props.onAuth(this.state.login, this.state.password);
    };

    render() {
        let loginForm = <Redirect to="/"/>

        if (!this.props.isAuthenticated && !this.props.loading) {
            loginForm = (
                <div className="container">
                    <div className="row">
                        <div className="col-6 offset-3">
                            <form onSubmit={this.formSubmitHandler}>
                                <div className="form-group">
                                    <label htmlFor="login">Login:</label>
                                    <input type="text" name="login" id="login" className="form-control"
                                           placeholder="enter login"
                                           onChange={this.inputChangeHandler}/>
                                    <small className="form-text text-muted">obtain your login from aegon admin</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordId">Password:</label>
                                    <input type="password" name="password" className="form-control" id="passwordId"
                                           placeholder="enter password" onChange={this.inputChangeHandler}/>
                                </div>
                                <button type="submit" className="btn btn-info">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.loading) {
            loginForm = (
                <Backdrop show>
                    <Spinner/>
                </Backdrop>
            )
        }

        return (
            <Auxiliary>
                {loginForm}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error,
        loading: state.auth.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (login, password) => dispatch(actions.auth(login, password)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
