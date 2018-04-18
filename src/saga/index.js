import { fork, take, call, put, cancel, apply, spawn } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import * as Api from "../utils/Api"
import * as actions from "../redux/actions/entranceActions"
import {CREATE_ROOM_REQUEST, JOIN_ROOM_REQUESRT, WATCH_ROOM_REQUEST} from "../redux/constants/ActionTypes"

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
      console.log("ROOMS RECEIVED", data)
      emit(actions.roomsList(data.data));
    });
    socket.on('rooms', ({ username }) => {
      // emit(removeUser({ username }));
    });
    socket.on('room.connect', (data) => {
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

function* write(socket, token) {
  yield fork(createRoomSaga, socket, token)
  yield fork(joinRoomSaga, socket, token)
}

function* createRoomSaga(socket, token) {
  while (true) {
    const action = yield take(CREATE_ROOM_REQUEST)
    const data = yield new Promise(resolve => {
      socket.emit("room.create", {token, state: action.payload}, (data) => {resolve(data)})
    })
    if(!data.err){
      yield put(actions.createRoom(action.payload))
    }
    else {
      console.log("ERROR ", data.err)
    }
  }
}
function* joinRoomSaga(socket, token) {
  while (true) {
    const action = yield take(JOIN_ROOM_REQUESRT)
    const data = yield new Promise(resolve => {
      socket.emit("room.connect", {token, state: action.payload}, (data) => {resolve(data)})
    })
    if(!data.err){
      yield put(actions.joinRoom(action.payload))
    }
    else {
      console.log("ERROR ", data.err)
    }
  }
}
function* watchRoomSaga(socket, token) {
  while (true) {
    const action = yield take(WATCH_ROOM_REQUEST)
    const data = yield new Promise(resolve => {
      socket.emit("room.connect-visitor", {token, state: action.payload}, (data) => {resolve(data)})
    })
    if(!data.err){
      yield put(actions.watchRoom(action.payload))
    }
    else {
      console.log("ERROR ", data.err)
    }
  }
}

function* handleIO(socket, token) {
  yield fork(read, socket);
  yield fork(write, socket, token);
}

function* flow() {
  // while (true) {
    // let { payload } = yield take(`${login}`);
    const user = "user"
    const password = "user"
    const { token } = yield call(Api.authorize, user, password) //get token from api.authorize

    yield call(Api.createSocket, token) //send requets for open socket
  
    const socket = yield call(connect); // connect to sokket

    window.socket = socket;

    //socket.emit('test', { username: "payload.username" });
    // yield apply(socket, socket.emit, ['test', { username: "payload.username" }]) 

    const task = yield fork(handleIO, socket, token);

    yield put(actions.createRoomRequest())

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