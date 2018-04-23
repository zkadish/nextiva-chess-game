import React from 'react';
import { connect } from 'react-redux';

import Rooms from './Rooms';
import Chat from './Chat';
import sendMessage from '../../redux/actions/sendMessage';

import './lobby.scss';

const messages = [
    { author: 'Jerry', time: '16:50', message: 'How are you?' },
    { author: 'Tom', time: '16:50', message: "Hi, I'm fine." },
    { author: 'Jerry', time: '16:50', message: "Let's play chess." },
    { author: 'savtym1', time: '16:50', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and " },
    { author: 'savtym1', time: '16:50', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and " },
    { author: 'Jerry', time: '16:50', message: "when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
];
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
                    messages={messages}
                    sendMessage={sendMessage}/>
            </div>
        )
    }
}

const matStateToProps = (state) => ({
    user: state.user.data
});

export default connect(matStateToProps)(Lobby);
  