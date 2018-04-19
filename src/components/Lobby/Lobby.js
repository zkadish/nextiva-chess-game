import React from 'react';
import { Button } from '@nextiva/next-ui';

import './lobby.scss';

import { createRoomRequest, createJoinRequest, createWatchRoomRequest } from "../../redux/actions/entranceActions";
import { connect } from "react-redux";

const Lobby = (props) => (
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
            {/* TODO: unsure in buttons */}
            <Button kind="primary" onClick={props.createJoinRequest} className="lobby__action__join">Join</Button>
            <Button kind="success" onClick={props.createRoomRequest} className="lobby__action__join">Create</Button>
            <Button kind="warning" onClick={props.createWatchRoomRequest} className="lobby__action__watch">Watch</Button>
        </div>
    </div>
)

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
  