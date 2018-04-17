import * as types from '../redux/constants/ActionTypes'
import { messageReceived, populateUsersList } from '../redux/actions'
import io from "socket.io-client"



const setupSocket = (dispatch, username) => {

  const socket = io.connect('http://0.0.0.0:8080/');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });


  // const socket = new WebSocket('ws://localhost:8989')

  // socket.onopen = () => {
  //   socket.send(JSON.stringify({
  //     type: types.ADD_USER,
  //     name: username
  //   }))
  // }
  // socket.onmessage = (event) => {
  //   const data = JSON.parse(event.data)
  //   switch (data.type) {
  //     case types.ADD_MESSAGE:
  //       dispatch(messageReceived(data.message, data.author))
  //       break
  //     case types.USERS_LIST:
  //       dispatch(populateUsersList(data.users))
  //       break
  //     default:
  //       break
  //   }
  // }

  return socket
}

export default setupSocket
