import { takeEvery } from 'redux-saga/effects'
import * as types from '../redux/constants/ActionTypes'

const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(
    types.ADD_MESSAGE, 
    (action) => {
      action.author = params.username
      params.socket.emit('my other event', action, ({err, data}) => {
        if (err) {
          
        }
      })
  })
}

export default handleNewMessage
