import React, {Component} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import KvTables from "../model/kv-tables/KvTables";
import Cards from "../../components/UI/cards/Cards";
import Customers from "../model/customers/Customers";

class Aegon extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Cards
                    isAdmin={this.props.admin}
                    freeTables={this.props.noFreeTables}
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        admin: state.auth.admin,
        noFreeTables: state.tables.tables.length
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTables: () => dispatch(actions.fetchTables())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Aegon);
