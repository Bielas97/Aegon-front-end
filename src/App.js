import React, {Component} from 'react';
import './App.css';
import Auxiliary from "./hoc/Auxiliary/Auxiliary";
import {Redirect, Route, Switch} from "react-router-dom";
import Aegon from "./containers/aegon/Aegon";
import Layout from "./containers/layout/Layout";
import * as actions from "./store/actions/index";
import {connect} from "react-redux";
import Auth from "./containers/auth/Auth";
import Logout from "./containers/auth/logout/Logout";
import KvTables from "./containers/model/kv-tables/KvTables";
import Users from "./containers/model/users/Users";
import Tickets from "./containers/model/tickets/Tickets";
import RegisterForm from "./containers/register-form/RegisterForm";
import Customers from "./containers/model/customers/Customers";
import {NotificationContainer} from "react-notifications";

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignIn();
    }

    render() {
        let routes = (
            <Auxiliary>
                <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Redirect to="/auth"/>
                </Switch>
            </Auxiliary>
        );


        if (this.props.isAuthenticated) {
            if (sessionStorage.getItem('role') === 'ROLE_ADMIN') {
                routes = (
                    <Auxiliary>
                        <Switch>
                            <Route path="/auth" exact component={Auth}/>
                            <Route path="/" exact component={Aegon}/>
                            <Route path="/logout" exact component={Logout}/>
                            <Route path="/tables" exact component={KvTables}/>
                            <Route path="/users" exact component={Users}/>
                            <Route path="/tickets" exact component={Tickets}/>
                            <Route path="/register" exact component={RegisterForm}/>
                            <Route path="/customers" exact component={Customers}/>
                            <Redirect to="/"/>
                        </Switch>
                    </Auxiliary>
                )
            } else {
                routes = (
                    <Auxiliary>
                        <Switch>
                            <Route path="/auth" exact component={Auth}/>
                            <Route path="/" exact component={Aegon}/>
                            <Route path="/logout" exact component={Logout}/>
                            <Route path="/tables" exact component={KvTables}/>
                            <Redirect to="/"/>
                        </Switch>
                    </Auxiliary>
                )
            }

        }

        return (
            <Auxiliary>
                <Layout>
                    {routes}
                    <NotificationContainer/>
                </Layout>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(actions.authCheckState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
