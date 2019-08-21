import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import Spinner from "reactstrap/es/Spinner";

class KvTables extends Component {

    componentDidMount() {
        this.props.onFetchTables()
    }

    render() {

        let table = <Spinner/>;
        if(!this.props.loading) {
            table = (
                <div className="container">
                    <br/>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Max places</th>
                            <th scope="col">Sold places</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </table>
                    {console.log("siemka", this.props.tables)}
                </div>
            )
        }

        return table;
    }
}

const mapStateToProps = state => {
    return {
        tables: state.tables.tables,
        loading: state.tables.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTables: () => dispatch(actions.fetch())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(KvTables)
