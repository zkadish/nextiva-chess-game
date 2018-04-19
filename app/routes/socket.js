const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const Game = require('../controllers/Game');
const Rooms = require('../controllers/Rooms');


let curIo;
let curSocket;


class Socket {

  static async createRoom(data, callback) {
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
    const res = await Rooms.connectToGameVisitor(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (res.err) {
      await Socket._handleRoom(res.room);
    }
  }


  static async moveFigure(data, callback) {
    if (!curSocket.room) {
      callback({
        err: `You don't have a room.`,
        status: 406,
      });
    }
    const res = await Game.moveFigure(data);

    callback({
      err: res.err,
      status: res.status,
    });

    if (!res.err) {
      const { state } = data;
      const { username, time, is_give_up } = res.data;
      curIo.sockets.in(curSocket.room).emit('room.move', { username, state, time, is_give_up });
    }
  }


  static async _handleRoom(room) {
    curSocket.room = room;
    curSocket.join(room);
  }

}


module.exports = (io) => {
  curIo = io;

  router.route('/socket').post(async (req, res) => {
    const per = await User.permissions(req, res);
    if (!per) return;


    io.once('connection', async (socket) => {
      curSocket = socket;

      socket.emit('rooms', await Rooms.getAllList());
      socket.once('room.create', await Socket.createRoom);
      socket.once('room.connect', await Socket.connectToGame);
      socket.once('room.connect-visitor', await Socket.connectToGameVisitor);
      socket.once('room.move', await Socket.moveFigure);

      socket.once('disconnect', () => {

      });
    });

    res.json();
  });

  return router;
};