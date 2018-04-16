import React from 'react';
import { Button } from '@nextiva/next-ui';

import './lobby.scss';

const Lobby = () => (
    <div className="lobby">
        <h3 className="lobby__description">All games</h3>
        <ul className="lobby__games">
            <li className="game">
                <div className="game__name">
                    Banjamin /
                </div>
            </li>
            <li className="game">
                <div className="game__name">
                    Tom / Jerry
                </div>
            </li>
            <li className="game">
                <div className="game__name">
                    Oliver / Sebastian
                </div>
            </li>
        </ul>
        <div className="lobby__action">
            <Button kind="primary" className="lobby__action__join">Join</Button>
            <Button kind="warning" className="lobby__action__watch">Watch</Button>
        </div>
    </div>
)

export default Lobby;