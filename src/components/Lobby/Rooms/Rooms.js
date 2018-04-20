import React from 'react';
import { Button } from '@nextiva/next-ui';

import Room from './Room';

import './rooms.scss';

import { createRoomRequest, createJoinRequest, createWatchRoomRequest } from "../../../redux/actions/entranceActions";
import { connect } from "react-redux";

class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRoom: ''
        }
    }

    selectRoom = (room) => {
        this.setState({ selectedRoom: room });
    }

    onCreateHandler() {
        this.props.createRoomRequest();
    }

    onJoinHandler(param) {
        this.props.createJoinRequest(param);
    }

    onWatchHandler(param) {
        this.props.createWatchRoomRequest(param);
    }

    render() {
        return (
            <div className="rooms">
                <h3 className="rooms__description">All games</h3>
                <ul className="rooms__games">
                    {this.props.rooms.map(room => <Room
                        key={room.id}
                        firstPlayer={room.first_player}
                        secondPlayer={room.second_player}
                        activeClass={this.state.selectedRoom == room.id ? 'active' : ''}
                        clickHandler={() => this.selectRoom(room.id)} />
                    )}
                </ul>
                <div className="rooms__action">
                    <Button
                        kind="primary"
                        onClick={this.onJoinHandler.bind(this, this.state.selectedRoom)}
                        className="rooms__action__join"
                        disabled={!this.state.selectedRoom}>Join
                    </Button>
                    <Button kind="success" onClick={this.onCreateHandler.bind(this)} className="rooms__action__join">Create</Button>
                    <Button
                        kind="warning"
                        onClick={this.onWatchHandler.bind(this, this.state.selectedRoom)}
                        className="rooms__action__watch"
                        disabled={!this.state.selectedRoom}>Watch
                    </Button>
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
        createRoomRequest: () => dispatch(createRoomRequest()),
        createJoinRequest: (params) => dispatch(createJoinRequest(params)),
        createWatchRoomRequest: (params) => dispatch(createWatchRoomRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
