import React from 'react';

import './message.scss';

const Message = (props) => {
    const getTime = (seconds) => {
        const date = new Date(seconds * 1000);
        let hh = date.getUTCHours();
        let mm = date.getUTCMinutes();
        let ss = date.getSeconds();
        if (hh < 10) { hh = "0" + hh; }
        if (mm < 10) { mm = "0" + mm; }
        if (ss < 10) { ss = "0" + ss; }
        return hh + ":" + mm + ":" + ss;
    }

    return (
        <div className={"message " + (props.isMine ? 'mine__message' : '')}>
            <div className="message__header">
                <h3 className="author">{props.author}</h3>
                <p className="time">{getTime(props.time)}</p>
            </div>
            <div className={"message__content " + (props.isMine ? 'mine__content' : '')}>
                {props.message}
            </div>
        </div>
    )
}

export default Message;