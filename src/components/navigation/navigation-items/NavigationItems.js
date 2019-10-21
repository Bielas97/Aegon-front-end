import React from 'react';
import NavigationItem from "./navigation-item/NavigationItem";
import LogoutButton from "./logout-button/LogoutButton";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

const navigationItems = props => {
    let navItems = <ul className="mx-auto"><h3 className="justify-content-center">AEGON SYSTEM</h3></ul>;
    if (props.isAuth) {
        const token = sessionStorage.getItem("token");
        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        const isAdmin = decodedJwtData.roles === "ROLE_ADMIN";
        if (isAdmin) {
            navItems = (
                <Auxiliary>
                    <ul className="navbar-nav mr-auto">
                        <NavigationItem link="/" name="Home"/>
                        <NavigationItem link="/tables" name="Tables"/>
                        <NavigationItem link="/users" name="Users"/>
                        <NavigationItem link="/tickets" name="Tickets"/>
                        <NavigationItem link="/register" name="Register"/>
                        <NavigationItem link="/customers" name="Customers"/>
                        <NavigationItem link="/customers-new" name="Add Customers"/>
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
                        <NavigationItem link="/customers" name="Customers"/>
                        <NavigationItem link="/customers-new" name="Add Customers"/>
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
