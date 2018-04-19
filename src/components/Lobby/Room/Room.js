import React from 'react';

const Room = (props) => (
    <li className="game" onClick={props.clickHandler}>
        <div className="game__name">
            {props.firstPlayer} / { props.secondPlayer || "..."}
        </div>
    </li>
)

export default Room;