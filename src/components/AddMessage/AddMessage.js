import { connect } from 'react-redux'
import React from "react"
import AddMessageComponent from '../AddMessage'
import { addMessage } from '../../redux/actions'

const AddMessage = (props) => {
  let input

  return (
    <section id="new-message">
      <input
        onKeyPress={(e) => {
        if (e.key === 'Enter') {
          props.addMessage(input.value, 'Me')
          input.value = ''
        }
      }}
        type="text"
        ref={(node) => {
        input = node
      }}
      />
    </section>
  )
}

export default connect(
  null, {addMessage})(AddMessage)
