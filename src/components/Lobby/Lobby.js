import React from 'react';
import { connect } from 'react-redux';

import Rooms from './Rooms';
import Chat from './Chat';
import sendMessage from '../../redux/actions/sendMessage';
import { insertMessageGeneralChat } from '../../redux/actions/chatActions';
import './lobby.scss';

class Lobby extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="lobby">
                <Rooms />
                <Chat
                    user={this.props.user}
                    messages={this.props.messages}
                    sendMessage={sendMessage}
                    insertMessageChat={this.props.insertMessageGeneralChat}/>
            </div>
        )
    }
}

const matStateToProps = (state) => ({
    user: state.user.data,
    messages: state.chat.messages
});

export default connect(matStateToProps, {
    insertMessageGeneralChat
})(Lobby);
  