import { connect } from 'react-redux'
import AddMessageComponent from '../components/AddMessage'
import { addMessage } from '../actions'

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


// const mapDispatchToProps = dispatch => ({
//   addMessage: (message, author) => {
//     dispatch(addMessage(message, author))
//   }
// })

export default connect(null, dispatch => ({addMessage}))(AddMessageComponent)
