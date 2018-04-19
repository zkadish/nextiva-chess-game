const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const Game = require('../controllers/Game');
const Rooms = require('../controllers/Rooms');
const Chats = require('../controllers/Chats');
const Helpers = require('../utils/helpers');


let curIo;
let curSocket;


class Socket {

  static async createRoom(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Rooms.createGame(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      await Socket._handleRoom(res.room);
      curIo.emit('rooms', await Rooms.getAllList());
    }
  }


  static async connectToGame(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Rooms.connectToGame(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      await Socket._handleRoom(res.room);
      curIo.emit('rooms', await Rooms.getAllList());
      curIo.sockets.in(res.room).emit('room.connect', res.data);
    }
  }


  static async connectToGameVisitor(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Rooms.connectToGameVisitor(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      await Socket._handleRoom(res.room);
    }
  }


  static async moveFigure(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = Socket._isExistRoom(callback);
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    const res = await Game.moveFigure(data);

    !callback || callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      const { state } = data;
      const { username, time, is_give_up } = res.data;
      curIo.sockets.in(curSocket.room).emit('room.move', { username, state, time, is_give_up });

      if (is_give_up) {
        await Game.giveUp(data.game_id);
        curSocket.leave(curSocket.room);
        curSocket.room = null;
        curIo.sockets.in(res.room).emit('room.connect', res.data);
      }
    }
  }


  static async getMessageFromLocal(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = Socket._isExistRoom(callback);
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

    const isExistRoom = Socket._isExistRoom(callback);
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
      await Game.giveUp(id);
      curSocket.leave(curSocket.room);
      curSocket.room = null;
      curIo.emit('rooms', await Rooms.getAllList());
    }

    curIo.emit('disconnect', curSocket.username);
  }


  static async _handleRoom(room) {
    curSocket.room = room;
    curSocket.join(room);
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
      socket.username = per.username;

      socket.emit('rooms', await Rooms.getAllList());
      socket.once('room.create', await Socket.createRoom);
      socket.once('room.connect', await Socket.connectToGame);
      socket.once('room.connect-visitor', await Socket.connectToGameVisitor);
      socket.once('room.move', await Socket.moveFigure);

      socket.once('chat.local', await Socket.getMessageFromLocal);
      socket.once('chat.general', await Socket.getMessageFromGeneral);
      socket.once('chat.local.insert', await Socket.insertMessageToLocal);
      socket.once('chat.general.insert', await Socket.insertMessageToGeneral);

      // socket.once('disconnect', await Socket.disconnect);
    });

    res.json();
  });

  return router;
};