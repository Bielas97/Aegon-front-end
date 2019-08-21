import React from 'react'

import './Card.css'

const card = props => {

    const stylename = "card border-".concat(props.stylename).concat(" shadow text-").concat(props.stylename).concat(" p-3 my-card");

    const textStyleName = "text-".concat(props.stylename).concat(" text-center mt-3");

    const myDiv = "my-div-".concat(props.stylename);

    const divStyleName = "card border-".concat(props.stylename).concat(" mx-sm-0 p-3 ").concat(myDiv);

    return (
        <div className={divStyleName}>
            <div className={stylename}><span className={props.fontAwesomeIcon} aria-hidden/></div>
            <div className={textStyleName}><h4>{props.name}</h4></div>
            <div className={textStyleName}><h1>{props.subname}</h1></div>
        </div>
    )

};


export default card;
