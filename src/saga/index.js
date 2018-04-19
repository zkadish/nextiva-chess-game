import { fork, take, call, put, cancel, apply, spawn } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import * as Api from "../utils/Api"
import * as actions from "../redux/actions/entranceActions"
import {CREATE_ROOM_REQUEST, JOIN_ROOM_REQUEST, WATCH_ROOM_REQUEST} from "../redux/constants/ActionTypes"
import {LOGIN} from "../redux/constants/user"

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
      // console.log("ROOMS RECEIVED", data)
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
  // yield fork(createRoomSaga, socket, token)
  // yield fork(joinRoomSaga, socket, token)
  yield fork(writeSaga, socket, token, "room.create", CREATE_ROOM_REQUEST, actions.createRoom)
  yield fork(writeSaga, socket, token, "room.connect", JOIN_ROOM_REQUEST, actions.joinRoom)
  yield fork(writeSaga, socket, token, "room.connect-visitor", WATCH_ROOM_REQUEST, actions.watchRoom)
}

/* function* createRoomSaga(socket, token) {
  while (true) {
    const {payload} = yield take(CREATE_ROOM_REQUEST)
    const data = yield new Promise(resolve => {
      socket.emit("room.create", {token, state: payload}, (data) => {resolve(data)})
    })
    if(!data.err){
      yield put(actions.createRoom(payload))
    }
    else {
      console.log("ERROR ", data.err)
    }
  }
}
function* joinRoomSaga(socket, token) {
  while (true) {
    const action = yield take(JOIN_ROOM_REQUEST)
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
    const {payload} = yield take(WATCH_ROOM_REQUEST)
    const data = yield new Promise(resolve => {
      socket.emit("room.connect-visitor", {token, state: payload}, (data) => {resolve(data)})
    })
    if(!data.err){
      yield put(actions.watchRoom(payload))
    }
    else {
      console.log("ERROR ", data.err)
    }
  }
} */

function* writeSaga(socket, token, emitType, actionType, action) {
  while (true) {
    const {payload} = yield take(actionType)
    const data = yield new Promise(resolve => {
      socket.emit(emitType, {token, state: payload}, (data) => {resolve(data)})
    })
    if(!data.err){
      yield put(action(payload))
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
  while (true) {
    const signIn = yield take(LOGIN);
    const token = signIn.data.token
    // const { token } = yield call(Api.authorize, "user", "password") //get token from api.authorize
    yield call(Api.createSocket, token) //send requets for open socket
  
    const socket = yield call(connect); // connect to sokket

    window.socket = socket;//for debug, remove after

    const task = yield fork(handleIO, socket, token);
  }
}



export default function* rootSaga() {
  yield fork(flow);
}