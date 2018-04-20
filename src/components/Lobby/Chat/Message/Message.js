import React from 'react';

import './message.scss';

const Message = (props) => {
    return (
        <div className={"message " + (props.isMine ? 'mine__message' : '')}>
            <div className="message__header">
                <h3 className="author">{props.author}</h3>
                <p className="time">{props.time}</p>
            </div>
            <div className={"message__content " + (props.isMine ? 'mine__content' : '')}>
                {props.message}
            </div>
        </div>
    )
}

export default Message;