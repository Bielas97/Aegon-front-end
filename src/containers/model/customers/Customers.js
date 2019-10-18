import React, {Component} from 'react';
import {connect} from "react-redux";

import * as actions from '../../../store/actions';
import axios from '../../../axios-api'
import {NotificationManager} from "react-notifications";
import Backdrop from "../../../components/UI/backdrop/Backdrop";
import Spinner from "../../../components/UI/spinner/Spinner";

class Customers extends Component {

    state = {
        customer: null,
        error: null,

        updatedFirstName: '',
        updatedLastName: '',
        updatedStudent: true,
        loading: false
    };

    componentDidMount() {
        this.props.onFetchCustomers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.msg !== this.props.msg || prevProps.timestamp !== this.props.timestamp) {
            this.props.onFetchCustomers();
            NotificationManager.success(this.props.msg, this.props.timestamp);
        }
        if (this.props.error !== null && prevProps.error !== this.props.error) {
            if (this.props.error.data !== null) {
                NotificationManager.error(this.props.error.data.message, this.props.error.data.error);
            }
        }
    }

    inputChangeHandler = event => {
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

    getCustomerById = id => {
        this.setState({
            ...this.state,
            loading: true
        });
        const url = '/customers/' + id;
        const token = "Bearer ".concat(sessionStorage.getItem("token"));
        axios.get(url, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    customer: response.data,
                    updatedFirstName: response.data.firstName,
                    updatedLastName: response.data.lastName,
                    updatedStudent: response.data.index,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    error: error
                })
            })
    };

    deleteCustomerById = id => {
        this.props.onDeleteCustomer(id);
        this.setState({
            ...this.state,
            customer: null
        })
    };

    updateCustomer = event => {
        event.preventDefault();
        const updatedCustomer = {
            id: this.state.customer.id,
            firstName: this.state.updatedFirstName,
            lastName: this.state.updatedLastName,
            index: this.state.updatedStudent
        };
        this.props.onUpdateCustomer(updatedCustomer);
    };

    render() {
        const tbody = this.props.customers.map(customer => {
            const student = customer.index ? <span className="text-success fa fa-thumbs-o-up"/> :
                <span className="text-danger fa fa-thumbs-o-down"/>;
            const fullName = customer.firstName + " " + customer.lastName;
            return (
                <tbody key={customer.id}>
                <tr>
                    <th scope="row">{customer.id}</th>
                    <td>{fullName}</td>
                    <td>{student}</td>
                    <td>{customer.kvTable.name}</td>
                    <td>
                        <button className="btn btn-outline-info"
                                onClick={() => this.getCustomerById(customer.id)}>Details
                        </button>
                        <button className="btn btn-outline-danger ml-2"
                                onClick={() => this.deleteCustomerById(customer.id)}>Delete
                        </button>
                    </td>
                </tr>
                </tbody>
            )
        });

        let details = null;
        if (this.state.customer && !this.state.loading) {
            details = (
                <div className="row">
                    <span className="text-info fa fa-user my-fa-13x mr-3"/>
                    <form onSubmit={event => this.updateCustomer(event)}>
                        <div className="float-right form-group">
                            <label htmlFor="updatedFirstName">First Name:</label>
                            <input type="text"
                                   name="updatedFirstName"
                                   id="updatedFirstName"
                                   className="form-control"
                                   value={this.state.updatedFirstName}
                                   onChange={this.inputChangeHandler}
                            />
                            <label htmlFor="updatedLastName">Last Name:</label>
                            <input type="text"
                                   name="updatedLastName"
                                   id="updatedLastName"
                                   className="form-control"
                                   value={this.state.updatedLastName}
                                   onChange={this.inputChangeHandler}
                            />
                            <label htmlFor="updatedStudent">Is Student:</label>
                            <div className="row offset-1">
                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            name="updatedStudent"
                                            value={true}
                                            checked={this.state.updatedStudent}
                                            onChange={this.boolInputHandler}/><span
                                        className="text-success fa fa-thumbs-o-up ml-2 mr-3"/></label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            name="updatedStudent"
                                            value={false}
                                            checked={!this.state.updatedStudent}
                                            onChange={this.boolInputHandler}/><span
                                        className="text-danger fa fa-thumbs-o-down ml-2 mr-3"/></label>
                                </div>
                            </div>
                            <button className="btn btn-outline-success" type="submit">Update</button>
                            <button className="btn btn-outline-danger ml-2"
                                    onClick={() => this.deleteCustomerById(this.state.customer.id)}>Delete
                            </button>
                        </div>
                    </form>
                </div>
            )
        }
        if(this.state.loading){
            details = (
                <Backdrop show>
                    <Spinner/>
                </Backdrop>
            )
        }

        let customersComponent = (
            <div className="row">
                <div className="col-6">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Student</th>
                            <th scope="col">Table</th>
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
        );
        if (this.props.loading) {
            customersComponent = (
                <Backdrop show>
                    <Spinner/>
                </Backdrop>
            )
        }

        return (
            <div className="container-fluid">
                <br/>
                {customersComponent}
                <br/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        customers: state.customers.customers,
        msg: state.customers.message,
        timestamp: state.customers.timestamp,
        loading: state.customers.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCustomers: () => dispatch(actions.fetchCustomers()),
        onUpdateCustomer: customer => dispatch(actions.updateCustomer(customer)),
        onDeleteCustomer: id => dispatch(actions.deleteCustomer(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
