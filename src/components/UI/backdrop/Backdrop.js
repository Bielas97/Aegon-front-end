import React from 'react';

import './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className="Backdrop" >{props.children}</div> : null
);

export default backdrop
