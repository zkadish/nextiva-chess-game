import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@nextiva/next-ui';

import Message from './Message';
import sendMessage from '../../../redux/actions/sendMessage';

import './chat.scss';

class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [
                { author: 'Jerry', time: '16:50', message: 'How are you?' },
                { author: 'Tom', time: '16:50', message: "Hi, I'm fine." },
                { author: 'Jerry', time: '16:50', message: "Let's play chess." },
                { author: 'savtym1', time: '16:50', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and " },
                { author: 'savtym1', time: '16:50', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and " },
                { author: 'Jerry', time: '16:50', message: "when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
            ],
            userMessage: ''
        }
    }

    handleSubmit(event){
        event.preventDefault();
        if (this.state.userMessage.trim()){
            sendMessage(this.state.userMessage);
            this.setState({ userMessage: '' });
        }
    }
    onChangeMessage(event){
        const { target: { value } } = event;
        this.setState({ userMessage: value });
    }
    onKeyPress(event){
        if (event.key === 'Enter' && event.shiftKey === false ) {
            this.handleSubmit(event);
        }
    }

    render(){
        return (
            <div className="chat">
                <div className="chat__messages">
                    { this.state.messages.map((message, i) => <Message
                        key={i}
                        author={message.author}
                        time={message.time}
                        message={message.message}
                        isMine={message.author == this.props.user.username}
                        />
                    )}
                </div>
                <div className="chat__textarea">
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <textarea 
                            value={this.state.userMessage}
                            form="usrform"
                            cols="64"
                            rows="4"
                            className="chat__textarea__message"
                            onKeyPress={(event) => this.onKeyPress(event)}
                            onChange={(event) => this.onChangeMessage(event)}>
                        </textarea>
                        <Button 
                            type="submit"
                            kind='success'
                            disabled={!this.state.userMessage}
                            className='chat__textarea__send'>Send
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

const matStateToProps = (state) => ({
    user: state.user.data
});

export default connect(matStateToProps)(Chat);