import React from 'react'

import Card from './card/Card';

const cards = props => {

    let cards = props.isAdmin ? (
        <div className="row w-100 h-100">
            <div className="col-md-3">
                <Card stylename="info" name="Free tables" subname="43" fontAwesomeIcon="fa fa-line-chart"/>
            </div>
            <div className="col-md-3">
                <Card stylename="success" name="Free places" subname="109" fontAwesomeIcon="fa fa-bar-chart"/>
            </div>
            <div className="col-md-3">
                <Card stylename="danger" name="Users" subname="10" fontAwesomeIcon="fa fa-user"/>
            </div>
            <div className="col-md-3">
                <Card stylename="warning" name="Tickets" subname="14" fontAwesomeIcon="fa fa-ticket"/>
            </div>
        </div>
    ) : (
            <div className="row w-100 h-100">
                <div className="col-md-6">
                    <Card stylename="info" name="Free tables" subname="43" fontAwesomeIcon="fa fa-line-chart"/>
                </div>
                <div className="col-md-6">
                    <Card stylename="success" name="Free places" subname="109" fontAwesomeIcon="fa fa-bar-chart"/>
                </div>
            </div>
        )

return (<div className="jumbotron">{cards}</div>)
};

export default cards
