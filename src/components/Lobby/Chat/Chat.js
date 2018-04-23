import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@nextiva/next-ui';

import Message from './Message';

import './chat.scss';

class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userMessage: ''
        }
    }

    handleSubmit(event){
        event.preventDefault();
        if (this.state.userMessage.trim()){
            this.props.sendMessage(this.state.userMessage);
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
                    { this.props.messages.map((message, i) => <Message
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

export default Chat;