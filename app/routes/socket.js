const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const Game = require('../controllers/Game');
const Rooms = require('../controllers/Rooms');
const Chats = require('../controllers/Chats');
const Helpers = require('../utils/helpers');



/**
 * Socket class for handling actions with client
 * */
class Socket {

  constructor(socket, io, user) {
    this.socket = socket;
    this.user = user;
    this.io = io;

    this.createRoom = this.createRoom.bind(this);
    this.connectToGame = this.connectToGame.bind(this);
    this.connectToGameVisitor = this.connectToGameVisitor.bind(this);
    this.moveFigure = this.moveFigure.bind(this);
    this.giveUp = this.giveUp.bind(this);

    this.leaveRoom = this.leaveRoom.bind(this);
    this.disconnect = this.disconnect.bind(this);

    this.getMessageFromLocal = this.getMessageFromLocal.bind(this);
    this.insertMessageToLocal = this.insertMessageToLocal.bind(this);
    this.insertMessageToGeneral = this.insertMessageToGeneral.bind(this);
  }


  async createRoom(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Rooms.createGame(data);

    callback({
      data: res.data,
      status: res.status,
      err: res.err,
    });

    if (!res.err) {
      const messages = await Chats.getMessagesLocalChat(data, true);
      const rooms = await Rooms.getAllList();
      await this._handleRoom(res.room);
      this.io.emit('rooms', rooms.data);
    }
  }


  async connectToGame(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Rooms.connectToGame(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      await this._handleRoom(res.room);
      const rooms = await Rooms.getAllList();
      const messages = await Chats.getMessagesLocalChat(data, true);

      this.io.emit('rooms', rooms.data);
      this.socket.emit('chat.local', messages.data);
      this.io.to(this.room).emit('room.connect', res.data);
    }
  }


  async connectToGameVisitor(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Rooms.connectToGameVisitor(data);

    callback({
      err: res.err,
      data: res.data,
      status: res.status,
    });

    if (!res.err) {
      this.isVisitor = true;
      await this._handleRoom(res.room);
      this.socket.emit('room.connect', res.data);
      const messages = await Chats.getMessagesLocalChat(data, true);

      this.socket.emit('chat.local', messages.data);
      this.io.to(this.room).emit('room.connect-visitor', this.user.username);
    }
  }


  async moveFigure(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = this._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    const res = await Game.moveFigure(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      const { state } = data;
      const { username, time, is_over } = res.data;
      this.io.to(this.room).emit('room.move', { username, state, time, is_over });

      if (is_over) {
        await Game.giveUp({ id: data.game_id }, data.token);
        this.socket.leave(this.room);
        this.io.to(this.room).emit('room.win', this.user.username);
        this.room = null;

        const rooms = await Rooms.getAllList();
        this.io.emit('rooms', rooms.data);
      }
    }
  }


  async giveUp(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = this._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    const res = await Game.giveUp({ id: data.game_id }, data.token);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      this._roomDisconnect('room.disconnect');

      const rooms = await Rooms.getAllList();
      this.io.emit('rooms', rooms.data);
    }
  }


  async leaveRoom(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = this._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    this._roomDisconnect('room.disconnect-visitor');

    callback({
      status: 201,
    });
  }


  async getMessageFromLocal(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = this._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    const res = await Chats.getMessagesLocalChat(data);
    callback(res);
  }


  static async getMessageFromGeneral(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Chats.getMessagesGeneralChat(data);
    callback(res);
  }


  async insertMessageToLocal(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return isExistCallback;

    const isExistRoom = this._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    const res = await Chats.insertMessageLocalChat(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      this.io.to(this.room).emit('chat.local', Object.assign({is_insert: true}, res.data));
    }
  }


  async insertMessageToGeneral(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return isExistCallback;

    const res = await Chats.insertMessageGeneralChat(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      this.io.emit('chat.general', Object.assign({is_insert: true}, res.data));
    }
  }


  async disconnect() {
    if (this.room) {
      const id = Helpers.getRoomId(this.room);
      await Game.giveUp({ id, user_id: this.user.id });

      this._roomDisconnect('room.disconnect');

      if (!this.isVisitor) {
        const rooms = await Rooms.getAllList();
        this.io.emit('rooms', rooms.data);
      } else {
        this.isVisitor = false;
      }
    }

    this.io.emit('user.disconnect', this.user.username);
  }


  _roomDisconnect(nameEmit) {
    this.socket.leave(this.room);
    this.io.to(this.room).emit(nameEmit, this.user.username);
    this.room = null;
  }


  async _handleRoom(room) {
    this.room = room;
    this.socket.join(room);
  }


  _isExistRoom() {
    return this.room ? true : {
      err: `You don't have a room.`,
      status: 406,
    };
  }


  static _isExistCallback(callback) {
    return callback ? true : {
      err: `You don't have a callback.`,
      status: 400,
    }
  }
}


module.exports = (io) => {
  router.route('/socket').post(async (req, res) => {
    const per = await User.permissions(req, res);
    if (!per) return;

    io.once('connection', async (socket) => {

      const {
        createRoom,
        connectToGame,
        connectToGameVisitor,
        moveFigure,
        giveUp,
        leaveRoom,
        getMessageFromLocal,
        insertMessageToLocal,
        insertMessageToGeneral,
        disconnect,
      } = new Socket(socket, io, per);

      const rooms = await Rooms.getAllList();
      const messages = await Chats.getMessagesGeneralChat({}, true);

      socket.emit('rooms', rooms.data);
      socket.emit('chat.general', messages.data);

      socket.on('room.create', await createRoom);
      socket.on('room.connect', await connectToGame);
      socket.on('room.connect-visitor', await connectToGameVisitor);
      socket.on('room.move', await moveFigure);
      socket.on('room.give-up', await giveUp);
      socket.on('room.disconnect', await leaveRoom);

      socket.on('chat.local', await getMessageFromLocal);
      socket.on('chat.general', await Socket.getMessageFromGeneral);
      socket.on('chat.local.insert', await insertMessageToLocal);
      socket.on('chat.general.insert', await insertMessageToGeneral);

      socket.on('disconnect', await disconnect);
    });

    res.end();
  });

  return router;
};