import * as types from '../constants/ActionTypes'


let nextMessageId = 0
let nextUserId = 0

export const addMessage = (message, author) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author
})

export const addUser = name => ({
  type: types.ADD_USER,
  id: nextUserId++,
  name
})

export const messageReceived = (message, author) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  author
})

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users
})

/* export const signIn = () => {
  const body = JSON.stringify({
    "email" : "savtym1@asdfghj.com",
    "password": "qwerty1234"
  });

  return dispatch => {
    fetch("http://localhost:8080/api/v1/user/signin", {
      method: 'POST',
      body: JSON.stringify({
        "email" : "savtym1@asdfghj.com",
        "password": "qwerty1234"
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((response) => response.json()).then((data) => {
      
      console.log("onLoaded", data)
      const socket = setupSocket(store.dispatch, username)
      dispatch({type: "SIGN_IN"})
    })
  }; 
}*/