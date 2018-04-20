import React from 'react';

import Rooms from './Rooms';
import Chat from './Chat';

import './lobby.scss';

class Lobby extends React.Component {
    render(){
        return (
            <div className="lobby">
                <Rooms />
                <Chat />
            </div>
        )
    }
}

export default Lobby;
  