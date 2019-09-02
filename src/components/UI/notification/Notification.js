import React from 'react';
import {NotificationManager} from 'react-notifications';


const notification = props => {

    let msg = null;
    switch (props.type) {
        case 'info':
            msg = NotificationManager.info(props.msg);
            break;
        case 'success':
            msg = NotificationManager.success(props.msg, props.title);
            break;
        case 'warning':
            msg = NotificationManager.warning(props.msg, props.title);
            break;
        case 'error':
            msg = NotificationManager.error(props.msg, props.title);
            break;
        default:
            msg = null;
            break;
    }

    return (
        <div>
            {msg}
        </div>
    )
};

export default notification;
