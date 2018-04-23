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
      this.io.emit('rooms', rooms.data);
      this.io.to(this.room).emit('room.connect', res.data);
    }
  }


  async connectToGameVisitor(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const res = await Rooms.connectToGameVisitor(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      this.isVisitor = true;
      await this._handleRoom(res.room);
      this.socket.emit('room.connect', res.data);
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
        await Game.giveUp({ game_id: data.game_id, token: data.token });
        this.socket.leave(this.room);
        this.io.to(this.room).emit('room.disconnect', res.data);
        this.room = null;
      }
    }
  }


  async giveUp(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = this._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    const res = await Game.giveUp({ game_id: data.game_id, token: data.token });

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      this._roomDisconnect();
    }
  }


  async leaveRoom(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = this._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    this._roomDisconnect();

    callback({
      status: 201,
    });
  }


  async getMessageFromLocal(data, callback) {
    const isExistCallback = Socket._isExistCallback(callback);
    if (typeof(isExistCallback) !== 'boolean') return;

    const isExistRoom = this._isExistRoom();
    if (typeof(isExistRoom) !== 'boolean') return callback(isExistRoom);

    callback(await Chats.getMessagesLocalChat(data));
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
      this.io.to(this.room).emit('chat.local', res.data);
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
      this.io.to(this.room).emit('chat.general', res.data);
    }
  }


  async disconnect() {
    if (this.room) {
      const id = Helpers.getRoomId(this.room);
      await Game.giveUp({ id, user_id: this.user.id });
      this.socket.leave(this.room);
      this.room = null;

      if (!this.isVisitor) {
        const rooms = await Rooms.getAllList();
        this.io.emit('rooms', rooms.data);
      } else {
        this.isVisitor = false;
      }
    }

    this.io.emit('user.disconnect', this.user.username);
  }


  async _handleRoom(room) {
    this.room = room;
    this.socket.join(room);
  }


  _roomDisconnect() {
    this.socket.leave(this.room);
    this.io.to(this.room).emit('room.disconnect', this.user.username);
    this.room = null;
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

      const res = await Rooms.getAllList();
      socket.emit('rooms', res.data);
      socket.once('room.create', await createRoom);
      socket.once('room.connect', await connectToGame);
      socket.once('room.connect-visitor', await connectToGameVisitor);
      socket.once('room.move', await moveFigure);
      socket.once('room.give-up', await giveUp);
      socket.once('room.disconnect', await leaveRoom);

      socket.once('chat.local', await getMessageFromLocal);
      socket.once('chat.general', await Socket.getMessageFromGeneral);
      socket.once('chat.local.insert', await insertMessageToLocal);
      socket.once('chat.general.insert', await insertMessageToGeneral);

      socket.once('disconnect', await disconnect);
    });

    res.end();
  });

  return router;
};