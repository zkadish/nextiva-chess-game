import React from 'react'
import { connect } from 'react-redux'
import Message from './Message'

const MessagesList = ({ messages }) => (
  <section id="messages-list">
    <ul>
      {messages.map(message => (
        <Message
          key={message.id}
          {...message}
        />
    ))}
    </ul>
  </section>
)

export default connect(
  state => ({
  messages: state.messages
}), 
{})(MessagesList)
