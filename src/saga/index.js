import { fork, take, call, put, cancel, apply, spawn } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import * as Api from "../utils/Api"
import * as actions from "../redux/actions/entranceActions"

function connect() {
  const socket = io('http://0.0.0.0:8080/');
  window.socket = socket
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('rooms', (data) => {
      console.log("NEWS RECEIVED", data)
      // emit(actions.addUser({ username }));
    });
    socket.on('room.', ({ username }) => {
      // emit(removeUser({ username }));
    });
    socket.on('messages.new', ({ message }) => {
      // emit(newMessage({ message }));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    socket.on('room.connect', (data) => {
      console.log('connect', data)
    })
    socket.emit('room.create', {
      token: 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdnR5bUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InF3ZXJ0eSIsImlhdCI6MTUyMjI0MzQ3M30.ZBPrfoudpTC4gLyg2pM07rEDUfqT-KlWPK7-0E5bSus',
      state: 'safas',
    }, (data) => {
      console.log(data);

      socket.emit('room.connect', {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdnR5bTFAYXNkZmdoai5jb20iLCJ1c2VybmFtZSI6InNhdnR5bTEiLCJpYXQiOjE1MjM4OTgwNTF9.7H219EsJs1XfTp4kFVxQSb2AxKJha9z8PL_fGf0429A',
        game_id: 35,
      }, (data) => {
        console.log(data)


        socket.emit('room.connect-visitor', {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdnR5bTJAYXNkZmdoai5jb20iLCJ1c2VybmFtZSI6InNhdnR5bTIiLCJpYXQiOjE1MjQwNzEwMjR9.myGXVdOWqOq65etoQxYUv5CmDbjjfumxx0YyoS9fJNg',
          game_id: 35,
        }, (res) => {
          console.log('visitor', res)
        })
      });


    });



    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  yield fork(createRoom, socket)
}

function* createRoom(socket) {
  while (true) {
    const action= yield take("room.create")
    socket.emit("room.create", {}, (data) => {
      debugger
    })
    // yield apply(socket, socket.emit, ['room.create', { username: "payload.username" }, (data) => {
    //   debugger
    // }])//token, state

  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  // while (true) {
    // let { payload } = yield take(`${login}`);
    const user = "user"
    const password = "user"
    const token = yield call(Api.authorize, user, password) //get token from api.authorize
    yield call(Api.createSocket, token) //send requets for open socket
  
    const socket = yield call(connect); // connect to sokket

    window.socket = socket;

    //socket.emit('test', { username: "payload.username" });
    yield apply(socket, socket.emit, ['test', { username: "payload.username" }]) 

    const task = yield fork(handleIO, socket);

    // let action = yield take(`${logout}`);
    // yield cancel(task);
    // socket.emit('logout');
  // }
}

/* function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    // yield call(Api.storeItem, {token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    // fork return a Task object
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGOUT')
      yield cancel(task)
    yield call(Api.clearItem, 'token')
  }
} */

export default function* rootSaga() {
  yield fork(flow);
}