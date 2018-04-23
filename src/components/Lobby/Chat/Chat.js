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
            userMessage: ''
        }
    }

    handleSubmit(event){
        event.preventDefault();
        if (this.state.userMessage.trim()){
            this.props.insertMessageChat(this.state.userMessage);
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
    handleClickButton(event) {
        this.handleSubmit(event);
    }
    
    getMessages() {
        if(!this.props.messages) return false;
        return this.props.messages.map((message, i) => <Message
            key={i}
            author={message.username}
            time={message.time}
            message={message.message}
            isMine={message.username == this.props.user.username}
        />)
    }

    render(){
        return (
            <div className="chat" style={{ maxWidth: this.props.maxWidth || '480px'}}>
                <div className="chat__messages">
                    {this.getMessages()}
                </div>
                <div className="chat__textarea">
                    <form>
                        <textarea 
                            value={this.state.userMessage}
                            form="usrform"
                            className="chat__textarea__message"
                            onKeyPress={(event) => this.onKeyPress(event)}
                            onChange={(event) => this.onChangeMessage(event)}>
                        </textarea>
                        <Button 
                            kind='success'
                            onClick={this.handleClickButton.bind(this)}
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
