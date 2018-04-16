import React from 'react'

const Message = ({ message, author }) => (
  <p>
    <i>{author}</i>: {message}
  </p>
)

export default Message
