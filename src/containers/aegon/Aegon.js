import React, {Component} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import KvTables from "../kv-tables/KvTables";
import Cards from "../../components/UI/cards/Cards";

class Aegon extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Cards isAdmin={this.props.admin}/>
                <div className="row">
                    <div className="col-5">
                        <div className="d-flex justify-content-center">
                            <h4>Tables:</h4>
                        </div>
                        <KvTables/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        admin: state.auth.admin,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTables: () => dispatch(actions.fetch())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Aegon);
