import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../../store/actions/index'
import Ground from "../../../components/UI/map-vector-graphics/Ground";
import FirstFloor from "../../../components/UI/map-vector-graphics/FirstFloor";
import SecondFloor from "../../../components/UI/map-vector-graphics/SecondFloor";

class NewCustomer extends Component {

    state = {
        C1FirstName: '',
        C1LastName: '',
        C1KvAppearance: 0,
        C1IsStudent: false,
        C2FirstName: '',
        C2LastName: '',
        C2KvAppearance: '',
        C2IsStudent: false,
        kvTable: {},

        freeTablesForUser: [],
        chosenTables: [],
        showGroundFloor: true,
        showFirstFloor: false,
        showSecondFloor: false,

        showTwoCustomersForm: false
    };

    componentDidMount() {
        const numberOfCustomers = this.state.showTwoCustomersForm ? 2: 1;
        this.props.onFetchFreeTablesForUser(numberOfCustomers);
        this.setState({
            ...this.state,
            freeTablesForUser: this.props.freeTablesForUser.map(table => table.name)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.showTwoCustomersForm !== prevState.showTwoCustomersForm) {
            const numberOfCustomers = this.state.showTwoCustomersForm ? 2: 1;
            this.props.onFetchFreeTablesForUser(numberOfCustomers);
        }
        if (this.props.timestamp !== prevProps.timestamp) {
            const numberOfCustomers = this.state.showTwoCustomersForm ? 2: 1;
            this.props.onFetchFreeTablesForUser(numberOfCustomers);
        }
        if (this.props.freeTablesForUser.length !== prevProps.freeTablesForUser.length) {
            this.setState({
                ...this.state,
                freeTablesForUser: this.props.freeTablesForUser.map(table => table.name)
            })
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

    tableClicked = id => {
        const availableTablesNames = this.props.freeTablesForUser.map(table => table.name);
        if (availableTablesNames.includes(id)) {
            if (this.state.freeTablesForUser.includes(id)) {
                const newFreeTables = this.state.freeTablesForUser.filter(tableId => tableId !== id);
                this.setState({
                    ...this.state,
                    freeTablesForUser: newFreeTables,
                    chosenTables: this.state.chosenTables.concat(id)
                });
            } else {
                const newChosenTables = this.state.chosenTables.filter(tableId => tableId !== id);
                this.setState({
                    ...this.state,
                    freeTablesForUser: this.state.freeTablesForUser.concat(id),
                    chosenTables: newChosenTables
                })
            }
        }
    };

    switchToOneCustomer = () => {
        this.setState({
            ...this.state,
            showTwoCustomersForm: false
        })
    };
    switchToTwoCustomers = () => {
        this.setState({
            ...this.state,
            showTwoCustomersForm: true
        })
    };

    switchToGroundFloor = () => {
        this.setState({
            ...this.state,
            showGroundFloor: true,
            showFirstFloor: false,
            showSecondFloor: false
        })
    };
    switchToFirstFloor = () => {
        this.setState({
            ...this.state,
            showGroundFloor: false,
            showFirstFloor: true,
            showSecondFloor: false
        })
    };
    switchToSecondFloor = () => {
        this.setState({
            ...this.state,
            showGroundFloor: false,
            showFirstFloor: false,
            showSecondFloor: true
        })
    };

    showProps = () => {
        console.log('show props', this.props)
    };

    showState = () => {
        console.log('show state', this.state)
    };

    render() {
        const C1Form = (
            <div className="form-group">
                <label htmlFor="C1FirstName">First Name:</label>
                <input type="text"
                       name="C1FirstName"
                       id="C1FirstName"
                       className="form-control"
                       onChange={this.inputChangeHandler}
                       value={this.state.C1FirstName}
                />
                <label htmlFor="C1LastName">First Name:</label>
                <input type="text"
                       name="C1LastName"
                       id="C1LastName"
                       className="form-control"
                       onChange={this.inputChangeHandler}
                       value={this.state.C1LastName}
                />
                <label htmlFor="C1KvAppearance">First Name:</label>
                <input type="number"
                       name="C1KvAppearance"
                       id="C1KvAppearance"
                       className="form-control"
                       onChange={this.inputChangeHandler}
                       value={this.state.C1KvAppearance}
                />
                <label htmlFor="C1IsStudent">Is Student:</label>
                <div className="row offset-1">
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="C1IsStudent"
                                value={true}
                                checked={this.state.C1IsStudent}
                                onChange={this.boolInputHandler}/><span
                            className="text-success fa fa-thumbs-o-up ml-2 mr-3"/></label>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="C1IsStudent"
                                value={false}
                                checked={!this.state.C1IsStudent}
                                onChange={this.boolInputHandler}/><span
                            className="text-danger fa fa-thumbs-o-down ml-2 mr-3"/></label>
                    </div>
                </div>
            </div>
        );

        const C2Form = (
            <div className="form-group">
                <h4>Second Customer:</h4>
                <label htmlFor="C2FirstName">First Name:</label>
                <input type="text"
                       name="C2FirstName"
                       id="C2FirstName"
                       className="form-control"
                       onChange={this.inputChangeHandler}
                       value={this.state.C2FirstName}
                />
                <label htmlFor="C2LastName">First Name:</label>
                <input type="text"
                       name="C2LastName"
                       id="C2LastName"
                       className="form-control"
                       onChange={this.inputChangeHandler}
                       value={this.state.C2LastName}
                />
                <label htmlFor="C2KvAppearance">First Name:</label>
                <input type="number"
                       name="C2KvAppearance"
                       id="C2KvAppearance"
                       className="form-control"
                       onChange={this.inputChangeHandler}
                       value={this.state.C2KvAppearance}
                />
                <label htmlFor="C2IsStudent">Is Student:</label>
                <div className="row offset-1">
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="C2IsStudent"
                                value={true}
                                checked={this.state.C2IsStudent}
                                onChange={this.boolInputHandler}/><span
                            className="text-success fa fa-thumbs-o-up ml-2 mr-3"/></label>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="C2IsStudent"
                                value={false}
                                checked={!this.state.C2IsStudent}
                                onChange={this.boolInputHandler}/><span
                            className="text-danger fa fa-thumbs-o-down ml-2 mr-3"/></label>
                    </div>
                </div>
            </div>
        );

        const map = (
            <div>
                {this.state.showGroundFloor ? <Ground
                    onTableClick={id => this.tableClicked(id)}
                    freeTables={this.state.freeTablesForUser}
                /> : null}
                {this.state.showFirstFloor ? <FirstFloor
                    onTableClick={id => this.tableClicked(id)}
                    freeTables={this.state.freeTablesForUser}
                /> : null}
                {this.state.showSecondFloor ? <SecondFloor
                    onTableClick={id => this.tableClicked(id)}
                    freeTables={this.state.freeTablesForUser}
                /> : null}
            </div>
        );

        const amountOfCustomersNavigation = (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <nav className={!this.state.showTwoCustomersForm ? 'nav-link active disabled' : 'nav-link'}
                         style={{cursor: 'pointer'}}
                         onClick={this.switchToOneCustomer}>1 Customer</nav>
                </li>
                <li className="nav-item">
                    <nav className={this.state.showTwoCustomersForm ? 'nav-link active disabled' : 'nav-link'}
                         style={{cursor: 'pointer'}}
                         onClick={this.switchToTwoCustomers}>2 Customers</nav>
                </li>
            </ul>
        );

        const floorNavigation = (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <nav className={this.state.showGroundFloor ? 'nav-link active disabled' : 'nav-link'}
                         style={{cursor: 'pointer'}}
                         onClick={this.switchToGroundFloor}>Ground Floor
                    </nav>
                </li>
                <li className="nav-item">
                    <nav className={this.state.showFirstFloor ? 'nav-link active disabled' : 'nav-link'}
                         style={{cursor: 'pointer'}}
                         onClick={this.switchToFirstFloor}>First Floor
                    </nav>
                </li>
                <li className="nav-item">
                    <nav className={this.state.showSecondFloor ? 'nav-link active disabled' : 'nav-link'}
                         style={{cursor: 'pointer'}}
                         onClick={this.switchToSecondFloor}>Second Floor
                    </nav>
                </li>
            </ul>
        );

        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <form>
                            {C1Form}
                            {this.state.showTwoCustomersForm ? C2Form : null}
                        </form>
                    </div>
                    <div className="col-6">
                        {map}
                        {amountOfCustomersNavigation}
                        <br/>
                        {floorNavigation}
                    </div>
                </div>
                <button className="btn btn-info" onClick={this.showProps}>show props</button>
                <button className="btn btn-info" onClick={this.showState}>show state</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        freeTablesForUser: state.tables.freeTablesForUser,
        msg: state.customers.message,
        timestamp: state.customers.timestamp
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchFreeTablesForUser: numberOfPeopleRequestingFreePlaces => dispatch(actions.fetchFreeTablesForUser(numberOfPeopleRequestingFreePlaces))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCustomer);
