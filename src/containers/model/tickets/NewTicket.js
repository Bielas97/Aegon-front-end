import React, {Component} from 'react'
import {connect} from "react-redux";
import * as actions from '../../../store/actions/index'
import Ground from "../../../components/UI/map-vector-graphics/Ground";
import FirstFloor from "../../../components/UI/map-vector-graphics/FirstFloor";
import SecondFloor from "../../../components/UI/map-vector-graphics/SecondFloor";

class NewTicket extends Component {

    state = {
        ticketShortName: '',
        ticketFullName: '',
        ticketUni: false,
        tablesWithoutTicket: [],
        chosenTables: [],

        showGroundFloor: true,
        showFirstFloor: false,
        showSecondFloor: false
    };

    componentDidMount() {
        this.props.onFetchTablesWithoutTicket();
        this.setState({
            ...this.state,
            tablesWithoutTicket: this.props.tablesWithoutTicket.map(table => table.name)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.timestamp !== prevProps.timestamp) {
            this.props.onFetchTablesWithoutTicket();
        }
        if (this.props.tablesWithoutTicket.length !== prevProps.tablesWithoutTicket.length) {
            this.setState({
                ...this.state,
                tablesWithoutTicket: this.props.tablesWithoutTicket.map(table => table.name)
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

    clearState = () => {
        this.setState({
            ...this.state,
            ticketShortName: '',
            ticketFullName: '',
            ticketUni: false,
            tablesWithoutTicket: this.props.tablesWithoutTicket.map(table => table.name),
            chosenTables: [],

            showGroundFloor: true,
            showFirstFloor: false,
            showSecondFloor: false
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

    tableClicked = id => {
        const availableTablesNames = this.props.tablesWithoutTicket.map(table => table.name);
        if (availableTablesNames.includes(id)) {
            if (this.state.tablesWithoutTicket.includes(id)) {
                const newFreeTables = this.state.tablesWithoutTicket.filter(tableId => tableId !== id);
                this.setState({
                    ...this.state,
                    tablesWithoutTicket: newFreeTables,
                    chosenTables: this.state.chosenTables.concat(id)
                });
            } else {
                const newChosenTables = this.state.chosenTables.filter(tableId => tableId !== id);
                this.setState({
                    ...this.state,
                    chosenTables: newChosenTables,
                    tablesWithoutTicket: this.state.tablesWithoutTicket.concat(id)
                })
            }
        }
    };

    submitNewTicketForm = (event) => {
        event.preventDefault();
        const ticketTables = this.state.chosenTables.map(tableName => {
            return {
                name: tableName
            }
        });
        const ticket = {
            shortName: this.state.ticketShortName,
            fullName: this.state.ticketFullName,
            uni: this.state.ticketUni,
            tables: ticketTables
        };
        this.props.onAddTicket(ticket);
        this.clearState();
    };

    isSubmitDisabled = () => {
        return !this.state.ticketFullName || !this.state.ticketShortName || this.state.chosenTables.length <= 0
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <form onSubmit={event => this.submitNewTicketForm(event)}>
                            <div className="form-group">
                                <label htmlFor="ticketShortName">Short name:</label>
                                <input type="text"
                                       name="ticketShortName"
                                       id="ticketShortName"
                                       className="form-control"
                                       value={this.state.ticketShortName}
                                       onChange={this.inputChangeHandler}
                                />
                                <label htmlFor="ticketFullName">Full name:</label>
                                <input type="text"
                                       name="ticketFullName"
                                       id="ticketFullName"
                                       className="form-control"
                                       value={this.state.ticketFullName}
                                       onChange={this.inputChangeHandler}
                                />
                                <label htmlFor="updatedUni">Is University:</label>
                                <div className="row offset-1">
                                    <div className="radio">
                                        <label>
                                            <input
                                                type="radio"
                                                name="ticketUni"
                                                value={true}
                                                checked={this.state.ticketUni}
                                                onChange={this.boolInputHandler}/><span
                                            className="text-success fa fa-thumbs-o-up ml-2 mr-3"/></label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                                type="radio"
                                                name="ticketUni"
                                                value={false}
                                                checked={!this.state.ticketUni}
                                                onChange={this.boolInputHandler}/><span
                                            className="text-danger fa fa-thumbs-o-down ml-2 mr-3"/></label>
                                    </div>
                                </div>
                                <label>Tables:</label>
                                <h6>{this.state.chosenTables.join(",")}</h6>
                            </div>
                            <button className="btn btn-outline-success submitButton" type="submit" disabled={this.isSubmitDisabled()}>Submit</button>
                        </form>
                    </div>
                    <div className="col-6">
                        {this.state.showGroundFloor ? <Ground
                            onTableClick={id => this.tableClicked(id)}
                            freeTables={this.state.tablesWithoutTicket}
                        /> : null}
                        {this.state.showFirstFloor ? <FirstFloor
                            onTableClick={id => this.tableClicked(id)}
                            freeTables={this.state.tablesWithoutTicket}
                        /> : null}
                        {this.state.showSecondFloor ? <SecondFloor
                            onTableClick={id => this.tableClicked(id)}
                            freeTables={this.state.tablesWithoutTicket}
                        /> : null}
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
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tablesWithoutTicket: state.tables.tablesWithoutTicket,
        msg: state.tickets.message,
        timestamp: state.tickets.timestamp
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTablesWithoutTicket: () => dispatch(actions.fetchTablesWithoutTicket()),
        onAddTicket: ticket => dispatch(actions.addTicket(ticket))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTicket);
