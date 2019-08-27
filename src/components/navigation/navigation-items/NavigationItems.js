import React from 'react';
import NavigationItem from "./navigation-item/NavigationItem";
import LogoutButton from "./logout-button/LogoutButton";
import Auxiliary from "../../../hoc/Auxiliary";

const navigationItems = props => {

    let items = props.isAuth ? <Auxiliary>
        <ul className="navbar-nav mr-auto">
            <NavigationItem link="/" name="Home"/>
            <NavigationItem link="/tables" name="Tables"/>
            <NavigationItem link="/" name="Pricing"/>
        </ul>
        <ul className="navbar-nav">
            <LogoutButton isAuth={props.isAuth}>logout</LogoutButton>
        </ul>
    </Auxiliary> : <ul className="mx-auto"><h3 className="justify-content-center">AEGON SYSTEM</h3></ul>


    return items

};

export default navigationItems
