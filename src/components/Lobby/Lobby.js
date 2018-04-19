import React from 'react';
import { Button } from '@nextiva/next-ui';

import Room from './Room';

import './lobby.scss';

import { createRoomRequest, createJoinRequest, createWatchRoomRequest } from "../../redux/actions/entranceActions";
import { connect } from "react-redux";

class Lobby extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRoom: ''
        }
    }

    selectRoom = (room) => {
        this.setState({ selectedRoom: room });
        console.log("Selected ROMM: " + JSON.stringify(room));
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
                        clickHandler={() => this.selectRoom(room.id)} />
                    )}
                </ul>
                <div className="lobby__action">
                    {/* TODO: unsure in buttons */}
                    <Button kind="primary" onClick={() => this.props.createJoinRequest(this.state.selectedRoom)} className="lobby__action__join">Join</Button>
                    <Button kind="success" onClick={this.props.createRoomRequest} className="lobby__action__join">Create</Button>
                    <Button kind="warning" onClick={this.props.createWatchRoomRequest} className="lobby__action__watch">Watch</Button>
                </div>
            </div>
        )
    }
}
    

const mapStateToProps = state => {
    return {
        rooms: state.rooms        
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
  