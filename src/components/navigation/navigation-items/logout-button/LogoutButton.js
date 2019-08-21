import React from 'react';
import {NavLink} from "react-router-dom";

const logoutButton = props => (
    <li className="nav-item">
        {props.isAuth ? <NavLink
            to='/logout' exact>
            <button className="btn btn-outline-danger my-2 my-sm-0 float-left">logout</button>
        </NavLink> : null}
    </li>
);

export default logoutButton;
