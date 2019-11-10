import React from 'react'

import Card from './card/Card';

const cards = props => {

    let cards = props.isAdmin ? (
        <div className="row w-100 h-100">
            <div className="col-md-3">
                <Card link="/tables"
                      stylename="info"
                      name="Free tables"
                      subname={props.freeTables}
                      fontAwesomeIcon="fa fa-line-chart"/>
            </div>
            <div className="col-md-3">
                <Card link="/"
                      stylename="success"
                      name="Free places"
                      subname={props.freePlaces}
                      fontAwesomeIcon="fa fa-bar-chart"/>
            </div>
            <div className="col-md-3">
                <Card link="/users"
                      stylename="danger"
                      name="Users"
                      subname={props.users}
                      fontAwesomeIcon="fa fa-user"/>
            </div>
            <div className="col-md-3">
                <Card link="/tickets"
                      stylename="warning"
                      name="Tickets"
                      subname={props.tickets}
                      fontAwesomeIcon="fa fa-ticket"/>
            </div>
        </div>
    ) : (
        <div className="row w-100 h-100">
            <div className="col-md-3">
                <Card link="/tables"
                      stylename="info"
                      name="Free tables"
                      subname={props.freeTables}
                      fontAwesomeIcon="fa fa-line-chart"/>
            </div>
            <div className="col-md-3">
                <Card link="/customers"
                      stylename="dark"
                      name="Accounted customers"
                      subname={props.accountedCustomers}
                      fontAwesomeIcon="fa fa-dashboard"/>
            </div>
            <div className="col-md-3">
                <Card link="#"
                      stylename="danger"
                      name="Number of tickets"
                      subname={props.ticketsLeft}
                      fontAwesomeIcon="fa fa-ticket"/>
            </div>
            <div className="col-md-3">
                <Card link="/"
                      stylename="success"
                      name="Free places"
                      subname={props.freePlaces}
                      fontAwesomeIcon="fa fa-bar-chart"/>
            </div>
        </div>
    )

    return (<div className="jumbotron">{cards}</div>)
};

export default cards
