import React from 'react';
import { Button } from '@nextiva/next-ui';

import Room from './Room';

import './lobby.scss';

import { createRoomRequest, createJoinRequest, createWatchRoomRequest } from "../../redux/actions/entranceActions";
import { connect } from "react-redux";

import route from '../../redux/actions/route';

class Lobby extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRoom: ''
        }
    }

    selectRoom = (room) => {
        this.setState({ selectedRoom: room });
    }

    onCreateHandler(username) {
        this.props.createRoomRequest(username);
    }

    onJoinHandler(selectedRoom) {
        this.props.createJoinRequest(selectedRoom);
    }

    onWatchHandler(selectedRoom) {
        this.props.createWatchRoomRequest(selectedRoom);
    }

    render(){
        return (
            <div className="lobby">
                <h3 className="lobby__description">All games</h3>
                <ul className="lobby__games">
                    {this.props.rooms.map(room => <Room
                        key={room.id}
                        firstPlayer={room.first_player} 
                        secondPlayer={room.second_player}
                        activeClass={ this.state.selectedRoom == room.id ? 'active' : '' }
                        clickHandler={() => this.selectRoom(room.id)} />
                    )}
                </ul>
                <div className="lobby__action">
                    {console.log(this.props)}
                    <Button kind="primary" onClick={this.onJoinHandler.bind(this, this.state.selectedRoom)} className="lobby__action__join">Join</Button>
                    <Button kind="success" onClick={this.onCreateHandler.bind(this, this.props.user)} className="lobby__action__join">Create</Button>
                    <Button kind="warning" onClick={this.onWatchHandler.bind(this, this.state.selectedRoom)} className="lobby__action__watch">Watch</Button>
                </div>
            </div>
        )
    }
}
    

const mapStateToProps = state => {
    return {
        rooms: state.rooms,
        user: state.user.data.username,        
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      createRoomRequest:        (params) => dispatch(createRoomRequest(params)),
      createJoinRequest:        (params) => dispatch(createJoinRequest(params)),
      createWatchRoomRequest:   (params) => dispatch(createWatchRoomRequest(params)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
  