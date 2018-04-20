import React from 'react';

import './room.scss';

const Room = (props) => (
    <li className={"game " + props.activeClass} onClick={props.clickHandler}>
        <div className="game__name">
            {props.firstPlayer} / { props.secondPlayer || "..."}
        </div>
    </li>
)

export default Room;