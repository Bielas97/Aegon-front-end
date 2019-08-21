import React from 'react';
import {NavLink} from "react-router-dom";

const navigationItem = props => (
    <li className="nav-item">
        <NavLink className="nav-link" to={props.link}>
            {props.name}
        </NavLink>
    </li>
);

export default navigationItem;
