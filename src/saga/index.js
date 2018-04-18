import { fork, take, call, put, cancel, apply } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as types from '../redux/constants/ActionTypes'
import io from 'socket.io-client';
import * as Api from "../utils/Api"

function connect() {
  const socket = io('http://0.0.0.0:8080/');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('users.login', ({ username }) => {
      // emit(addUser({ username }));
    });
    socket.on('users.logout', ({ username }) => {
      // emit(removeUser({ username }));
    });
    socket.on('messages.new', ({ message }) => {
      // emit(newMessage({ message }));
    });
    socket.on('disconnect', e => {
      // TODO: handle
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
  while (true) {
    // const { payload } = yield take(`${sendMessage}`);
    // socket.emit('message', payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    // let { payload } = yield take(`${login}`);
    const user = "user"
    const password = "user"
    const token = yield call(Api.authorize, user, password) //get token from api.authorize
    yield call(Api.createSocket, token) //send requets for open socket
  
    const socket = yield call(connect); // connect to sokket

    //socket.emit('login', { username: payload.username });
    yield apply(socket, socket.emit, ['test']) 

    const task = yield fork(handleIO, socket);

    // let action = yield take(`${logout}`);
    // yield cancel(task);
    // socket.emit('logout');
  }
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