import React from 'react';
import NavigationItem from "./navigation-item/NavigationItem";
import LogoutButton from "./logout-button/LogoutButton";
import Auxiliary from "../../../hoc/Auxiliary";

const navigationItems = props => {
    let navItems = <ul className="mx-auto"><h3 className="justify-content-center">AEGON SYSTEM</h3></ul>;
    if(props.isAuth){
        const isAdmin = localStorage.getItem('role') === 'ROLE_ADMIN';
        if(isAdmin){
            navItems = (
                <Auxiliary>
                    <ul className="navbar-nav mr-auto">
                        <NavigationItem link="/" name="Home"/>
                        <NavigationItem link="/tables" name="Tables"/>
                        <NavigationItem link="/users" name="Users"/>
                        <NavigationItem link="/tickets" name="Tickets"/>
                        <NavigationItem link="/register" name="Register"/>
                    </ul>
                    <ul className="navbar-nav">
                        <LogoutButton isAuth={props.isAuth}>logout</LogoutButton>
                    </ul>
                </Auxiliary>
            );
        } else {
            navItems = (
                <Auxiliary>
                    <ul className="navbar-nav mr-auto">
                        <NavigationItem link="/" name="Home"/>
                        <NavigationItem link="/tables" name="Tables"/>
                    </ul>
                    <ul className="navbar-nav">
                        <LogoutButton isAuth={props.isAuth}>logout</LogoutButton>
                    </ul>
                </Auxiliary>
            )
        }
    }
    return navItems
};

export default navigationItems
