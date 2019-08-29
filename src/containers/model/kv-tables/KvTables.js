import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../../store/actions';
import Spinner from '../../../components/UI/spinner/Spinner';
import Backdrop from "../../../components/UI/backdrop/Backdrop";
import './KvTables.css'

class KvTables extends Component {

    componentDidMount() {
        this.props.onFetchTables()
    }

    render() {

        const sortedTables = this.props.tables.sort((a, b) => a.id - b.id);
        let tbody = sortedTables.map(el => {
            return (
                <tbody key={el.id}>
                <tr>
                    <th scope="row">{el.id}</th>
                    <td>{el.name}</td>
                    <td>{el.maxPlaces}</td>
                    <td>{el.soldPlaces}</td>
                </tr>
                </tbody>
            )
        });

        if (this.props.dashboard) {
            const sortedBySoldPlaces = sortedTables.sort((a, b) => a.soldPlaces - b.soldPlaces).slice(0, 5);
            tbody = sortedBySoldPlaces.map(el => {
                return (
                    <tbody key={el.id}>
                    <tr>
                        <th scope="row">{el.id}</th>
                        <td>{el.name}</td>
                        <td>{el.maxPlaces}</td>
                        <td>{el.soldPlaces}</td>
                    </tr>
                    </tbody>
                )
            })
        }

        let table = (
            <Backdrop show>
                <Spinner/>
            </Backdrop>
        );
        if (!this.props.loading) {
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
                        {tbody}
                    </table>
                </div>
            )
        }

        return table
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
            onFetchTables: () => dispatch(actions.fetchTables())
        }
    };

export default connect(mapStateToProps, mapDispatchToProps)(KvTables)
