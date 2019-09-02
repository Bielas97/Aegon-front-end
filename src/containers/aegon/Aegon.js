import React, {Component} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import KvTables from "../model/kv-tables/KvTables";
import Cards from "../../components/UI/cards/Cards";
import Customers from "../model/customers/Customers";
import './Aegon.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';

class Aegon extends Component {

    componentDidMount() {
        if (this.props.admin) {
            this.props.onFetchTickets();
            this.props.onFetchUsers();
        }
        this.props.onFetchFreePlaces();
    }

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
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

    render() {
        return (
            <div className="container-xl-fluid">
                <Cards
                    isAdmin={this.props.admin}
                    freeTables={this.props.noFreeTables}
                    tickets={this.props.noTickets}
                    users={this.props.noUsers}
                    freePlaces={this.props.noFreePlaces}
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
                        <Customers/>
                    </div>
                </div>



                <div>
                    <button className='btn btn-info'
                            onClick={this.createNotification('info')}>Info
                    </button>
                    <hr/>
                    <button className='btn btn-success'
                            onClick={this.createNotification('success')}>Success
                    </button>
                    <hr/>
                    <button className='btn btn-warning'
                            onClick={this.createNotification('warning')}>Warning
                    </button>
                    <hr/>
                    <button className='btn btn-danger'
                            onClick={this.createNotification('error')}>Error
                    </button>

                    <NotificationContainer/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        admin: state.auth.admin,
        noFreeTables: state.tables.tables.length,
        noTickets: state.tickets.tickets.length,
        noUsers: state.users.users.length,
        noFreePlaces: state.tables.freePlaces
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTables: () => dispatch(actions.fetchTables()),
        onFetchTickets: () => dispatch(actions.fetchTickets()),
        onFetchUsers: () => dispatch(actions.fetchUsers()),
        onFetchFreePlaces: () => dispatch(actions.fetchFreePlaces())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Aegon);
