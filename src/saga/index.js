import { fork, take, call, put, cancel, apply, spawn } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import * as Api from "../utils/Api"
import * as actions from "../redux/actions/entranceActions"
import {CREATE_ROOM_REQUEST, JOIN_ROOM_REQUEST, WATCH_ROOM_REQUEST} from "../redux/constants/ActionTypes"
import {LOGIN} from "../redux/constants/user"
import {ROUTE} from "../redux/constants/route"

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
      emit(actions.roomsList(data.data));
    });
    socket.on('room.connect', (data) => {
      emit(actions.updateRoomState(data.data));
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
  yield fork(writeSaga, socket, token, "room.create", CREATE_ROOM_REQUEST, actions.createRoom)
  yield fork(joinRoomSaga, socket, token, "room.connect", JOIN_ROOM_REQUEST, actions.joinRoom)
  yield fork(joinRoomSaga, socket, token, "room.connect-visitor", WATCH_ROOM_REQUEST, actions.watchRoom)
}

function* writeSaga(socket, token, emitType, actionType, action) {
  while (true) {
    try {
      const {payload} = yield take(actionType)
      const data = yield new Promise(resolve => {
        socket.emit(emitType, {token, state: payload}, (data) => {resolve(data)})
      })
      if(!data.err){
        yield put(actions.route("chessboard"))
        yield put(action(payload))
      }
      else {
        console.log("ERROR ", data.err)
      }
    } catch (error) {
      console.log("CATCH TRIGGERED in saga.writeSaga", error)
    }
    
  }
}

/* function* createRoomSaga(socket, token, emitType, actionType, action) {
  while (true) {
    try {
      const {payload} = yield take(actionType)
      const data = yield new Promise(resolve => {
        socket.emit(emitType, {token, state: payload}, (data) => {resolve(data)})
      })
      if(!data.err){
        yield put(actions.route("chessboard"))
        yield put(action(payload))
      }
      else {
        console.log("ERROR ", data.err)
      }
    } catch (error) {
      console.log("CATCH TRIGGERED in saga.writeSaga", error)
    }
    
  }
} */

function* joinRoomSaga(socket, token, emitType, actionType, action) {
  while (true) {
    try {
      const {payload} = yield take(actionType)
      const data = yield new Promise(resolve => {
        socket.emit(emitType, {token, game_id: payload}, (data) => {resolve(data)})
      })
      if(!data.err){
        yield put(actions.route("chessboard"))
        debugger
        yield put(action(payload))
      }
      else {
        console.log("ERROR ", data.err)
      }
    } catch (error) {
      console.log("CATCH TRIGGERED in saga.joinRoomSaga", error)
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