const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const Game = require('../controllers/Game');
const Rooms = require('../controllers/Rooms');
const Chats = require('../controllers/Chats');
const Helpers = require('../utils/helpers');


let curIo;
let curSocket;

/**
 * Socket class for handling actions with client
 * */
class Socket {

  static async createRoom(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Rooms.createGame(data);

    callback(data);

    if (!res.err) {
      const rooms = await Rooms.getAllList();
      await Socket._handleRoom(res.room);
      curIo.emit('rooms', rooms.data);
    }
  }


  static async connectToGame(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Rooms.connectToGame(data);

    callback(data);

    if (!res.err) {
      await Socket._handleRoom(res.room);
      const rooms = await Rooms.getAllList();
      curIo.emit('rooms', rooms.data);
      curIo.sockets.in(res.room).emit('room.connect', res.data);
    }
  }


  static async connectToGameVisitor(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Rooms.connectToGameVisitor(data);

    callback(data);

    if (!res.err) {
      await Socket._handleRoom(res.room);
      curSocket.emit('room.connect', res.data);
    }
  }


  static async moveFigure(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = Socket._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    const res = await Game.moveFigure(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      const { state } = data;
      const { username, time, is_over } = res.data;
      curIo.sockets.in(curSocket.room).emit('room.move', { username, state, time, is_over });

      if (is_over) {
        await Game.giveUp({ game_id: data.game_id, token: data.token });
        curSocket.leave(curSocket.room);
        curSocket.room = null;
        curIo.sockets.in(res.room).emit('room.disconnect', res.data);
      }
    }
  }


  static async giveUp(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = Socket._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    const res = await Game.giveUp({ game_id: data.game_id, token: data.token });

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      Socket._roomDisconnect();
    }
  }


  static async leaveRoom(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = Socket._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    Socket._roomDisconnect();

    callback({
      status: 201,
    });
  }


  static async getMessageFromLocal(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = Socket._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    callback(await Chats.getMessagesLocalChat(data));
  }


  static async getMessageFromGeneral(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Chats.getMessagesGeneralChat(data);
    callback(res);
  }


  static async insertMessageToLocal(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = Socket._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    const res = await Chats.insertMessageLocalChat(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      curIo.sockets.in(curSocket.room).emit('chat.local', res.data);
    }
  }


  static async insertMessageToGeneral(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Chats.insertMessageGeneralChat(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      curIo.sockets.in(curSocket.room).emit('chat.general', res.data);
    }
  }


  static async disconnect() {
    if (curSocket.room) {
      const id = Helpers.getRoomId(curSocket.room);
      await Game.giveUp({ id, user_id: curSocket.user_id });
      curSocket.leave(curSocket.room);
      curSocket.room = null;
      curIo.emit('rooms', await Rooms.getAllList().data);
    }

    curIo.emit('user.disconnect', curSocket.username);
  }


  static async _handleRoom(room) {
    curSocket.room = room;
    curSocket.join(room);
  }


  static _roomDisconnect() {
    curSocket.leave(curSocket.room);
    curIo.sockets.in(curSocket.room).emit('room.disconnect', curSocket.username);
    curSocket.room = null;
  }


  static _isExistCallback(callback) {
    return callback ? true : {
      err: `You don't have a callback.`,
      status: 400,
    }
  }


  static _isExistRoom() {
    return curSocket.room ? true : {
      err: `You don't have a room.`,
      status: 406,
    };
  }

}


module.exports = (io) => {
  curIo = io;

  router.route('/socket').post(async (req, res) => {
    const per = await User.permissions(req, res);
    if (!per) return;


    io.once('connection', async (socket) => {
      curSocket = socket;
      socket.user_id = per.id;
      socket.username = per.username;

      const res = await Rooms.getAllList();
      socket.emit('rooms', res.data);
      socket.once('room.create', await Socket.createRoom);
      socket.once('room.connect', await Socket.connectToGame);
      socket.once('room.connect-visitor', await Socket.connectToGameVisitor);
      socket.once('room.move', await Socket.moveFigure);
      socket.once('room.give-up', await Socket.giveUp);
      socket.once('room.disconnect', await Socket.leaveRoom);

      socket.once('chat.local', await Socket.getMessageFromLocal);
      socket.once('chat.general', await Socket.getMessageFromGeneral);
      socket.once('chat.local.insert', await Socket.insertMessageToLocal);
      socket.once('chat.general.insert', await Socket.insertMessageToGeneral);

      socket.once('disconnect', await Socket.disconnect);
    });

    res.json();
  });

  return router;
};