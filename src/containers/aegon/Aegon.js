import React, {Component} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import KvTables from "../model/kv-tables/KvTables";
import Cards from "../../components/UI/cards/Cards";
import CustomersTableHomePage from "../model/customers/CustomersTableHomePage";
import './Aegon.css';

class Aegon extends Component {

    componentDidMount() {
        if (this.props.admin) {
            this.props.onFetchTickets();
            this.props.onFetchUsers();
        }
        this.props.onFetchCurrentUser();
        this.props.onFetchFreeTablesForUser(1);
        this.props.onFetchFreePlaces();
        this.props.onFetchCustomers();
    }

    render() {
        return (
            <div className="container-xl-fluid">
                <Cards
                    isAdmin={this.props.admin}
                    freeTables={this.props.noFreeTables}
                    accountedCustomers={this.props.customers.length}
                    tickets={this.props.noTickets}
                    users={this.props.noUsers}
                    freePlaces={this.props.noFreePlaces}
                    ticketsLeft={this.props.currentUserTicketsLeft}
                />
                <div className="row">
                    <div className="col-6">
                        <div className="d-flex justify-content-center">
                            <h4>Tables:</h4>
                        </div>
                        <KvTables dashboard/>
                    </div>
                    <div className="col-6">
                        <div className="d-flex justify-content-center">
                            <h4>Customers:</h4>
                        </div>
                        <CustomersTableHomePage/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        freeTables: state.tables.freeTablesForUser,
        admin: state.auth.admin,
        noFreeTables: state.tables.freeTablesForUser.length,
        noTickets: state.tickets.tickets.length,
        noUsers: state.users.users.length,
        noFreePlaces: state.tables.freePlaces,
        customers: state.customers.customers,
        currentUserTicketsLeft: state.users.currentUserTicketsLeft
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchFreeTablesForUser: numberOfPeopleRequestingFreePlaces => dispatch(actions.fetchFreeTablesForUser(numberOfPeopleRequestingFreePlaces)),
        onFetchTickets: () => dispatch(actions.fetchTickets()),
        onFetchUsers: () => dispatch(actions.fetchUsers()),
        onFetchFreePlaces: () => dispatch(actions.fetchFreePlaces()),
        onFetchCustomers: () => dispatch(actions.fetchCustomers()),
        onFetchCurrentUser: () => dispatch(actions.getUserInfo())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Aegon);
